<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MushroomImage extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function mushroom(): BelongsTo
    {
        return $this->belongsTo(Mushroom::class);
    }
}