FROM node

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 6500

EXPOSE 9229

RUN chown -R node /usr/src/app

USER node

CMD [ "npm", "start" ]