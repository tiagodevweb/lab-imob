<?php

namespace App\Http\Controllers\Api;

use App\Property;
use App\Http\Controllers\Controller;
use App\Http\Requests\PropertyRequest;

class PropertyController extends Controller
{
    public function store(PropertyRequest $request)
    {
        Property::create($request->validated());

        return response()->json([
            'message' => trans('messages.properties.store')
        ], 201);
    }
}
