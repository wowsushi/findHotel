FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system front-end && \
          adduser --system -G front-end front-end

COPY dist/apps/front-end .
COPY package.json package-lock.json ./

RUN chown -R front-end:front-end .
RUN npm install --omit=dev

CMD [ "npm", "run", "start" ]