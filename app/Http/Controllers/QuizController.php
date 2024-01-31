<?php

namespace App\Http\Controllers;

use App\Models\Difficulty;
use App\Models\Edibility;
use App\Models\Location;
use App\Models\Quiz;
use App\Traits\IsMobileUserTrait;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    use IsMobileUserTrait;
    /**
     * Display the app.
     */
    public function index()
    {
        return view('app', [
            'edibilities' => $this->addIsClickedForJson(Edibility::all()),
            'locations' => $this->addIsClickedForJson(Location::all()),
            'difficulties' => $this->addIsClickedForJson(Difficulty::all()),
            'token' => csrf_token(),
        ]);
    }

    private function addIsClickedForJson(Collection $collection): string
    {
        $arrays = $collection->toArray();
        for ($i=0; $i<count($arrays); $i++) {
            $arrays[$i]['isClicked'] = false;
            unset($arrays[$i]['created_at']);
            unset($arrays[$i]['updated_at']);
        }
        return json_encode($arrays);
    }

    /**
     * Store a newly created quiz.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'locations' => 'required',
            'edibilities' => 'required',
            'difficulty' => 'required',        
        ]);

        if ($validator->fails()) {
            abort(422);
        }

        $locations = Location::find(explode(',', $request->locations));
        $edibilities = Edibility::find(explode(',', $request->edibilities));
        $difficulty = Difficulty::find($request->difficulty);

        if ($locations->count() == 0 or
            $edibilities->count() == 0 or
            is_null($difficulty)) {
            abort(422);
        }
        
        $quiz = Quiz::create([
            'slug' => uniqid() . Str::random(10),
            'difficulty_id' => $difficulty->id,
            'is_mobile' => self::isMobileUser(),
        ]);

        $quiz->edibilities()->attach($edibilities);
        $quiz->locations()->attach($locations);

        return json_encode($quiz->slug);

    }

}