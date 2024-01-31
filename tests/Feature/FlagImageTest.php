<?php

namespace Tests\Feature;

use App\Models\ImageFlag;
use App\Models\MushroomImage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Routing\Middleware\ThrottleRequests;

use function PHPUnit\Framework\assertEquals;

class FlagImageTest extends TestCase
{

    public $imageId = "1374106";

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware(
            ThrottleRequests::class
        ); // prevents 429 error
    }


    public function test_flag_image(): void
    {
        $response = $this->post("/api/flagimage?image_id={$this->imageId}");
        $response->assertStatus(200);
    }

    public function test_increment_image_flags(): void
    {
        $increment = 5;
        for ($i=0; $i<$increment; $i++) {
            $response = $this->post("/api/flagimage?image_id={$this->imageId}");
            $response->assertStatus(200);
        }

        $mushroomImage = MushroomImage::where('image_id', $this->imageId)->first();
        $imageFlag = ImageFlag::where('mushroom_image_id', $mushroomImage->id)->first();

        assertEquals($increment, $imageFlag->num_flags);
    }

    public function tearDown(): void 
    {
        $mushroomImage = MushroomImage::where('image_id', $this->imageId)->first();
        $imageFlag = ImageFlag::where('mushroom_image_id', $mushroomImage->id)->first();
        $imageFlag->delete();
    }
}