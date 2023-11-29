<?php

namespace App\Http\Controllers;

use App\Models\Difficulty;
use App\Models\Edibility;
use App\Models\Location;
use App\Models\Quiz;
use App\Traits\IsMobileUserTrait;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    use IsMobileUserTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Difficulty $difficulty)
    {

        $locations = Location::find(explode(',', $request->get('locations')));
        if ($locations->count() == 0) {
            abort(404);
        }

        $edibilities = Edibility::find(explode(',', $request->get('edibilities')));
        if ($edibilities->count() == 0) {
            abort(404);
        }

        $quiz = Quiz::create([
            'difficulty_id' => $difficulty->id,
            'is_mobile' => self::isMobileUser(),
        ]);

        $quiz->edibilities()->attach($edibilities);
        $quiz->locations()->attach($locations);

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