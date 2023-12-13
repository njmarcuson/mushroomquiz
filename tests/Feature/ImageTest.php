<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Mushroom;
use Exception;

class ImageTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_all_mushrooms_have_obvservations(): void
    {
        $mushrooms = Mushroom::all();

        foreach ($mushrooms as $mushroom) {
            echo $mushroom->id;
           // try {
                $scientificName = str_replace(' ', '%20', $mushroom->scientific_name);
                $response = $this->get("/api/getimages?scientific_name={$scientificName}");
                $response->assertStatus(200);
           // } catch (Exception $e) {
           //     echo "This mushroom does not have images: " . $mushroom->scientific_name . "\n";
          //  }
        }
        
    }
}