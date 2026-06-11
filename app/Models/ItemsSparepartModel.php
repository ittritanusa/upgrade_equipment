<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemsSparepartModel extends Model
{
    use HasFactory;

    protected $table = 'm_maintenance_spareparts';
    protected $guarded = ['id'];
    
    public function categori()
    { 
        return $this->belongsTo(CategoriSparepartModel::class, 'category_id', 'id');
    }
}