<?php

namespace Tests\Unit;

use App\Contract;
use PHPUnit\Framework\TestCase;

class ContractTest extends TestCase
{
    /** @test */
    public function must_have_fillable()
    {
        $this->assertEquals([
            'property_id',
            'person',
            'document',
            'email',
            'full_name'
        ], (new Contract())->getFillable());
    }
}
