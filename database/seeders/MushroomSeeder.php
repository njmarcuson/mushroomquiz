<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mushroom;
use App\Models\Location;
use App\Models\MushroomLocation;
use App\Models\Edibility;

class MushroomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mushroomFile = fopen(base_path("database/data/mushrooms.csv"), "r");

        $data = fgetcsv($mushroomFile, 2000, ","); // first line is the column names
        while (($data = fgetcsv($mushroomFile, 2000, ",")) !== FALSE) {

            $edibilityString = ""; // will error below if string remains empty
            if ($data[4] == 1) {
                $edibilityString = "Psychedelic";
            } elseif ($data[5] == 1) {
                $edibilityString = "Edible";
            } elseif ($data[6] == 1) {
                $edibilityString = "Inedible";
            } elseif ($data[7] == 1) {
                $edibilityString = "Poisonous";
            }

            $edibility = Edibility::where('name', $edibilityString)->first();

            $mushroom = Mushroom::create([
                'scientific_name' => $data[0],
                'popular_name1' => $data[1],
                'popular_name2' => $data[2],
                'popular_name3' => $data[3],
                'edibility_id' => $edibility->id,
                'edibility_notes' => $data[8],
            ]);

            // looping through the location vars
            for ($i=9; $i<=14; $i++) {
                if ($data[$i] == "") {
                    continue;
                }

                $location = Location::where('name', $data[$i])->first();
                MushroomLocation::create([
                    'mushroom_id' => $mushroom->id,
                    'location_id' => $location->id,
                ]);
            }
            
        }

        fclose($mushroomFile);

    }
}