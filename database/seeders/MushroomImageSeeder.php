<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mushroom;
use App\Models\MushroomImage;

class MushroomImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // STEP 1
        // LOOP THROUGH OBSERVATIONS AND CREATE ARRAY:
        // { NAME_ID => {IMAGE_ID_1, IMAGE_ID_2, ...} }
        // ONLY FOR CONFIDENCE > 2
        $mushroomImages = [];

        $badImageIds = ['255377'];

        $mushroomFile = fopen(base_path("database/data/observations.csv"), "r");
        $data = fgetcsv($mushroomFile, 0, "\t"); // first line is the column names
        while (($data = fgetcsv($mushroomFile, 0, "\t")) !== FALSE) {
            $nameId = $data[1];
            $confidence = $data[7];
            $imageId = $data[9];
            
            if ($imageId == "NULL" or $confidence == "NULL" or $confidence < 2
                or in_array($imageId, $badImageIds)) {
                continue;
            }

            if (!array_key_exists($nameId, $mushroomImages)) {
                $mushroomImages[$nameId] = [];
            }

            if (!in_array($imageId, $mushroomImages[$nameId])) {
                array_push($mushroomImages[$nameId], $imageId);
            }

        }

        // STEP 2
        // LOOP THROUGH NAMES
        // IF NAME IS IN MUSHROOM DATABASE THEN ADD THE IMAGE IDS TO DATABASE
        $namesFile = fopen(base_path("database/data/names.csv"), "r");
        $data = fgetcsv($namesFile, 0, "\t"); // first line is the column names
        while (($data = fgetcsv($namesFile, 0, "\t")) !== FALSE) {
            $nameId = $data[0];
            $name = $data[1];

            $mushroom = Mushroom::where('scientific_name', $name)->first();
            if (is_null($mushroom) or !array_key_exists($nameId, $mushroomImages)) {
                continue;
            }
            
            $imageIds = $mushroomImages[$nameId];

            foreach ($imageIds as $imageId) {
                MushroomImage::create([
                    'mushroom_id' => $mushroom->id,
                    'image_id' => $imageId,
                ]);
            }

        }

    }
}