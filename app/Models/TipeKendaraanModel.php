<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipeKendaraanModel extends Model
{
    use HasFactory;

    protected $table = 'm_type_kendaraan';
    protected $guarded = ['id'];

    public function unitKendaraan()
    { 
        return $this->belongsTo(UnitKendaraanModel::class, 'KodeUnit', 'Kode');
    }
}