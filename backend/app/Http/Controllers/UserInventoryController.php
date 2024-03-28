<?php

namespace App\Http\Controllers;

use App\Models\UserInventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\DB;

class UserInventoryController extends Controller
{

    public function getUserPerks($userId)
    {
        $userPerks = UserInventory::where('user_id', $userId)
                                ->whereIn('shop_id', [1, 2, 3])
                                ->get(['stock']);

        return response()->json($userPerks);
    }


}