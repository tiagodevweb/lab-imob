FROM nginx:1.15.0-alpine

RUN apk add --no-cache openssl

ADD ./vhost.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www