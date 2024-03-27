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
        $gameData->user_id = $id;
        $gameData->level = $request->level;
        $gameData->time = $request->time;
        $gameData->score = $request->score;
        $gameData->total_score = $request->total_score;
        $gameData->moves = $request->moves;
        $gameData->save();

        return response()->json(['message' => 'Game data updated successfully'], 200);
    }

    public function getHighestStats($userId)
    {
        $highestStats = DB::table('game_data')
            ->select(DB::raw('MAX(total_score) AS highest_total_score'), DB::raw('MAX(level) AS highest_level'))
            ->where('user_id', $userId)
            ->first();

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
    

}