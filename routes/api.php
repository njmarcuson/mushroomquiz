<?php

use App\Http\Controllers\ImageFlagController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MushroomImageController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuizStatsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/storequiz', [QuizController::class, 'store']);
Route::post('/storequiz', [QuizController::class, 'store']);
Route::get('/getquestions', [QuestionController::class, 'get']);
Route::post('/getquestions', [QuestionController::class, 'get']);
Route::get('/answerquestion', [QuestionController::class, 'update']);
Route::post('/answerquestion', [QuestionController::class, 'update']);

Route::get('/flagimage', [ImageFlagController::class, 'store']);
Route::post('/flagimage', [ImageFlagController::class, 'store']);

Route::get('/getstats', [QuizStatsController::class, 'get']);

//Route::get('/storequestions', [QuestionController::class, 'store']);