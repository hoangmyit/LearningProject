# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy app files.
COPY . .

# Expose the port the app runs on.
EXPOSE 3000

# Start the app.
CMD [ "node", "app.js" ]
