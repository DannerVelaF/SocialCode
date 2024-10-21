<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public $message, public $sender, public $receiver)
    {
        $this->message = $message;
        $this->sender = $sender;
        $this->receiver = $receiver;
    }


    public function broadcastOn()
    {
        $sortedIds = [$this->message->sender_id, $this->message->receiver_id];
        sort($sortedIds);
        return new PrivateChannel('message.' . implode('.', $sortedIds));
    }

    public function broadcastWith()
    {
        // Incluir el mensaje, sender y receiver dentro de 'message'
        return [
            'message' => [
                'id' => $this->message->id,
                'message' => $this->message->message,
                'created_at' => $this->message->created_at,
                'updated_at' => $this->message->updated_at,
                'sender' => $this->sender,
                'receiver' => $this->receiver,
                'sender_id' => $this->sender->id,
                'receiver_id' => $this->receiver->id,
            ],
            'status' => 'success',
        ];
    }
}
