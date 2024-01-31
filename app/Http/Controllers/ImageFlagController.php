<?php

namespace App\Http\Controllers;

use App\Models\ImageFlag;
use App\Models\MushroomImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageFlagController extends Controller
{
    public function store(Request $request) {

        $validator = Validator::make($request->all(), [
            'image_id' => ['required', 'exists:mushroom_images,image_id'],
        ]);

        if ($validator->fails()) {
            abort(422);
        }

        $imageId = $request->image_id;

        $mushroomImage = MushroomImage::where('image_id', $imageId)->first();
        $mushroomImageId = $mushroomImage->id;

        // create row if the flag hasn't been made yet
        if (!ImageFlag::where('mushroom_image_id', $mushroomImageId)->exists()) {
            $imageFlag = new ImageFlag([
                'mushroom_image_id' => $mushroomImageId,
            ]);
        } 
        
        // update row if it has been made
        else {
            $imageFlag = ImageFlag::where('mushroom_image_id', $mushroomImageId)->first();
            $imageFlag->num_flags = $imageFlag->num_flags + 1;
            $imageFlag->resolved = false;
        }

        return $imageFlag->save();

    }
}