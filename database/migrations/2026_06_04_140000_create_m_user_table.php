<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('m_user', function (Blueprint $table) {
            $table->id();
            $table->enum('unitbisnis', ['TNP', 'DPS', 'TMS', 'TSBU'])->nullable();
            $table->string('working_area', 50)->nullable();
            $table->string('nama', 100)->nullable();
            $table->string('username', 100)->unique();
            $table->string('password', 100)->nullable();
            $table->enum('role', [
                'Admin',
                'Akunting',
                'Driver',
                'Equipment',
                'Gudang',
                'Monitoring',
                'Mekanik',
                'HRGA',
                'Pengawas Trucking',
                'Equipment Admin',
                'Operator',
                'Operator RS Cibitung',
                'Operator RS Legok',
            ])->nullable();
            $table->enum('jabatan', ['Direktur', 'Manager', 'Supervisor', 'Staff', 'Outsource'])->nullable();
            $table->enum('level', ['1', '2', '3', '4', '5']);
            $table->char('blokir', 1)->default('N')->nullable();
            $table->integer('jblokir')->default(0)->nullable();
            $table->dateTime('firstlogin')->nullable();
            $table->dateTime('lastlogin')->nullable();
            $table->string('ipaddress', 50)->nullable();
            $table->string('useradd', 50)->nullable();
            $table->string('useredit', 50)->nullable();
            $table->timestamp('dateadd')->nullable()->useCurrent();
            $table->timestamp('dateedit')->useCurrent()->useCurrentOnUpdate();
            $table->string('ttd', 225)->nullable();
            $table->string('no_rekening', 225)->nullable()->default('-');
            $table->integer('id_erp')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('m_user');
    }
};
