<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AreaUnitModel extends Model
{
    use HasFactory;

    protected $table = 'm_area_unit';
    protected $guarded = ['id'];

    public function unitBisnis()
    { 
        return $this->belongsTo(UnitBisnisModel::class, 'UnitBisnis', 'KodeUnitBisnis');
    }
}