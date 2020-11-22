<?php

namespace App\Http\Controllers\Api;

use App\Contract;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContractRequest;

class ContractController extends Controller
{

    public function store(ContractRequest $request)
    {
        Contract::create($request->validated());

        return response()->json([
            'message' => trans('messages.contracts.store')
        ], 201);
    }
}
