FROM node:21-alpine

RUN apk update && apk add bash

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

ARG FILENAME
COPY ${FILENAME} ./file.txt

COPY package*.json ./

RUN npm install

USER node

COPY --chown=node:node . .
