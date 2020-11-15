<?php

namespace Tests\Feature;

use App\Property;
use Tests\TestCase;
use Illuminate\Support\Str;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PropertyTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function must_list_registered_properties()
    {
        $property = factory(Property::class)->create();

        $this->get(route('api.properties.store'))
            ->assertStatus(200)
            ->assertJsonStructure([
                [
                    'email',
                    'street',
                    'number',
                    'neighborhood',
                    'city',
                    'state',
                    'contracted',
                ]
            ])
            ->assertJsonFragment([
                'email' => $property->email
            ]);
    }

    /** @test */
    public function should_return_error_when_email_is_empty()
    {
        $this->storeProperty(['email' => ''])
            ->assertSessionHasErrors('email');
    }

    /** @test */
    public function should_return_error_when_email_is_invalid()
    {
        $this->storeProperty(['email' => 'invalid_email'])
            ->assertSessionHasErrors('email');
    }

    /** @test */
    public function should_return_an_error_when_the_email_is_longer_than_100_characters()
    {
        $this->storeProperty(['email' => Str::random(101)])
            ->assertSessionHasErrors('email');
    }

    /** @test */
    public function should_return_error_when_street_is_empty()
    {
        $this->storeProperty(['street' => null])
            ->assertSessionHasErrors('street');
    }

    /** @test */
    public function should_return_error_when_street_is_not_a_string()
    {
        $this->storeProperty(['street' => 123])
            ->assertSessionHasErrors('street');
    }

    /** @test */
    public function should_return_an_error_when_the_street_is_longer_than_100_characters()
    {
        $this->storeProperty(['street' => Str::random(101)])
            ->assertSessionHasErrors('street');
    }

    /** @test */
    public function should_return_error_when_number_is_empty()
    {
        $this->storeProperty(['number' => ''])
            ->assertSessionHasErrors('number');
    }

    /** @test */
    public function should_return_an_error_when_the_number_is_longer_than_15_characters()
    {
        $this->storeProperty(['number' => Str::random(16)])
            ->assertSessionHasErrors('number');
    }

    /** @test */
    public function should_return_error_when_neighborhood_is_empty()
    {
        $this->storeProperty(['neighborhood' => ''])
            ->assertSessionHasErrors('neighborhood');
    }

    /** @test */
    public function should_return_error_when_neighborhood_is_not_a_string()
    {
        $this->storeProperty(['neighborhood' => 123])
            ->assertSessionHasErrors('neighborhood');
    }

    /** @test */
    public function should_return_an_error_when_the_neighborhood_is_longer_than_30_characters()
    {
        $this->storeProperty(['neighborhood' => Str::random(31)])
            ->assertSessionHasErrors('neighborhood');
    }

    /** @test */
    public function should_return_error_when_city_is_empty()
    {
        $this->storeProperty(['city' => ''])
            ->assertSessionHasErrors('city');
    }

    /** @test */
    public function should_return_error_when_city_is_not_a_string()
    {
        $this->storeProperty(['city' => 123])
            ->assertSessionHasErrors('city');
    }

    /** @test */
    public function should_return_an_error_when_the_city_is_longer_than_30_characters()
    {
        $this->storeProperty(['city' => Str::random(31)])
            ->assertSessionHasErrors('city');
    }

    /** @test */
    public function should_return_error_when_state_is_empty()
    {
        $this->storeProperty(['state' => ''])
            ->assertSessionHasErrors('state');
    }

    /** @test */
    public function should_return_error_when_state_is_not_a_string()
    {
        $this->storeProperty(['state' => 123])
            ->assertSessionHasErrors('state');
    }

    /** @test */
    public function should_return_an_error_when_the_state_is_longer_than_30_characters()
    {
        $this->storeProperty(['state' => Str::random(31)])
            ->assertSessionHasErrors('state');
    }

    /** @test */
    public function must_create_a_property_in_the_database()
    {
        $data = factory(Property::class)->make()->toArray();

        $this->post(route('api.properties.store'), $data)
            ->assertStatus(201)
            ->assertJsonFragment([
                'message' => trans('messages.properties.store')
            ]);

        $this->assertDatabaseHas('properties', [
            'email' => $data['email'],
            'street' => $data['street'],
            'number' => $data['number'],
            'neighborhood' => $data['neighborhood'],
            'city' => $data['city'],
            'state' => $data['state']
        ]);
    }

    /** @test */
    public function must_delete_a_property_in_the_database()
    {
        $property = factory(Property::class)->create();

        $this->delete(route('api.properties.delete', $property))
            ->assertStatus(200)
            ->assertJsonFragment([
                'message' => trans('messages.properties.delete')
            ]);

        $this->assertDatabaseMissing('properties', [
            'email' => $property->email,
            'street' => $property->street,
            'number' => $property->number,
            'neighborhood' => $property->neighborhood,
            'city' => $property->city,
            'state' => $property->state
        ]);
    }
    protected function storeProperty($overrides = [])
    {
        $data = factory(Property::class)->make($overrides)->toArray();

        return $this->post(route('api.properties.store'), $data);
    }
}
