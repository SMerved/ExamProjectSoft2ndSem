# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies (npm install)
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the application (optional, only if your app has a build step)
# For example, for React or Angular apps you might run npm run build
RUN npm run build

# Expose the port the app will run on (optional, based on your app's config)
EXPOSE 3001

# Command to run your app (this assumes you have a start script in package.json)
CMD ["npm", "start"]