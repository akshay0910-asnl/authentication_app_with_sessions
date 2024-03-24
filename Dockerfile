FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 6500

EXPOSE 9229

CMD [ "npm", "start" ]