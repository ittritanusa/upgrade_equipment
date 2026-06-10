<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KodePosModel extends Model
{
    use HasFactory;

    protected $table = 'm_kodepos';
    protected $guarded = ['id'];
}