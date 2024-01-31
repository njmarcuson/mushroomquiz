<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function edibilities(): BelongsToMany
    {
        return $this->belongsToMany(Edibility::class, 'quiz_edibilities');
    }

    public function difficulty(): BelongsTo
    {
        return $this->belongsTo(Difficulty::class);
    }

    public function locations(): BelongsToMany
    {
        return $this->belongsToMany(Location::class, 'quiz_locations');
    }

    public function deleteWithConstraints(): Bool {
        QuizLocations::where('quiz_id', $this->id)->delete();
        QuizEdibilities::where('quiz_id', $this->id)->delete();
        Question::where('quiz_id', $this->id)->delete();
        return $this->delete();
    }
}