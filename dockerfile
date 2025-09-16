# Use an official Nginx image as a base
FROM nginx:alpine

# Copy your app's files into the Nginx container
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
