<?php

namespace App\Http\Controllers;

use App\Models\Mushroom;
use App\Models\Question;
use App\Models\Quiz;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    // TODO
    // - if questions have already been made for the quiz, return those questions
    public function get(Request $request)
    {
        $this->validateQuizExists($request);

        $quiz = Quiz::where('slug', $request->quizSlug)->first();
        $edibilities = $quiz->edibilities->pluck('id');
        $locations = $quiz->locations->pluck('id');
        $difficulty = $quiz->difficulty->name;

        $possibleCorrectMushrooms = Mushroom::with('edibility', 'images')
            ->withCount('images')
            ->having('images_count', '>=', 4)
            ->whereIn('edibility_id', $edibilities)
            ->whereHas('locations', function($q) use($locations) {
                $q->whereIn('location_id', $locations);
            })
            ->get();

        $numberQuestions = count($possibleCorrectMushrooms) > 10 ? 
            10 : count($possibleCorrectMushrooms);

        $correctMushrooms = $possibleCorrectMushrooms
            ->random($numberQuestions)
            ->shuffle();

        $allMushrooms = Mushroom::with('edibility')->get();

        $questionsJson = [];

        foreach ($correctMushrooms as $correctMushroom) {

            $mushroomPool = $allMushrooms->where('id', '!=', $correctMushroom->id);

            // incorrect mushrooms can be any mushroom
            if ($difficulty == "Easy") {
                $incorrectMushrooms = $mushroomPool->random(3);
            }

            // at least one incorrect mushroom must be the same edibility
            elseif ($difficulty == "Medium") {
                $incorrectMushrooms = $mushroomPool->random(2);
                $incorrectMushrooms->push($mushroomPool->
                    where('edibility_id', $correctMushroom->edibility_id)
                    ->random(1)->first());
            }

            // all incorrect mushrooms are the same edibility
            elseif ($difficulty == "Hard") { 
                $incorrectMushrooms = $mushroomPool->
                    where('edibility_id', $correctMushroom->edibility_id)
                    ->random(3);
            }

            $mushroomsInQuestion = collect($incorrectMushrooms);
            $mushroomsInQuestion->push($correctMushroom);

            $question = [];

            $images = $correctMushroom['images'];
            $imageIds = [];
            for ($i=0; $i<4; $i++) {
                $randomIndex = rand(0, $images->count()-1);
                array_push($imageIds, $images[$randomIndex]->image_id);
                $images->splice($randomIndex, 1);
            }

            $question['image_ids'] = $imageIds;

            $mushroomsInQuestionsArray = [];
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

                array_push($mushroomsInQuestionsArray, $mushroomArray);
            }

            shuffle($mushroomsInQuestionsArray);
            $question['mushrooms'] = $mushroomsInQuestionsArray;

            array_push($questionsJson, $question);
        }
        
        $this->store($quiz->id, $questionsJson);
        return json_encode($questionsJson);
    }

    private function store($quizId, $questionsJson): void
    {

        $now = Carbon::now();

        $questions = [];
        for ($i=0; $i<count($questionsJson); $i++) {
            $mushrooms = $questionsJson[$i]['mushrooms'];

            $correctId = '';
            for ($j = 0; $j<=count($mushrooms); $j++) {
                if ($mushrooms[$j]['is_correct']) {
                    $correctId = $mushrooms[$j]['id'];
                    break;
                }
            }

            $question = [
                'quiz_id' => $quizId,
                'question_number' => $i,
                'option1_mushroom_id' => $mushrooms[0]['id'],
                'option2_mushroom_id' => $mushrooms[1]['id'],
                'option3_mushroom_id' => $mushrooms[2]['id'],
                'option4_mushroom_id' => $mushrooms[3]['id'],
                'correct_mushroom_id' => $correctId,
                'created_at' => $now,
                'updated_at' => $now,
            ];
            array_push($questions, $question); 
        }
        Question::insert($questions);
    }

    public function update(Request $request)
    {

        $this->validateQuizExists($request);

        $quiz = Quiz::with('questions')->where('slug', $request->input('quizSlug'))->first();
        $questions = $quiz->questions;
        $question = $questions->where('question_number', $request->input('quizQuestion'))->first();

        $answer = $request->input('answer');

        if (!$question->isAnswerPossible($answer) or
            !is_null($question->answered_mushroom_id)) {
            abort(422);
        }
        
        $question->answered_mushroom_id = $request->input('answer');
        return $question->save() ? "" : abort(500);
    }

    private function validateQuizExists($request) {
        $validator = Validator::make($request->all(), [
            'quizSlug' => ['required', 'exists:quizzes,slug'],
        ]);

        if ($validator->fails()) {
            abort(422);
        }
    }

}