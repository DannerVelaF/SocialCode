<?php

use App\Broadcasting\MessageChannel;
use Illuminate\Support\Facades\Broadcast;



Broadcast::channel('message.{senderId}.{receiverId}', MessageChannel::class);
