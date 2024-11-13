# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Compile TypeScript files to JavaScript
RUN npx tsc

# Expose the port the app will run on
EXPOSE 3001

# Command to run your app
CMD ["node", "dist/server.js"]
