<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterKendaraanSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('m_unit_kendaraan')->upsert([
            [
                'Kode' => 'LOG',
                'Unit' => 'Logistik',
                'Status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'Kode' => 'TAM',
                'Unit' => 'Tambang',
                'Status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ], ['Kode'], ['Unit', 'Status', 'updated_at']);

        DB::table('m_type_kendaraan')->upsert([
            [
                'KodeUnit' => 'LOG',
                'KodeType' => 'CDD',
                'Type' => 'Colt Diesel Double',
                'Status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'KodeUnit' => 'TAM',
                'KodeType' => 'DT',
                'Type' => 'Dump Truck',
                'Status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ], ['KodeType'], ['KodeUnit', 'Type', 'Status', 'updated_at']);

        DB::table('m_merk_kendaraan')->upsert([
            [
                'KodeMerk' => 'HINO',
                'Merk' => 'Hino',
                'Status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'KodeMerk' => 'MITS',
                'Merk' => 'Mitsubishi',
                'Status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ], ['KodeMerk'], ['Merk', 'Status', 'updated_at']);
    }
}
