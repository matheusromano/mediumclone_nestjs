FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install 

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]