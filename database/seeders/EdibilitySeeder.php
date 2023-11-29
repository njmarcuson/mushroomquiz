<?php

namespace Database\Seeders;

use App\Models\Edibility;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EdibilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $edibilities = [
            'Psychedelic',
            'Edible',
            'Inedible',
            'Poisonous',
        ];

        foreach ($edibilities as $edibility) {
            Edibility::create(['name' => $edibility]);
        }
    }
}