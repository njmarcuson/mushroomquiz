<?php

namespace Tests\Unit;

use App\Models\Difficulty;
use App\Models\Edibility;
use App\Models\Location;
use Tests\TestCase;

use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertEqualsCanonicalizing;

class QuizParametersDatabaseTest extends TestCase
{
    /**
     * Testing whether the correct locations are in the database
     */
    public function test_locations_exist(): void
    {
        $locations = Location::all();
        $locationNames = [];
        foreach ($locations as $location) {
            array_push($locationNames, $location->name);
        }

        $expected = [
            'North America',
            'South America',
            'Africa',
            'Europe',
            'Asia',
            'Oceania',
        ];

        sort($expected);
        sort($locationNames);

        assertEquals($expected, $locationNames);
    }

    /**
     * Testing whether the correct edibilities are in the database
     */
    public function test_edibilities_exist(): void
    {
        $locations = Edibility::all();
        $locationNames = [];
        foreach ($locations as $location) {
            array_push($locationNames, $location->name);
        }

        $expected = [
            'Psychedelic',
            'Edible',
            'Inedible',
            'Poisonous',
        ];

        sort($expected);
        sort($locationNames);

        assertEquals($expected, $locationNames);
    }

    /**
     * Testing whether the correct edibilities are in the database
     */
    public function test_difficulties_exist(): void
    {
        $locations = Difficulty::all();
        $locationNames = [];
        foreach ($locations as $location) {
            array_push($locationNames, $location->name);
        }

        $expected = [
            'Easy',
            'Medium',
            'Hard',
        ];

        sort($expected);
        sort($locationNames);

        assertEquals($expected, $locationNames);
    }
}