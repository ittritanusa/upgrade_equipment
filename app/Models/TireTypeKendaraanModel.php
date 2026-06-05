<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TireTypeKendaraanModel extends Model
{
    use HasFactory;

    protected $table = 'm_tire_type_kendaraan';
    protected $guarded = ['id'];

    public function tipeKendaraan()
    { 
        return $this->belongsTo(TipeKendaraanModel::class, 'KodeType', 'KodeType');
    }
}