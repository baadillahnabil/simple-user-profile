<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function me(Request $request)
    {
        return $request->user();
    }

    public function update($id, Request $request)
    {
        $user = User::findOrFail($id);

        if (empty($user)) {
            return response()->json([
                'success' => false,
                'message' => 'No user found'
            ], 403);
        }

        $request->validate([
            'name' => ['string', 'max:255'],
            'phone' => ['string', 'unique:users'],
            'password' => [
                'string',
                'min:8',
                'regex:/^(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z][a-zA-Z0-9]{7,}$/',
                'confirmed'
            ]
        ]);

        $user->name = $request->has('name') ? $request->name : $user->name;
        $user->phone = $request->has('phone') ? $request->phone : $user->phone;
        $user->password = $request->has('password') ? bcrypt($request->password) : $user->password;

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User Updated Successfully'
        ]);
    }
}
