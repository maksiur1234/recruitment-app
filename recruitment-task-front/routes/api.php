<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CardController;

Route::group(['middleware' => 'cors'], function () {
    Route::get('/cards', [CardController::class, 'index']);
    Route::get('/cards/{id}', [CardController::class, 'show']);
    Route::post('/cards', [CardController::class, 'store']);
    Route::put('/cards/{id}', [CardController::class, 'update']);
    Route::delete('/cards/{id}', [CardController::class, 'destroy']);
});

Route::get('/user', function (Request $request) {
    return response()->json(['authenticated' => $request->user() !== null])
        ->header('Access-Control-Allow-Origin', 'http://localhost:8080');
});

