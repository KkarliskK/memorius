<?php

namespace App\Http\Controllers;

use App\Models\GameData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\DB;

class GameDataController extends Controller
{

    function insert(Request $request, GameData $gameData, $id)
    {
        // Get the user's previous high score
        $previousHighScore = DB::table('game_data')
            ->where('user_id', $id)
            ->max('high_score');

        // Check if the new score is greater than the previous high score
        if ($request->total_score > $previousHighScore) {
            $newHighScore = $request->total_score;
        } else {
            $newHighScore = $previousHighScore;
        }

        // Save the game data
        $gameData->user_id = $id;
        $gameData->level = $request->level;
        $gameData->score = $request->score;
        $gameData->total_score = $request->total_score;
        $gameData->high_score = $newHighScore;
        $gameData->moves = $request->moves;
        $gameData->time = $request->time;
        $gameData->save();

        return response()->json(['message' => 'Game data updated successfully'], 200);
    }


    public function getHighestStats($userId)
    {
        $highestScore = DB::table('game_data')
            ->where('user_id', $userId)
            ->max('high_score');

        $highestLevel = DB::table('game_data')
            ->where('user_id', $userId)
            ->max('level');

        $highestStats = [
            'highest_high_score' => $highestScore,
            'highest_level' => $highestLevel
        ];

        return response()->json($highestStats, 200);
    }


    public function getLastGames($userId)
    {
        $lastGames = GameData::where('user_id', $userId)
                            ->orderBy('created_at', 'desc')
                            ->limit(20)
                            ->get();
    
        return response()->json($lastGames, 200);
    }

    public function getLeaderboard()
    {
        $leaderboard = GameData::select('users.username', 'game_data.high_score')
                                ->join('users', 'users.id', '=', 'game_data.user_id')
                                ->whereIn('game_data.id', function($query) {
                                    $query->select(DB::raw('MAX(id)'))
                                        ->from('game_data')
                                        ->groupBy('user_id');
                                })
                                ->orderBy('game_data.high_score', 'desc')
                                ->get();
        
        return $leaderboard;
    }

    
    
    
    
    
    


    

}