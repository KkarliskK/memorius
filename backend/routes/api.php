<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameDataController;
use App\Http\Controllers\UserInventoryController;
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


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/status', [AuthController::class, 'status']);
Route::get('/user/{username}', [AuthController::class, 'select']);
Route::put('/profile/update/{id}', [AuthController::class, 'update']);

// Password Reset Routes
Route::post('/password/email', [AuthController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('/password/reset', [AuthController::class, 'reset'])->name('password.reset');

//game back-end routes
Route::post('/level/completed/{id}', [GameDataController::class, 'insert']);
Route::get('/stats/{id}', [GameDataController::class, 'getHighestStats']);
Route::get('/user/{id}/perks', [UserInventoryController::class, 'getUserPerks']);
Route::get('/leaderboard', [GameDataController::class, 'getLeaderboard']);
Route::get('/games/{id}', [GameDataController::class, 'getLastGames']);

