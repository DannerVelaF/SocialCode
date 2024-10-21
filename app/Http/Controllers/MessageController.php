<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('Chat/Chat');
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

        $sender = Auth::user(); // Obtener los datos del usuario autenticado (remitente)
        $receiver = User::find($request->receiver_id);

        MessageSent::dispatch($message, $sender, $receiver);


        return response()->json([
            'message' => $message,
            'sender' => $sender,
            'receiver' => $receiver,
            'status' => 'success',
        ]);
    }

    public function showChat($user_name)
    {
        // Obtener el usuario receptor basado en su nombre de usuario
        $receiverUser = User::where('user_name', $user_name)->with('profile')->first();
        $authUser = Auth::user();

        $messages = Message::where(function ($query) use ($authUser, $receiverUser) {
            $query->where('sender_id', $authUser->id)
                ->where('receiver_id', $receiverUser->id);
        })->orWhere(function ($query) use ($authUser, $receiverUser) {
            $query->where('sender_id', $receiverUser->id)
                ->where('receiver_id', $authUser->id);
        })->with(['sender', 'receiver'])  // Cargamos las relaciones sender y receiver
            ->orderBy('created_at', 'asc')
            ->get();


        // Verificar si el usuario existe
        if (!$receiverUser) {
            return redirect()->back()->withErrors(['error' => 'Usuario no encontrado']);
        }

        // Renderiza la vista con la información del usuario receptor
        return Inertia::render('Chat/Chat', [
            'receiverUser' => $receiverUser,  // Pasamos el usuario receptor a la vista
            'messages' => $messages,          // Pasamos los mensajes a la vista
        ]);
    }
}
