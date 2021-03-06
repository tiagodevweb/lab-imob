<?php

namespace Tests\Unit;

use App\Property;
use PHPUnit\Framework\TestCase;

class PropertyTest extends TestCase
{
    /** @test */
    public function must_have_fillable()
    {
        $this->assertEquals([
            'email',
            'street',
            'number',
            'neighborhood',
            'city',
            'state',
            'contracted'
        ], (new Property())->getFillable());
    }

    /** @test */
    public function must_have_casts()
    {
        $this->assertEquals([
            'contracted' => 'boolean',
            'id' => 'int'
        ], (new Property())->getCasts());
    }
}
