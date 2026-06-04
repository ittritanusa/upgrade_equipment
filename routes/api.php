<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('web')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('unit-kendaraan')->group(function(){
        Route::get('/', 'App\Http\Controllers\Api\UnitKendaraanController@index')->name('unit-kendaraan');
        Route::get('/{id}', 'App\Http\Controllers\Api\UnitKendaraanController@show')->name('unit-kendaraan.detail');
        Route::post('/create/save', 'App\Http\Controllers\Api\UnitKendaraanController@store')->name('unit-kendaraan.store');
        Route::post('/edit/save/{id}', 'App\Http\Controllers\Api\UnitKendaraanController@update')->name('unit-kendaraan.update');
        Route::delete('/delete/save/{id}', 'App\Http\Controllers\Api\UnitKendaraanController@destroy')->name('unit-kendaraan.delete');
    });
});