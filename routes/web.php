<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\MushroomImageController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuizStatsController;
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

Route::get('/admin', [LoginController::class, 'show']);
Route::post('/is-logged-in', [LoginController::class, 'index']);
Route::post('/admin/login', [LoginController::class, 'store']);

Route::get('/getstats', [QuizStatsController::class, 'get'])->middleware('auth');;