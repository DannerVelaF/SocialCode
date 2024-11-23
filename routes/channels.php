<?php

use App\Broadcasting\MessageChannel;
use Illuminate\Support\Facades\Broadcast;



Broadcast::channel('message.{senderId}.{receiverId}', MessageChannel::class);
Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
  return (int) $user->id === (int) $id;
});
