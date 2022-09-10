FROM node:16

WORKDIR /code

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN yarn install --no-progress
RUN yarn build

CMD yarn start:dev
