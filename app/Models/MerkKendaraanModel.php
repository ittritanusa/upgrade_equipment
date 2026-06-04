<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MerkKendaraanModel extends Model
{
    use HasFactory;

    protected $table = 'm_merk_kendaraan';
    protected $guarded = ['id'];
}