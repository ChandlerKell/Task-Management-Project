FROM node:14-alpine3.11

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

CMD npm run dev


