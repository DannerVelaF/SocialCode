<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'chirp_id'
    ];

    public function User()
    {
        return $this->belongsTo('App\Models\User');
    }
    public function Comment()
    {
        return $this->belongsTo('App\Models\Comments');
    }
}
