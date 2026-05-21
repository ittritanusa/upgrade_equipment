<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $developer = User::firstOrCreate(
            ['email' => 'developer@mail.com'],
            [
                'name' => 'Developer',
                'password' => Hash::make('password'),
            ]
        );

        $developer->assignRole('developer');
    }
}
