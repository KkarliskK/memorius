<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('mobile')->unique();
            $table->string('bio')->nullable();
            $table->string('tag')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('pfp')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });


        //adding values in the table
        DB::table('users')->insert([
            'name' => 'admin',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'mobile' => '12345678',
            'bio' => 'I am admin.. I see everything! Also, try to beat me!',
            'tag' => 'Speedrunner',
            'password' => Hash::make('password'),
            'pfp' => 'https://pbs.twimg.com/media/F9PJtQdbwAAyIf7?format=jpg&name=large',
            // Add other fields as necessary...
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
