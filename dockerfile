# Base image for Node.js
FROM node:20
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install
# Copy the entire application code to the container
COPY . .
# Expose the application port
EXPOSE 3000
# Default command to run the application
CMD ["npm", "start"]