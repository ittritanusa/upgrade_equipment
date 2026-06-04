<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    use HasRoles;

    protected $table = 'm_user';

    protected $fillable = [
        'username',
        'nama',
        'password',
        'role',
        'jabatan',
        'unitbisnis',
        'working_area',
        'blokir',
        'id_erp'
    ];

    protected $hidden = [
        'password'
    ];
}
