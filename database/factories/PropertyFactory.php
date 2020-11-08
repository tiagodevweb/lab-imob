<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Property;
use Faker\Generator as Faker;

$factory->define(Property::class, function (Faker $faker) {
    return [
        'email' => $faker->unique()->safeEmail,
        'street' => $faker->sentence(2),
        'number' => $faker->numberBetween(100, 500),
        'neighborhood' => $faker->sentence(1),
        'city' => $faker->sentence(1),
        'state' => $faker->sentence(1)
    ];
});
