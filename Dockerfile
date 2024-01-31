FROM node:16-alpine

WORKDIR /usr/src/app

LABEL server="ewa_server"

COPY package.json package-lock.json ./

RUN yarn

COPY . .

EXPOSE 3001

CMD ["yarn", "start"]