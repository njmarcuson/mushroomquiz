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

    public static function generateQuestions(Quiz $quiz): array
    {
        $edibilities = $quiz->edibilities->pluck('id');
        $locations = $quiz->locations->pluck('id');
        $difficulty = $quiz->difficulty->name;

        $possibleCorrectMushrooms = Mushroom::whereIn('edibility_id', $edibilities)
            ->whereHas('locations', function($q) use($locations) {
            $q->whereIn('location_id', $locations);
        })->get();

        $correctMushrooms = $possibleCorrectMushrooms->random(10)->shuffle();

        $allMushrooms = Mushroom::all();

        // foreach correct mushroom, we need to get the incorrect mushrooms
        // this will vary by difficulty
        foreach ($correctMushrooms as $correctMushroom) {

            $mushroomPool = $allMushrooms->where('id', '!=', $correctMushroom->id);

            // incorrect mushrooms can be any mushroom
            if ($difficulty == "Easy") {
                $incorrectMushrooms = $mushroomPool->random(3);
            }

            // at least one incorrect mushroom must be the same edibility
            if ($difficulty == "Medium") {
                $incorrectMushroomSameEdibility = $mushroomPool->where('edibility_id', $correctMushroom->edibility_id)->random(1);
                $incorrectMushroomsAllPool =  $mushroomPool->random(2);
                $incorrectMushrooms = $incorrectMushroomSameEdibility->merge($incorrectMushroomsAllPool);
            }

            // all incorrect mushrooms are the same edibility
            if ($difficulty == "Hard") {
                $incorrectMushrooms = $mushroomPool->where('edibility_id', $correctMushroom->edibility_id)->random(3);
            }

            $incorrectMushrooms = $incorrectMushrooms->shuffle();

            echo $incorrectMushrooms . "<br><br>";

        }

        

        ddd('test');

    }
}