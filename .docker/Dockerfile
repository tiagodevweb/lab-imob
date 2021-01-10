FROM php:7.3-fpm-alpine

RUN apk add --no-cache openssl bash mysql-client nodejs npm git

RUN docker-php-ext-install pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

RUN rm -rf html

RUN ln -s public html

EXPOSE 9000
