FROM docker.io/node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV NPM_CONFIG_REGISTRY=https://registry.npm.taobao.org

RUN npx nx run-many --target=build --all=true

CMD ["npx", "nx", "run-many", "--target=serve", "--all=true"]
