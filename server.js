// Express server with Stripe checkout, webhooks, and simple JWT auth
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const Stripe = require('stripe');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = Stripe(stripeSecret);
const jwtSecret = process.env.JWT_SECRET || 'dev_jwt_secret';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/client/build')));

const USERS_DB = path.join(__dirname, 'data', 'users.json');
function readUsers() {
    try {
        const raw = fs.readFileSync(USERS_DB, 'utf8');
        return JSON.parse(raw || '[]');
    } catch (e) {
        return [];
    }
}
function writeUsers(users) {
    fs.mkdirSync(path.dirname(USERS_DB), { recursive: true });
    fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2));
}

app.post('/api/signup', async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
    const users = readUsers();
    if (users.find(u => u.email === email)) return res.status(400).json({ error: 'User exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), email, name: name || '', password: hash, role: 'user' };
    users.push(user);
    writeUsers(users);
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' });
    res.json({ token });
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' });
    res.json({ token });
});

function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Missing auth' });
    const parts = auth.split(' ');
    if (parts.length !== 2) return res.status(401).json({ error: 'Malformed auth' });
    const token = parts[1];
    try {
        const payload = jwt.verify(token, jwtSecret);
        req.user = payload;
        next();
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ error: 'Email not found' });
    
    // In production, send actual email with reset link
    // For now, just return success (you can add email service later)
    console.log(`Password reset requested for: ${email}`);
    res.json({ message: 'Reset link sent to email' });
});

app.get('/api/me', authMiddleware, (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
});

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { plan = 'starter' } = req.body;
        const domain = req.headers.origin || `http://localhost:${process.env.PORT || 3000}`;
        
        const plans = {
            starter: { name: 'BIZZY Starter', amount: 900 },
            pro: { name: 'BIZZY Pro', amount: 1900 },
            business: { name: 'BIZZY Business', amount: 3900 }
        };
        
        const selectedPlan = plans[plan] || plans.starter;
        
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: `${selectedPlan.name} — 1 month` },
                        unit_amount: selectedPlan.amount,
                        recurring: { interval: 'month' }
                    },
                    quantity: 1
                }
            ],
            mode: 'subscription',
            success_url: `${domain}/?success=true&plan=${plan}`,
            cancel_url: `${domain}/payments?canceled=true`,
            allow_promotion_codes: true,
            billing_address_collection: 'required'
        });
        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to create checkout session' });
    }
});

// Stripe webhook endpoint (verify signature with STRIPE_WEBHOOK_SECRET)
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    let event;
    try {
        if (webhookSecret) {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        } else {
            event = req.body;
        }
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the event types you care about
    switch (event.type) {
        case 'checkout.session.completed':
            console.log('Checkout completed:', event.data.object.id);
            // TODO: find customer by email and mark subscription
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/client/build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
