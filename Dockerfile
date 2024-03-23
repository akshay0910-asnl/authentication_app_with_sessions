FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 6500

CMD [ "npm", "run","dev" ]