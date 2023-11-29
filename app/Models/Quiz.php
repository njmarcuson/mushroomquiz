<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    use HasFactory;

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function edibilities(): BelongsToMany
    {
        return $this->belongsToMany(Edibility::class, 'quiz_edibilities');
    }

    public function locations(): BelongsToMany
    {
        return $this->belongsToMany(Locations::class, 'quiz_locations');
    }
}