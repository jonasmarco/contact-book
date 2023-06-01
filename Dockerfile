# 1st Stage - "builder"
# Base image
FROM node:16 AS builder
# Set working directory
WORKDIR /app
# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./
# Install dependencies
RUN yarn install
# Copy the rest of your app's source code
COPY . .
# Build the app
RUN yarn build
# Exposes the port to access the app from outside the container i.e from the browser
EXPOSE 5173
# Serve the app
CMD ["yarn", "run", "dev"]
