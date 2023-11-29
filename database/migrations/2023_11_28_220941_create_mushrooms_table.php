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
        Schema::create('mushrooms', function (Blueprint $table) {
            $table->id();
            $table->string('scientific_name')->unique();
            $table->string('popular_name1')->nullable();
            $table->string('popular_name2')->nullable();
            $table->string('popular_name3')->nullable();
            $table->foreignId('edibility_id');
            $table->text('edibility_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mushrooms');
    }
};