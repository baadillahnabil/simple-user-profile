<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'AuthController@login')->name('login');
Route::post('register', 'AuthController@register')->name('register');

Route::middleware('auth:api')->group(function () {
    Route::get('me', 'UsersController@me');
    Route::put('users/{id}', 'UsersController@update');

    Route::post('logout', 'AuthController@logout')->name('logout');
});
