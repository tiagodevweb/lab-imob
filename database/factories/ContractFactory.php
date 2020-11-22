<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Contract;
use App\Property;
use Faker\Generator as Faker;

$factory->define(Contract::class, function (Faker $faker) {
    $person = $faker->randomElement(['Física', 'Jurídica']);
    return [
        'property_id' => function () {
            return factory(Property::class)->create()->id;
        },
        'person' => $person,
        'document' => $person === 'Física' ? 
        mask((string)$faker->numberBetween(10000000000, 99999999999), '###.###.###-##') : 
        mask((string)$faker->numberBetween(10000000000000, 99999999999999), '##.###.###/####-##'),
        'email' => $faker->unique()->safeEmail,
        'full_name' => $faker->name()
    ];
});
