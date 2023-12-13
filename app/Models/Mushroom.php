<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mushroom extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function locations(): BelongsToMany
    {
        return $this->belongsToMany(Location::class, 'mushroom_locations');
    }

    public function edibility(): BelongsTo
    {
        return $this->belongsTo(Edibility::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(MushroomImage::class);
    }
}