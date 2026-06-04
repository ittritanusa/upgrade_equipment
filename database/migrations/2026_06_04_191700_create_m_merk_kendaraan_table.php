<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_merk_kendaraan', function (Blueprint $table) {
            $table->id();
            $table->string('KodeMerk', 50)->unique();
            $table->string('Merk', 255);
            $table->unsignedTinyInteger('Status')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_merk_kendaraan');
    }
};
