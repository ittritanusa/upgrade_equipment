<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriSparepartModel extends Model
{
    use HasFactory;

    protected $table = 'm_maintenance_sparepart_categories';
    protected $guarded = ['id'];
}