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

    Route::prefix('tipe-kendaraan')->group(function(){
        Route::get('/', 'App\Http\Controllers\Api\TipeKendaraanController@index')->name('unit-kendaraan');
        Route::get('/{id}', 'App\Http\Controllers\Api\TipeKendaraanController@show')->name('unit-kendaraan.detail');
        Route::post('/create/save', 'App\Http\Controllers\Api\TipeKendaraanController@store')->name('unit-kendaraan.store');
        Route::post('/edit/save/{id}', 'App\Http\Controllers\Api\TipeKendaraanController@update')->name('unit-kendaraan.update');
        Route::delete('/delete/save/{id}', 'App\Http\Controllers\Api\TipeKendaraanController@destroy')->name('unit-kendaraan.delete');
    });
    
    Route::prefix('merk-kendaraan')->group(function(){
        Route::get('/', 'App\Http\Controllers\Api\MerkKendaraanController@index')->name('unit-kendaraan');
        Route::get('/{id}', 'App\Http\Controllers\Api\MerkKendaraanController@show')->name('unit-kendaraan.detail');
        Route::post('/create/save', 'App\Http\Controllers\Api\MerkKendaraanController@store')->name('unit-kendaraan.store');
        Route::post('/edit/save/{id}', 'App\Http\Controllers\Api\MerkKendaraanController@update')->name('unit-kendaraan.update');
        Route::delete('/delete/save/{id}', 'App\Http\Controllers\Api\MerkKendaraanController@destroy')->name('unit-kendaraan.delete');
    });
});