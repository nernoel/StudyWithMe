# using Node.js alpine runtime as base image
FROM node:18-alpine

# Set the working directory for the container
WORKDIR /app

# Copy package json files to working directory
COPY package*json ./

# Install dependencies
RUN npm install

# Copy all src files to working dir
COPY . .

# Build the nextjs applciation in dev mode (change to production mode with npm run build soon!)
RUN npm run dev

# Export the port app is running on
EXPOSE 3000

# Define the command to start the application
CMD [ "npm", "start" ]