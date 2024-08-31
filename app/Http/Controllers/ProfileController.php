<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function show($user_name): Response
    {
        $user = User::where('user_name', $user_name)
            ->with(['profile', 'chirps.comments.user.profile', 'chirps.likes.user', 'chirps.user.profile']) // Cargar chirps del usuario con comentarios y likes
            ->firstOrFail();

        return Inertia::render('Profile/Edit', [
            'user' => $user,
            'profile' => $user->profile,
            'chirps' => $user->chirps, // Ya incluye los comentarios y likes
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function edit(ProfileRequest $request): RedirectResponse
    {

        $user = Auth::user();
        $user->profile()->update([
            'biografia' => $request->biografia,
            "genero" => $request->genero,
            "numero" => $request->numero,
            "fecha_nacimiento" => $request->fecha_nacimiento,
            "pais" => $request->pais,
        ]);

        return Redirect::route('profile.show', ['user_name' => $user->user_name]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.show');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function UploadImage(Request $request)
    {
        $userId = Auth::id();

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');

            $fileName = time() . '.' . $file->getClientOriginalExtension();

            $file->storeAs('public/images', $fileName);
            $profile = Profile::create([
                'profile_picture' => $fileName,
                'user_id' => $userId,
                'fecha_nacimiento' => $request->fecha_nacimiento
            ]);
        } else {
            $profile = Profile::create([
                'user_id' => $userId,
                'fecha_nacimiento' => $request->fecha_nacimiento
            ]);
        }
        return redirect()->route('dashboard');
    }
}
