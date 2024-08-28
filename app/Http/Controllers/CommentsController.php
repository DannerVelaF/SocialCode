<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'comentario' => "required"
        ]);
        $comment = Comments::create([
            'comentario' => $request->comentario,
            'chirp_id' => $request->chirp_id,
            'user_id' => Auth::id()
        ]);

        return redirect(route('dashboard'));
    }
}
