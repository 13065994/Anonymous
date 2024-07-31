# Use the official image as a parent image
FROM node:16

# Set the working directory
USER root

# Create and set the working directory
WORKDIR /app

# Copy the file from your host to your current location
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem
COPY . .

# Grant permission to read, write and execute for the app directory and its contents
RUN chmod -R 777 /app

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Khởi động ứng dụng
CMD ["npm", "start"]