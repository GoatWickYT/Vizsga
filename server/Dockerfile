# Use Node.js 20 Alpine for a small image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port defined in .env
ENV PORT=${PORT}

# Start the compiled app
CMD ["node", "dist/index.js"]
