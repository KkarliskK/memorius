<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_inventory', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('shop_id')->constrained()->onDelete('cascade');
            $table->string('stock');
            $table->timestamps();
        });

        DB::table('user_inventory')->insert([
            [
                'user_id' => '1',
                'shop_id' => '1',
                'stock' => '9',
            ],
            [
                'user_id' => '1',
                'shop_id' => '2',
                'stock' => '500',
            ],
            [
                'user_id' => '1',
                'shop_id' => '3',
                'stock' => '4',
            ],
            [
                'user_id' => '1',
                'shop_id' => '4',
                'stock' => '1',
            ],
            [
                'user_id' => '1',
                'shop_id' => '5',
                'stock' => '1',
            ]
            // Add more user accounts as needed...
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_inventory');
    }
};
