FROM node:16 AS builder
MAINTAINER Fotone <jaemuon5582@gmail.com>

ENV GIT_URL https://github.com/fotoner-p/law-farm-front.git

RUN mkdir -p /app && git clone ${GIT_URL} /app
WORKDIR /app

RUN yarn install
RUN yarn build

FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d

COPY --from=builder /app/build /usr/share/nginx/html
