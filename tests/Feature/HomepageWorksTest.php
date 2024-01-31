<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class HomepageWorksTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_homepage_works(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}