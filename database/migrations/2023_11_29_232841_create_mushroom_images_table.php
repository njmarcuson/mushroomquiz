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
        Schema::create('mushroom_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mushroom_id')->constrained();
            $table->string('image_id')->unique();
            $table->boolean('is_bad')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mushroom_images');
    }
};