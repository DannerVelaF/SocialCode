<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->text('biografia')->nullable();
            $table->text('pais')->nullable();
            $table->integer('numero')->nullable();
            $table->enum('genero', ['masculino', 'femenino'])->nullable();
            $table->date('fecha_nacimiento')->nullable();
            $table->string('profile_picture')->default('ProfileDefault.png');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
