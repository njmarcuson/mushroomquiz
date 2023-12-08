<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class MushroomImageController extends Controller
{
    // this will get the 4 image ids of the mushrooms
    public function index(Request $request) {
        $scientificName = $request->get('scientific_name');
        $scientificName = str_replace(' ', '%20', $scientificName);
        $url = "https://mushroomobserver.org/api2/observations?format=json&has_images=1&detail=high&name={$scientificName}";

        $result = file_get_contents($url, false);
        if ($result === false) {
            return abort(500);
        }

        

        $observations = json_decode($result, true)['results'];

        //var_dump($observations);
        //return;

        usort($observations, "self::compareObservations");
        $sliceLength = (count($observations)) < 10 ? count($observations) : 10;
        $observations = array_slice($observations, 0, $sliceLength);

        $imageCount = $sliceLength < 4 ? $sliceLength : 4;

        // get the random 4 
        // return 4 image ids
        $imageIds = [];
        for ($i=0; $i<$imageCount; $i++) {
            $randomIndex = rand(0, count($observations)-1);
            array_push($imageIds, $observations[$randomIndex]['primary_image']['id']);
            array_splice($observations, $randomIndex, 1);
        }

        return json_encode($imageIds);

    }

    // called in usort with a string
    private static function compareObservations($o1, $o2) {
        $confidence1 = array_key_exists('confidence', $o1) ? $o1['confidence'] : -1;
        $confidence2 = array_key_exists('confidence', $o2) ? $o2['confidence'] : -1;
        if ($confidence1 == $confidence2) return 0;
        return ($confidence1 > $confidence2) ? -1 : 1;
    }
}