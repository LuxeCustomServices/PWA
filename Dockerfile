FROM node:18 AS builder
WORKDIR /app

# Install and build the React client
COPY public/client/package.json public/client/package-lock.json ./public/client/
COPY public/client ./public/client
RUN cd public/client && npm install && npm run build

FROM node:18
WORKDIR /app

# Install production server deps
COPY package.json package-lock.json ./
RUN npm install --production

# Copy server and built client
COPY server.js ./
COPY public/client/build ./public/client/build

EXPOSE 3000
CMD ["npm", "start"]
