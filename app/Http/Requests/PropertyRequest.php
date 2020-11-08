<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PropertyRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        sleep(2);//simulate slow request
        
        return [
            'email' => 'required|email|max:100',
            'street' => 'required|string|max:100',
            'number' => 'required|max:15',
            'neighborhood' => 'required|string|max:30',
            'city' => 'required|string|max:30',
            'state' => 'required|string|max:30',
        ];
    }

    public function attributes()
    {
        return [
            'street' => 'rua',
            'number' => 'número',
            'neighborhood' => 'bairro',
            'city' => 'cidade',
            'state' => 'estado',
        ];
    }
}
