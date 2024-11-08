# Step 1: Build the React app
FROM node:16 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx HTML directory
COPY --from=build /dist /usr/share/nginx/html

# Expose port 80 to be accessible externally
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
