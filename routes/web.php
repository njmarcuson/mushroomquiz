<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// only route that users will access
Route::get('/', [QuizController::class, 'index']);


Route::post('/api/getquestions', [QuestionController::class, 'store']);
Route::post('/api/storequiz', [QuizController::class, 'store']);

Route::get('/admin-login', [LoginController::class, 'show']);