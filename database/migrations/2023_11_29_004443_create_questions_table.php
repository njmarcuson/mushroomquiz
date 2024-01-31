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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_id')->constrained();
            $table->tinyInteger('question_number');
            $table->foreignId('option1_mushroom_id')->constrained('mushrooms');
            $table->foreignId('option2_mushroom_id')->constrained('mushrooms');
            $table->foreignId('option3_mushroom_id')->constrained('mushrooms');
            $table->foreignId('option4_mushroom_id')->constrained('mushrooms');
            $table->foreignId('correct_mushroom_id')->constrained('mushrooms');
            $table->foreignId('answered_mushroom_id')->nullable()->constrained('mushrooms');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};