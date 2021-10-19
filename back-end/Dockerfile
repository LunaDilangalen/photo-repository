FROM node:16-alpine

WORKDIR /back-end
COPY package*.json ./

RUN npm ci
COPY . .

# For dev only
CMD ["npm", "start"]