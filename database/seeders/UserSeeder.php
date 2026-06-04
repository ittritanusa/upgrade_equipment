<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $developer = User::updateOrCreate(
            ['username' => 'developer'],
            [
                'nama' => 'Developer Local',
                'password' => Hash::make('password'),
                'role' => 'Admin',
                'jabatan' => 'Staff',
                'unitbisnis' => 'TNP',
                'working_area' => 'HO',
                'level' => '1',
                'blokir' => 'N',
            ]
        );

        $developer->assignRole('developer');
    }
}
