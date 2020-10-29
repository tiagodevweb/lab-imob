FROM php:7.3-fpm-alpine

RUN apk add --no-cache openssl bash mysql-client nodejs npm git

RUN docker-php-ext-install pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www

RUN rm -rf /var/www/html

RUN ln -s public html

EXPOSE 9000
