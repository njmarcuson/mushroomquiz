<?php

namespace Tests\Unit;

use App\Models\Mushroom;
use Tests\TestCase;

use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertGreaterThan;
use function PHPUnit\Framework\assertNotNull;

class MushroomInfoTest extends TestCase
{
    /**
     * Testing each mushroom has at least one location
     */
    public function test_mushrooms_have_locations(): void
    {
        $mushrooms = Mushroom::with('locations')->get();
        foreach ($mushrooms as $mushroom) {
            assertGreaterThan(0, count($mushroom->locations));
        }
    }

    /**
     * Testing each mushroom has an edibility
     */
    public function test_mushrooms_have_edibility(): void
    {
        $mushrooms = Mushroom::with('edibility')->get();
        foreach ($mushrooms as $mushroom) {
            assertNotNull($mushroom->edibility);
        }
    }

}