<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            'North America',
            'South America',
            'Europe',
            'Asia',
            'Africa',
            'Pacific Islands',
        ];

        foreach ($locations as $location) {
            Location::create(['name' => $location]);
        }
    }
}