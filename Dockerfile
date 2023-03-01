# Select the image to use
FROM node

# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "build" ]

### Install dependencies in the root of the Container
#COPY package.json ./
#ENV NODE_PATH=/node_modules
#ENV PATH=$PATH:/node_modules/.bin
#RUN npm install
#
## Add project files to /app route in Container
#ADD . /app
#
## Set working dir to /app
#WORKDIR /app
#
## expose port 3000
#EXPOSE 3000