FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD [ "npm", "start"]

