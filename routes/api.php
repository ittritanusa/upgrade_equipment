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
        Route::get('/', 'App\Http\Controllers\Api\TipeKendaraanController@index')->name('tipe-kendaraan');
        Route::get('/{id}', 'App\Http\Controllers\Api\TipeKendaraanController@show')->name('tipe-kendaraan.detail');
        Route::post('/create/save', 'App\Http\Controllers\Api\TipeKendaraanController@store')->name('tipe-kendaraan.store');
        Route::post('/edit/save/{id}', 'App\Http\Controllers\Api\TipeKendaraanController@update')->name('tipe-kendaraan.update');
        Route::delete('/delete/save/{id}', 'App\Http\Controllers\Api\TipeKendaraanController@destroy')->name('tipe-kendaraan.delete');
    });
    
    Route::prefix('merk-kendaraan')->group(function(){
        Route::get('/', 'App\Http\Controllers\Api\MerkKendaraanController@index')->name('merk-kendaraan');
        Route::get('/{id}', 'App\Http\Controllers\Api\MerkKendaraanController@show')->name('merk-kendaraan.detail');
        Route::post('/create/save', 'App\Http\Controllers\Api\MerkKendaraanController@store')->name('merk-kendaraan.store');
        Route::post('/edit/save/{id}', 'App\Http\Controllers\Api\MerkKendaraanController@update')->name('merk-kendaraan.update');
        Route::delete('/delete/save/{id}', 'App\Http\Controllers\Api\MerkKendaraanController@destroy')->name('merk-kendaraan.delete');
    });
    
    Route::prefix('tire-type')->group(function(){
        Route::get('/', 'App\Http\Controllers\Api\TireTypeKendaraanController@index')->name('tire-type');
        Route::get('/{id}', 'App\Http\Controllers\Api\TireTypeKendaraanController@show')->name('tire-type.detail');
        Route::post('/create/save', 'App\Http\Controllers\Api\TireTypeKendaraanController@store')->name('tire-type.store');
        Route::post('/edit/save/{id}', 'App\Http\Controllers\Api\TireTypeKendaraanController@update')->name('tire-type.update');
        Route::delete('/delete/save/{id}', 'App\Http\Controllers\Api\TireTypeKendaraanController@destroy')->name('tire-type.delete');
    });
    
    Route::prefix('kendaraan')->group(function(){
        Route::get('/', 'App\Http\Controllers\Api\KendaraanController@index')->name('kendaraan');
        Route::get('/{id}', 'App\Http\Controllers\Api\KendaraanController@show')->name('kendaraan.detail');
        Route::post('/create/save', 'App\Http\Controllers\Api\KendaraanController@store')->name('kendaraan.store');
        Route::post('/edit/save/{id}', 'App\Http\Controllers\Api\KendaraanController@update')->name('kendaraan.update');
        Route::delete('/delete/save/{id}', 'App\Http\Controllers\Api\KendaraanController@destroy')->name('kendaraan.delete');
    });

    Route::prefix('unit-bisnis')->group(function(){
        Route::get('/', 'App\Http\Controllers\Api\UnitBisnisController@index')->name('unit-bisnis');
        Route::get('/{id}', 'App\Http\Controllers\Api\UnitBisnisController@show')->name('unit-bisnis.detail');
        Route::post('/create/save', 'App\Http\Controllers\Api\UnitBisnisController@store')->name('unit-bisnis.store');
        Route::post('/edit/save/{id}', 'App\Http\Controllers\Api\UnitBisnisController@update')->name('unit-bisnis.update');
        Route::delete('/delete/save/{id}', 'App\Http\Controllers\Api\UnitBisnisController@destroy')->name('unit-bisnis.delete');
    });

    Route::prefix('area-unit')->group(function(){
        Route::get('/', 'App\Http\Controllers\Api\AreaUnitController@index')->name('area-unit');
        Route::get('/{id}', 'App\Http\Controllers\Api\AreaUnitController@show')->name('area-unit.detail');
        Route::post('/create/save', 'App\Http\Controllers\Api\AreaUnitController@store')->name('area-unit.store');
        Route::post('/edit/save/{id}', 'App\Http\Controllers\Api\AreaUnitController@update')->name('area-unit.update');
        Route::delete('/delete/save/{id}', 'App\Http\Controllers\Api\AreaUnitController@destroy')->name('area-unit.delete');
    });
});