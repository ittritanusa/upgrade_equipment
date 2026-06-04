<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitKendaraanModel extends Model
{
    use HasFactory;

    protected $table = 'm_unit_kendaraan';
    protected $guarded = ['id'];
}