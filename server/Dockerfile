FROM node:12-alpine AS build

WORKDIR /server

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build


FROM node:12-alpine AS server

WORKDIR /server

COPY package.json yarn.lock ./

RUN yarn install --production

# COPY --from=build ./server/public ./public
COPY --from=build ./server/build ./build

ENV PORT=8080

EXPOSE 8080

CMD ["yarn", "start"]