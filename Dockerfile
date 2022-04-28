#syntax=docker/dockerfile:1

FROM node:17
LABEL maintainer="IrashinDA"

WORKDIR /usr/src/repairApp
COPY ./dist .
COPY package*.json .
COPY *.env ../

ENV NODE_ENV production


RUN npm ci --only=production
EXPOSE 3000
CMD ["node". "/dist/main.js"]
