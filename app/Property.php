<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'email',
        'street',
        'number',
        'neighborhood',
        'city',
        'state'
    ];
}
