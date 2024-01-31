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
        Schema::create('image_flags', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mushroom_image_id')->constrained();
            $table->boolean('resolved')->default(false);
            $table->integer('num_flags')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_flags');
    }
};