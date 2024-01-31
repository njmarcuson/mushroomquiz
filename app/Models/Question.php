<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Question extends Model
{
    use HasFactory;

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function mushroom1(): HasOne
    {
        return $this->hasOne(Mushroom::class, 'option1_mushroom_id');
    }

    public function mushroom2(): HasOne
    {
        return $this->hasOne(Mushroom::class, 'option2_mushroom_id');
    }

    public function mushroom3(): HasOne
    {
        return $this->hasOne(Mushroom::class, 'option3_mushroom_id');
    }

    public function mushroom4(): HasOne
    {
        return $this->hasOne(Mushroom::class, 'option4_mushroom_id');
    }

    public function answeredMushroom(): HasOne
    {
        return $this->hasOne(Mushroom::class, 'answered_mushroom_id');
    }

    public function isAnswerPossible($answerId) {
        return in_array($answerId, [
            $this->option1_mushroom_id,
            $this->option2_mushroom_id,
            $this->option3_mushroom_id,
            $this->option4_mushroom_id,
        ]);
    }

}