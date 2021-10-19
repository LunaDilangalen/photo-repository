FROM node:16-alpine

WORKDIR /frontend
COPY package*.json ./

RUN npm ci
COPY . .

# For dev only
CMD ["npm", "start"]