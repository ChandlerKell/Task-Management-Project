FROM node:14-alpine3.11 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

CMD ["npm", "run", "serve"]

FROM nginx:1.20.2-alpine 

COPY --from=build /app/dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]


