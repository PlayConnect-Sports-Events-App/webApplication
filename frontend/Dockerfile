# Step 1: Build the React application
# Use a node base image
FROM node:alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the application using a simple server
# Use an nginx base image
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access it from the outside.
EXPOSE 80

# Start nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]