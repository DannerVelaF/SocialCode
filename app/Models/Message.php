<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = "message";
    protected $fillable = ["sender_id", "receiver_id", "message"];

    // Relación con el usuario remitente
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // Relación con el usuario receptor
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
