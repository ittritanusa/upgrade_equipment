<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitBisnisModel extends Model
{
    use HasFactory;

    protected $table = 'm_unit_bisnis';
    protected $guarded = ['id'];
}