<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;

    protected $fillable = [
        'comentario',
        'user_id',
        'chirp_id'
    ];


    public function User()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function Chirp()
    {
        return $this->belongsTo('App\Models\Chirps');
    }
}
