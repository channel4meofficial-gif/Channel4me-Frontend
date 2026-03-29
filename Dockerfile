# --------------------------------------------------------------------------
# Stage 1: Build the React Application
# --------------------------------------------------------------------------
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
# Using legacy-peer-deps ensures CRA installs smoothly if there are any React 18 conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the app to generate static files in the /app/build folder
RUN npm run build

# --------------------------------------------------------------------------
# Stage 2: Serve the application using an internal lightweight Nginx server
# --------------------------------------------------------------------------
FROM nginx:alpine

# Copy the internal Nginx configuration for serving the React Single Page App
COPY nginx-internal.conf /etc/nginx/conf.d/default.conf

# Copy the built React files from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 (inside the container network)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
