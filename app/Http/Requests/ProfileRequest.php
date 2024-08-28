<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "biografia" => ['string', 'max:500'],
            'genero' => ['string', 'in:masculino,femenino'],
            "numero" => ['numeric', 'digits:9'],
            'fecha_nacimiento' => ['date', 'before_or_equal:' . now()->subYears(18)->format('Y-m-d')],
            "pais" => ['string']
        ];
    }

    public function messages()
    {
        return [
            'biografia.string' => 'La biografía debe ser un texto.',
            'biografia.max' => 'La biografía no puede tener más de 500 caracteres.',

            'genero.string' => 'El género debe ser un texto.',
            'genero.in' => 'El género debe ser masculino o femenino.',

            'numero.numeric' => 'El número debe ser un valor numérico.',
            'numero.digits' => 'El número debe tener exactamente 9 dígitos.',

            'fecha_nacimiento.date' => 'La fecha de nacimiento debe ser una fecha válida.',
            'fecha_nacimiento.before_or_equal' => 'Debe ser mayor de 18 años.',

            'pais.string' => 'El país debe ser un texto válido.',
        ];
    }
}
