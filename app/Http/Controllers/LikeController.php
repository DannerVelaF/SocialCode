<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function store(Request $request)
    {
        $like = Like::create([
            'user_id' => Auth::id(),
            'chirp_id' => $request->chirp_id,

        ]);
        return response()->json([
            'success' => true,
            'like' => $like
        ]);
    }

    public function destroy($id)
    {
        $like = Like::find($id);
        $like->delete();
        return response()->json([
            'success' => true
        ]);
    }
}
