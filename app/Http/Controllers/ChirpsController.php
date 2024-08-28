<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChirpRequest;
use App\Models\Chirps;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChirpsController extends Controller
{
    public function store(ChirpRequest $request)
    {
        $chirp = Chirps::create([
            'body' => $request->body,
            'user_id' => Auth::id()
        ]);
        return redirect(route('dashboard'));
    }

    public function update(Request $request)
    {
        $chirp = Chirps::find($request->chirp_id);
        $chirp->update([
            'body' => $request->body,
        ]);
        return redirect(route('dashboard'));
    }

    public function destroy($id): RedirectResponse
    {
        $chirp = Chirps::findOrFail($id);
        $chirp->delete();
        return redirect(route('dashboard'));
    }
}
