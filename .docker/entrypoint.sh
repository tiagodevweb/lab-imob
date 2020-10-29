#!/bin/bash

composer install --no-cache --prefer-dist --no-interaction --no-progress

if [ ! -f ".env" ]; then
    cp .env.example .env
fi

php artisan key:generate

php artisan migrate

npm install

chmod -R 777 storage .env

php-fpm