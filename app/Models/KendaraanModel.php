<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KendaraanModel extends Model
{
    use HasFactory;

    protected $table = 'm_kendaraan';
    protected $guarded = ['id'];

    public function unitKendaraan()
    { 
        return $this->belongsTo(UnitKendaraanModel::class, 'TypeUnit', 'Kode');
    }

    public function merkKendaraan()
    { 
        return $this->belongsTo(MerkKendaraanModel::class, 'MerekTypeUnit', 'KodeMerk');
    }

    public function tipeKendaraan()
    { 
        return $this->belongsTo(TipeKendaraanModel::class, 'TypeKendaraan', 'KodeType');
    }
}