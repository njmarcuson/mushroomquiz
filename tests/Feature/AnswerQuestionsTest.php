<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Routing\Middleware\ThrottleRequests;

use function PHPUnit\Framework\assertEquals;

class AnswerQuestionsTest extends TestCase
{

    public $createdQuizSlugs = [];

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware(
            ThrottleRequests::class
        ); // prevents 429 error
    }


    /**
     * Answers all questions for a few cases
     */
    public function test_answer_questions(): void
    {
        $testCases = [
            "/api/storequiz?locations=1&edibilities=1&difficulty=1",
            "/api/storequiz?locations=1,3&edibilities=2,4&difficulty=3",
            "/api/storequiz?locations=1,2,3&edibilities=1,2,4&difficulty=2",
        ];

        foreach ($testCases as $testCase) {
            $response = $this->post($testCase);
            $response->assertStatus(200);
            $slug = json_decode($response->baseResponse->original);
            array_push($this->createdQuizSlugs, $slug);

            $response = $this->post("/api/getquestions?quizSlug={$slug}");
            $quiz = json_decode($response->baseResponse->original, true);

            foreach ($quiz as $i => $question) {
                $answerIndex = rand(0, 3);
                $mushroomId = $question['mushrooms'][$answerIndex]['id'];

                // make sure the call works
                $this->post("api/answerquestion?quizSlug={$slug}&quizQuestion={$i}&answer={$mushroomId}");
                $response->assertStatus(200);

                // make sure the database is updated correctly
                $quiz = Quiz::where('slug', $slug)->first();
                $question = Question::where('quiz_id', $quiz->id)->where('question_number', $i)->first();
                assertEquals($mushroomId, $question->answered_mushroom_id);
            }
        }
    }

    public function test_invalid_quiz_slug(): void
    {
        $links = [
            "api/answerquestion?quizSlug=asdf"
        ];

        foreach ($links as $link) {
            $response = $this->post($link);
            $response->assertStatus(422);
        }
    }

    public function test_invalid_mushroom_answer(): void
    {
        $response = $this->post("/api/storequiz?locations=1,3&edibilities=2,4&difficulty=3");
        $response->assertStatus(200);
        $slug = json_decode($response->baseResponse->original);
        array_push($this->createdQuizSlugs, $slug);

        $response = $this->post("/api/getquestions?quizSlug={$slug}");
        
        $response = $this->post("api/answerquestion?quizSlug={$slug}&quizQuestion=1&answer=0");
        $response->assertStatus(422);
    }

    public function test_invalid_question_answer(): void
    {
        $response = $this->post("/api/storequiz?locations=1,3&edibilities=2,4&difficulty=3");
        $response->assertStatus(200);
        $slug = json_decode($response->baseResponse->original);
        array_push($this->createdQuizSlugs, $slug);

        $response = $this->post("/api/getquestions?quizSlug={$slug}");
        
        $response = $this->post("api/answerquestion?quizSlug={$slug}&quizQuestion=0&answer=0");
        $response->assertStatus(422);
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