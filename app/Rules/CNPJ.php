<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CNPJ implements Rule
{
    public function passes($attribute, $value): bool
    {
        if ($value === null) {
            return true;
        }
        return $this->isValid($value);
    }

    public function message()
    {
        return trans('validation.cnpj');
    }

    private function isValid($value): bool
    {
        $c = preg_replace('/\D/', '', $value);
        $b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        if (strlen($c) != 14) {
            return false;
        } elseif (preg_match("/^{$c[0]}{14}$/", $c) > 0) {
            return false;
        }
        for ($i = 0, $n = 0; $i < 12; $n += $c[$i] * $b[++$i]) {
        }
        if ($c[12] != ((($n %= 11) < 2) ? 0 : 11 - $n)) {
            return false;
        }
        for ($i = 0, $n = 0; $i <= 12; $n += $c[$i] * $b[$i++]) {
        }
        if ($c[13] != ((($n %= 11) < 2) ? 0 : 11 - $n)) {
            return false;
        }
        return true;
    }
}
