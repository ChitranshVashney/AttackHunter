# Use the official Node.js 18 image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files.
COPY package*.json ./

# Install the necessary dependencies.
RUN npm install

# Copy the remaining application code.
COPY . .

# Expose port 3000 (or the port your app runs on).
EXPOSE 8000

# Start the application.
CMD ["node", "index.js"]
