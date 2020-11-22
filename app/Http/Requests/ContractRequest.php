<?php

namespace App\Http\Requests;

use App\Rules\{CPF, CNPJ};
use Illuminate\Foundation\Http\FormRequest;

class ContractRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $documentRule = [
            'required',
            'string'
        ];

        if ($this->person and $this->person === 'Física') {
            array_push($documentRule, 'max:14');
            array_push($documentRule, new CPF);
        } elseif ($this->person and $this->person === 'Jurídica') {
            array_push($documentRule, 'max:18');
            array_push($documentRule, new CNPJ);
        }
        
        return [
            'property_id' => 'required|integer|exists:properties,id|unique:contracts,property_id',
            'person' => 'required|string|max:8',
            'document' => $documentRule,
            'email' => 'required|email|max:100',
            'full_name' => 'required|string|max:30'
        ];
    }

    public function attributes()
    {
        return [
            'property_id' => 'propriedade',
            'person' => 'pessoa',
            'document' => 'documento',
            'full_name' => 'nome completo',
        ];
    }
}
