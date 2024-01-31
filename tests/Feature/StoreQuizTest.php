<?php

namespace Tests\Feature;

use App\Models\Difficulty;
use App\Models\Edibility;
use App\Models\Location;
use App\Models\Quiz;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Tests\TestCase;

use function PHPUnit\Framework\assertGreaterThan;
use function PHPUnit\Framework\assertIsString;

class StoreQuizTest extends TestCase
{    

    public $createdQuizSlugs = [];
    public $mininumQuestionsPerQuiz = 3;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware(
            ThrottleRequests::class
        ); // prevents 429 error
    }
    
    /**
     * Tests storing quiz combinations of all parameter combos
     * with only one edibility and location per combo
     */
    public function test_store_quiz_and_get_questions(): void
    {
        foreach (Difficulty::all() as $difficulty) {
            foreach (Edibility::all() as $edibility) {
                foreach (Location::all() as $location) {
                    // getting the quiz
                    $response = $this->post("/api/storequiz?locations={$location->id}&edibilities={$edibility->id}&difficulty={$difficulty->id}");
                    $response->assertStatus(200);
                    $slug = json_decode($response->baseResponse->original);
                    assertIsString($slug);
                    array_push($this->createdQuizSlugs, $slug);

                    // getting the questions
                    $response = $this->post("/api/getquestions?quizSlug={$slug}");
                    $quiz = json_decode($response->baseResponse->original);
                    $questionCount = count($quiz);

                    if ($questionCount <= $this->mininumQuestionsPerQuiz) {
                        echo $location->name . " " . $edibility->name . " " . $difficulty->name . "\n";
                    }

                    assertGreaterThan($this->mininumQuestionsPerQuiz, $questionCount);
                    $response->assertStatus(200);
                }
            }
        }
    }

    public function test_invalid_requests(): void 
    {
        $links = [
            "/api/storequiz?locations=1&edibilities=1",
            "/api/storequiz?locations=1&difficulty=1",
            "/api/storequiz?difficulty=1&edibilities=1",
            "/api/storequiz?locations=0&edibilities=1&difficulty=1",
            "/api/storequiz?locations=1&edibilities=0&difficulty=1",
            "/api/storequiz?locations=1&edibilities=1&difficulty=0",
            "/api/getquestions?quizSlug=asdf",
            "/api/getquestions",
        ];

        foreach ($links as $link) {
            $response = $this->post($link);
            $response->assertStatus(422);
        }
    }

    public function tearDown(): void 
    {
        foreach ($this->createdQuizSlugs as $slug) {
            $quiz = Quiz::where('slug', $slug)->first();
            $quiz->deleteWithConstraints();
        }
        parent::tearDown();
    }
}