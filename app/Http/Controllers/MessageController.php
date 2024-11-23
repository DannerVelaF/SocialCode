<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use App\Notifications\MessageRecived;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $authUserId = Auth::id();

        // Obtener los últimos mensajes de cada conversación
        $lastMessages = Message::where('sender_id', $authUserId)
            ->orWhere('receiver_id', $authUserId)
            ->orderBy('created_at', 'desc') // Ordenamos por fecha en orden descendente
            ->get()
            ->unique(function ($message) use ($authUserId) {
                // Agrupamos por el ID del otro usuario en el chat
                return $message->sender_id == $authUserId ? $message->receiver_id : $message->sender_id;
            });

        // Recopilar los IDs de los usuarios con los que se ha tenido una conversación
        $contactUserIds = $lastMessages->map(function ($message) use ($authUserId) {
            return $message->sender_id == $authUserId ? $message->receiver_id : $message->sender_id;
        });

        // Obtener la información de los usuarios en base a los IDs recopilados
        $contacts = User::whereIn('id', $contactUserIds)
            ->with('profile') // Cargar el perfil si es necesario
            ->get()
            ->map(function ($user) use ($authUserId) {
                // Obtener el último mensaje individual de cada conversación
                $lastMessage = Message::where(function ($query) use ($authUserId, $user) {
                    $query->where('sender_id', $authUserId)
                        ->where('receiver_id', $user->id);
                })
                    ->orWhere(function ($query) use ($authUserId, $user) {
                        $query->where('sender_id', $user->id)
                            ->where('receiver_id', $authUserId);
                    })
                    ->orderBy('created_at', 'desc')
                    ->first();

                $user->last_message = $lastMessage;
                return $user;
            });

        return Inertia::render('Chat/Chat', [
            'chats' => $contacts,
        ]);
    }



    public function messages(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'receiver_id' => 'required|integer',
        ]);
        $message = Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        $sender = Auth::user();
        $receiver = User::find($request->receiver_id);

        MessageSent::dispatch($message, $sender, $receiver);
        $receiver->notify(new MessageRecived($message, $sender));

        return response()->json([
            'message' => $message,
            'sender' => $sender,
            'receiver' => $receiver,
            'status' => 'success',
        ]);
    }

    public function showChat($user_name)
    {
        $receiverUser = User::where('user_name', $user_name)->with('profile')->first();
        $authUser = Auth::user();

        if (!$receiverUser) {
            return redirect()->route('messages.index')->withErrors(['error' => 'Usuario no encontrado']);
        }

        // Obtener todos los mensajes del chat con el $user_name
        $messages = Message::where(function ($query) use ($authUser, $receiverUser) {
            $query->where('sender_id', $authUser->id)
                ->where('receiver_id', $receiverUser->id);
        })->orWhere(function ($query) use ($authUser, $receiverUser) {
            $query->where('sender_id', $receiverUser->id)
                ->where('receiver_id', $authUser->id);
        })->with(['sender', 'receiver'])
            ->orderBy('created_at', 'asc')
            ->get();

        // Recopilar el último mensaje de cada conversación individualmente
        $contactUserIds = Message::where('sender_id', $authUser->id)
            ->orWhere('receiver_id', $authUser->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->unique(function ($message) use ($authUser) {
                return $message->sender_id == $authUser->id ? $message->receiver_id : $message->sender_id;
            })
            ->map(function ($message) use ($authUser) {
                return $message->sender_id == $authUser->id ? $message->receiver_id : $message->sender_id;
            });

        // Obtener la información de los contactos y su último mensaje
        $contacts = User::whereIn('id', $contactUserIds)
            ->with('profile')
            ->get()
            ->map(function ($user) use ($authUser) {
                // Obtener el último mensaje individual de cada conversación
                $lastMessage = Message::where(function ($query) use ($authUser, $user) {
                    $query->where('sender_id', $authUser->id)
                        ->where('receiver_id', $user->id);
                })->orWhere(function ($query) use ($authUser, $user) {
                    $query->where('sender_id', $user->id)
                        ->where('receiver_id', $authUser->id);
                })
                    ->orderBy('created_at', 'desc')
                    ->first();

                $user->last_message = $lastMessage;
                return $user;
            });

        // Renderiza la vista con la información del usuario receptor y los contactos
        return Inertia::render('Chat/Chat', [
            'receiverUser' => $receiverUser,
            'messages' => $messages,
            'chats' => $contacts,
        ]);
    }
}
