<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MerkKendaraanController;
use App\Http\Controllers\Api\TipeKendaraanController;
use App\Http\Controllers\Api\TireTypeKendaraanController;
use App\Http\Controllers\Api\UnitKendaraanController;
use Illuminate\Support\Facades\Route;

Route::middleware('web')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::middleware('auth:web')->group(function () {
        Route::prefix('unit-kendaraan')->group(function () {
            Route::get('/', [UnitKendaraanController::class, 'index'])->name('unit-kendaraan');
            Route::get('/{id}', [UnitKendaraanController::class, 'show'])->name('unit-kendaraan.detail');
            Route::post('/create/save', [UnitKendaraanController::class, 'store'])->name('unit-kendaraan.store');
            Route::post('/edit/save/{id}', [UnitKendaraanController::class, 'update'])->name('unit-kendaraan.update');
            Route::delete('/delete/save/{id}', [UnitKendaraanController::class, 'destroy'])->name('unit-kendaraan.delete');
        });

        Route::prefix('tipe-kendaraan')->group(function () {
            Route::get('/', [TipeKendaraanController::class, 'index'])->name('tipe-kendaraan');
            Route::get('/{id}', [TipeKendaraanController::class, 'show'])->name('tipe-kendaraan.detail');
            Route::post('/create/save', [TipeKendaraanController::class, 'store'])->name('tipe-kendaraan.store');
            Route::post('/edit/save/{id}', [TipeKendaraanController::class, 'update'])->name('tipe-kendaraan.update');
            Route::delete('/delete/save/{id}', [TipeKendaraanController::class, 'destroy'])->name('tipe-kendaraan.delete');
        });

        Route::prefix('merk-kendaraan')->group(function () {
            Route::get('/', [MerkKendaraanController::class, 'index'])->name('merk-kendaraan');
            Route::get('/{id}', [MerkKendaraanController::class, 'show'])->name('merk-kendaraan.detail');
            Route::post('/create/save', [MerkKendaraanController::class, 'store'])->name('merk-kendaraan.store');
            Route::post('/edit/save/{id}', [MerkKendaraanController::class, 'update'])->name('merk-kendaraan.update');
            Route::delete('/delete/save/{id}', [MerkKendaraanController::class, 'destroy'])->name('merk-kendaraan.delete');
        });

        Route::prefix('tire-type')->group(function () {
            Route::get('/', [TireTypeKendaraanController::class, 'index'])->name('tire-type');
            Route::get('/{id}', [TireTypeKendaraanController::class, 'show'])->name('tire-type.detail');
            Route::post('/create/save', [TireTypeKendaraanController::class, 'store'])->name('tire-type.store');
            Route::post('/edit/save/{id}', [TireTypeKendaraanController::class, 'update'])->name('tire-type.update');
            Route::delete('/delete/save/{id}', [TireTypeKendaraanController::class, 'destroy'])->name('tire-type.delete');
        });
    });
});
