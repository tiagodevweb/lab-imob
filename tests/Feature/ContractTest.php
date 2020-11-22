<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Str;
use App\{Contract, Property};
use Illuminate\Foundation\Testing\RefreshDatabase;

class ContractTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function should_return_error_when_property_id_is_empty()
    {
        $this->storeContract(['property_id' => ''])
            ->assertSessionHasErrors('property_id');
    }

    /** @test */
    public function should_return_error_when_property_id_exists()
    {
        $property = factory(Property::class)->create();

        factory(Contract::class)->create(['property_id' => $property->id]);

        $this->storeContract(['property_id' => $property->id])
            ->assertSessionHasErrors('property_id');
    }

    /** @test */
    public function should_return_error_when_person_is_empty()
    {
        $this->storeContract(['person' => ''])
            ->assertSessionHasErrors('person');
    }

    /** @test */
    public function should_return_an_error_when_the_person_is_longer_than_8_characters()
    {
        $this->storeContract(['person' => Str::random(9)])
            ->assertSessionHasErrors('person');
    }

    /** @test */
    public function should_return_error_when_document_is_empty()
    {
        $this->storeContract(['document' => ''])
            ->assertSessionHasErrors('document');
    }

    /** @test */
    public function should_return_error_when_document_is_not_a_string()
    {
        $this->storeContract(['document' => 123])
            ->assertSessionHasErrors('document');
    }

    /** @test */
    public function should_return_error_when_document_is_invalid()
    {
        $this->storeContract(['document' => '12345678'])
            ->assertSessionHasErrors('document');
    }

    /** @test */
    public function should_return_error_when_email_is_empty()
    {
        $this->storeContract(['email' => ''])
            ->assertSessionHasErrors('email');
    }

    /** @test */
    public function should_return_error_when_email_is_invalid()
    {
        $this->storeContract(['email' => 'invalid_email'])
            ->assertSessionHasErrors('email');
    }

    /** @test */
    public function should_return_an_error_when_the_email_is_longer_than_100_characters()
    {
        $this->storeContract(['email' => Str::random(101)])
            ->assertSessionHasErrors('email');
    }

    /** @test */
    public function should_return_error_when_full_name_is_empty()
    {
        $this->storeContract(['full_name' => ''])
            ->assertSessionHasErrors('full_name');
    }

    /** @test */
    public function should_return_error_when_full_name_is_not_a_string()
    {
        $this->storeContract(['full_name' => 123])
            ->assertSessionHasErrors('full_name');
    }

    /** @test */
    public function should_return_an_error_when_the_full_name_is_longer_than_30_characters()
    {
        $this->storeContract(['full_name' => Str::random(31)])
            ->assertSessionHasErrors('full_name');
    }

    /** @test */
    public function must_create_a_contract_in_the_database()
    {
        $data = factory(Contract::class)->make([
            'person' => 'Física',
            'document' => '53741606057'
        ])->toArray();

        $this->post(route('api.contracts.store'), $data)
            ->assertStatus(201)
            ->assertJsonFragment([
                'message' => trans('messages.contracts.store')
            ]);

        $this->assertDatabaseHas('contracts', [
            'property_id' => $data['property_id'],
            'person' => $data['person'],
            'document' => $data['document'],
            'email' => $data['email'],
            'full_name' => $data['full_name']
        ]);
    }

    protected function storeContract($overrides = [])
    {
        $data = factory(Contract::class)->make($overrides)->toArray();

        return $this->post(route('api.contracts.store'), $data);
    }
}
