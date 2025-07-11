# Use an official Node.js LTS (Long-Term Support) image as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first (for caching layers)
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy application source code
COPY . .

# Expose the app's port (3000 in this case)
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
