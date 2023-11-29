<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Question extends Model
{
    use HasFactory;

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function mushrooms(): BelongsToMany
    {
        return $this->belongsToMany(Mushroom::class, 'question_mushrooms');
    }

    public function answeredMushroom(): HasOne
    {
        return $this->hasOne(Mushroom::class, 'answered_mushroom_id');
    }
}