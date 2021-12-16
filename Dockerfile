FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# RUN npm install -g pnpm
RUN npm install

# To run as a production code
# RUN pnpm ci --only=production

# App source
COPY . .

EXPOSE 3000
EXPOSE 8080

CMD [ "node", "./dist/server.js"]

