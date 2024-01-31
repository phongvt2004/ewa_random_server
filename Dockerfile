FROM node:16-alpine

WORKDIR /usr/src/app

LABEL server="ewa_server"

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3002

CMD ["yarn", "start"]