FROM docker.io/node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start" ]