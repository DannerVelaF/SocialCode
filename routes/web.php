<?php

use App\Http\Controllers\ChirpsController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ProfileController;
use App\Models\Chirps;
use App\Models\Comments;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/dashboard', function () {
    $chirps = Chirps::with(['User.profile', 'Likes.user', 'Comments.user.profile'])->latest()->get();
    /** @var \App\Models\User $user */
    $user = Auth::user()->load('profile');

    return Inertia::render('Dashboard', [
        'chirps' => $chirps,
        'user' => $user
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/uploadImage', [ProfileController::class, 'UploadImage'])->name('profile.upload');
    Route::get("/uploadImage", function () {
        return Inertia::render('Profile/UploadImage');
    })->name("uploadImage");

    Route::post('/chirps', [ChirpsController::class, 'store'])->name('chirp.store');
    Route::put('/chirps', [ChirpsController::class, 'update'])->name('chirp.update');
    Route::delete('/chirps/{id}', [ChirpsController::class, 'destroy'])->name('chirp.destroy');

    Route::post('/like', [LikeController::class, 'store'])->name('like.store');
    Route::delete('/like/{id}', [LikeController::class, 'destroy'])->name('like.destroy');

    Route::post('/comment', [CommentsController::class, 'store'])->name('comment.store');
});

require __DIR__ . '/auth.php';
