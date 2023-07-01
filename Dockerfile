FROM node:18-alpine as base

COPY package.json ./
COPY yarn.lock ./

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 5050

CMD [ "yarn", "build" ]