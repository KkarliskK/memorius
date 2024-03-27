<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shop', function (Blueprint $table) {
            $table->id();
            $table->string('product')->nullable();
            $table->string('theme')->nullable();
            $table->string('cards')->nullable();
            $table->string('price');
            $table->timestamps();
        });

        DB::table('shop')->insert([
            [
                'product' => 'time_bomb',
                'theme' => '',
                'cards' => '',
                'price' => '500',
            ],
            [
                'product' => 'spy_eye',
                'theme' => '',
                'cards' => '',
                'price' => '500',
            ],
            [
                'product' => 'skipper',
                'theme' => '',
                'cards' => '',
                'price' => '10000',
            ],
            [
                'product' => '',
                'theme' => 'black_gradient',
                'cards' => '',
                'price' => '2500',
            ],
            [
                'product' => '',
                'theme' => '',
                'cards' => 'programming',
                'price' => '2500',
            ],
            [
                'product' => '',
                'theme' => '',
                'cards' => 'cars',
                'price' => '2500',
            ],
            [
                'product' => '',
                'theme' => '',
                'cards' => 'emojis',
                'price' => '2500',
            ],
            // Add more user accounts as needed...
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop');
    }
};
