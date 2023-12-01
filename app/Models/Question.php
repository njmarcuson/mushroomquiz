<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Question extends Model
{
    use HasFactory;

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function mushrooms(): BelongsToMany
    {
        return $this->belongsToMany(Mushroom::class, 'question_mushrooms');
    }

    public function answeredMushroom(): HasOne
    {
        return $this->hasOne(Mushroom::class, 'answered_mushroom_id');
    }

    public static function generateQuestions(Quiz $quiz): string
    {
        $edibilities = $quiz->edibilities->pluck('id');
        $locations = $quiz->locations->pluck('id');
        $difficulty = $quiz->difficulty->name;

        $possibleCorrectMushrooms = Mushroom::with('edibility')
            ->whereIn('edibility_id', $edibilities)
            ->whereHas('locations', function($q) use($locations) {
            $q->whereIn('location_id', $locations);
        })->get();

        $correctMushrooms = $possibleCorrectMushrooms->random(10)->shuffle();
        $allMushrooms = Mushroom::with('edibility')->get();

        $questions = [];

        foreach ($correctMushrooms as $correctMushroom) {

            $mushroomPool = $allMushrooms->where('id', '!=', $correctMushroom->id);

            // incorrect mushrooms can be any mushroom
            if ($difficulty == "Easy") {
                $incorrectMushrooms = $mushroomPool->random(3);
            }

            // at least one incorrect mushroom must be the same edibility
            if ($difficulty == "Medium") {
                $incorrectMushrooms = $mushroomPool->random(2);
                $incorrectMushrooms->push($mushroomPool->
                    where('edibility_id', $correctMushroom->edibility_id)
                    ->random(1)->first());
            }

            // all incorrect mushrooms are the same edibility
            if ($difficulty == "Hard") {
                $incorrectMushrooms = $mushroomPool->
                    where('edibility_id', $correctMushroom->edibility_id)
                    ->random(3);
            }

            $mushroomsInQuestion = collect($incorrectMushrooms);
            $mushroomsInQuestion->push($correctMushroom);

            $question = [];

            foreach ($mushroomsInQuestion as $mushroomInQuestion) {
                $mushroomArray = [
                    'id' => $mushroomInQuestion->id,
                    'scientific_name' => $mushroomInQuestion->scientific_name,
                    'popular_name1' => $mushroomInQuestion->popular_name1,
                    'popular_name2' => $mushroomInQuestion->popular_name2,
                    'popular_name3' => $mushroomInQuestion->popular_name3,
                    'edibility' => $mushroomInQuestion->edibility->name,
                    'edibility_notes' => $mushroomInQuestion->edibility_notes,
                    'is_correct' => $mushroomInQuestion->id == $correctMushroom->id,
                ];
                
                array_push($question, $mushroomArray);
            }

            shuffle($question);

            array_push($questions, $question);
        }
        
        return json_encode($questions);

    }
}