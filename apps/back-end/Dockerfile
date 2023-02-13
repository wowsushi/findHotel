FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system back-end && \
          adduser --system -G back-end back-end

COPY dist/apps/back-end dist
COPY package.json package-lock.json ./

RUN chown -R back-end:back-end .
RUN npm install --omit=dev

CMD [ "node", "dist/main.js" ]