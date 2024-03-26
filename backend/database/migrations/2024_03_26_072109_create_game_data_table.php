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
        Schema::create('game_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('level');
            $table->string('score');
            $table->string('moves');
            $table->string('time');
            $table->timestamps();
        });

        DB::table('game_data')->insert([
            [
                'user_id' => '1',
                'level' => '5',
                'score' => '2284',
                'moves' => '25',
                'time' => '38',
            ]
            // Add more user accounts as needed...
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_data');
    }
};
