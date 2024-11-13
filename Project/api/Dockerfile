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

# Run esbuild to bundle the project (since you now use esbuild)
RUN npm run build

# Expose the port the app will run on
EXPOSE 3001

# Command to run your app, using the bundled file
CMD ["node", "dist/bundle.js"]
