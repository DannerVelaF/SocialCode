<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $fillable = [
        'biografia',
        'pais',
        'numero',
        'genero',
        'fecha_nacimiento',
        'profile_picture',
        'user_id'
    ];


    public function User()
    {
        return $this->belongsTo('App\Models\User');
    }
}
