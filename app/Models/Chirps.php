<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chirps extends Model
{
    use HasFactory;


    protected $fillable = [
        'body',
        'user_id'
    ];

    public function User()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function Comments()
    {
        return $this->hasMany('App\Models\Comments', 'chirp_id');
    }

    public function Likes()
    {
        return $this->hasMany('App\Models\Like', 'chirp_id');
    }
}
