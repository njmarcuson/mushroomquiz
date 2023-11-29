<?php

namespace Database\Seeders;

use App\Models\Difficulty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DifficultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $difficulties = [
            'Easy',
            'Medium',
            'Hard',
        ];

        foreach ($difficulties as $difficulty) {
            Difficulty::create(['name' => $difficulty]);
        }
    }
}