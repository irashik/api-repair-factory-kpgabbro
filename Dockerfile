#syntax=docker/dockerfile:1

FROM node:17
LABEL maintainer="IrashinDA"

WORKDIR /usr/src/repairApp
COPY ./dist .
COPY package*.json .
COPY *.env ../
COPY ./wait-for-it ./wait-for-it

ENV NODE_ENV production
EXPOSE 3000

RUN npm ci --only=production
CMD ["node", "main.js"]
