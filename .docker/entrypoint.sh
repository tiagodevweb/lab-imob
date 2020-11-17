#!/bin/bash

composer install --no-cache --prefer-dist --no-interaction --no-progress

if [ ! -f ".env" ]; then
    cp .env.example .env
fi

php artisan key:generate

php artisan migrate

if [ ! -d "node_modules" ]; then
    npm install
fi

if [ ! -f "public/mix-manifest.json" ]; then
    npm run dev
fi

chmod -R 777 storage .env

php-fpm