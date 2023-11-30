<?php

namespace App\Http\Controllers;

use App\Models\Difficulty;
use App\Models\Edibility;
use App\Models\Location;
use App\Models\Quiz;
use App\Traits\IsMobileUserTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Stringable;

class QuizController extends Controller
{
    use IsMobileUserTrait;
    /**
     * Display the app.
     */
    public function index()
    {
        return view('app', [
            'edibilities' => $this->addIsClicked(Edibility::all()),
            'locations' => $this->addIsClicked(Location::all()),
            'difficulties' => $this->addIsClicked(Difficulty::all()),
            'token' => csrf_token(),
        ]);
    }

    private function addIsClicked(Collection $collection): string
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
     * 
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created quiz.
     */
    public function store(Request $request)
    {

        $locations = Location::find(explode(',', $request->get('locations')));
        if ($locations->count() == 0) {
            abort(404);
        }

        $edibilities = Edibility::find(explode(',', $request->get('edibilities')));
        if ($edibilities->count() == 0) {
            abort(404);
        }

        $difficulty = Difficulty::find($request->get('difficulty'));
        $quiz = Quiz::create([
            'slug' => uniqid() . Str::random(10),
            'difficulty_id' => $difficulty->id,
            'is_mobile' => self::isMobileUser(),
        ]);

        $quiz->edibilities()->attach($edibilities);
        $quiz->locations()->attach($locations);

        return $quiz->slug;

    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quiz $quiz)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        //
    }
}