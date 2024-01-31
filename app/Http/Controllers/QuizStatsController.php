<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Difficulty;
use App\Models\Edibility;
use App\Models\Location;

class QuizStatsController extends Controller
{
    public function get() {
        $quizzes = Quiz::with('questions')->get();
        
        $difficulties = Difficulty::with('quizzes')->get();
        $edibilities = Edibility::with('quizzes')->get();
        $locations = Location::with('quizzes')->get();
        
        $questionsCorrect = Question::whereColumn('correct_mushroom_id', 'answered_mushroom_id')->count();
        $totalQuestionsAnswered = Question::whereNotNull('answered_mushroom_id')->get()->count();

        $quizzesFinished = 0;
        foreach ($quizzes as $quiz) {
            $questionCount = $quiz->questions->count();
            $questionsAnswered = $quiz->questions
                            ->whereNotNull('answered_mushroom_id')
                            ->count();
            if ($questionCount == $questionsAnswered) {
                $quizzesFinished++;
            }
        }

        return json_encode([
            'quizzes_taken' => $quizzes->count(),
            'quizzes_finished' => $quizzesFinished,
            'quizzes_mobile' => $quizzes->where('is_mobile', 1)->count(),
            'questions_answered' => $totalQuestionsAnswered,
            'questions_correct' => $questionsCorrect,
            'quizzes_easy' => $difficulties->firstWhere('name', 'Easy')->quizzes->count(),
            'quizzes_medium' => $difficulties->firstWhere('name', 'Medium')->quizzes->count(),
            'quizzes_hard' => $difficulties->firstWhere('name', 'Hard')->quizzes->count(),
            'quizzes_edible' => $edibilities->firstWhere('name', 'Edible')->quizzes->count(),
            'quizzes_inedible' => $edibilities->firstWhere('name', 'Inedible')->quizzes->count(),
            'quizzes_poisonous' => $edibilities->firstWhere('name', 'Poisonous')->quizzes->count(),
            'quizzes_psychedelic' => $edibilities->firstWhere('name', 'Psychedelic')->quizzes->count(),
            'quizzes_north_america' => $locations->firstWhere('name', 'North America')->quizzes->count(),
            'quizzes_europe' => $locations->firstWhere('name', 'Europe')->quizzes->count(),
            'quizzes_africa' => $locations->firstWhere('name', 'Africa')->quizzes->count(),
            'quizzes_south_america' => $locations->firstWhere('name', 'South America')->quizzes->count(),
            'quizzes_oceania' => $locations->firstWhere('name', 'Oceania')->quizzes->count(),
            'quizzes_asia' => $locations->firstWhere('name', 'Asia')->quizzes->count(),
        ]);
    }
}