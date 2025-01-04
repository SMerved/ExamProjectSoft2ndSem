# Use the official Node.js image as a base
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Copy the environment file for the appropriate environment
COPY .env.production .env

# Build the React app
RUN npm run buildProd

# Set the environment variable for the React app to be served
ENV NODE_ENV=production

# Install a lightweight server to serve the React app
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 5173

# Start the app using the serve package
CMD ["serve", "-s", "/app/dist", "-l", "5173"]