<?php

namespace App\Broadcasting;

use App\Models\User;

class MessageChannel
{
    /**
     * Create a new channel instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     */
    public function join(User $user, $senderId, $receiverId)
    {
        // Verificar que el usuario autenticado es el remitente o el receptor
        return $user->id === (int) $senderId || $user->id === (int) $receiverId;
    }
}
