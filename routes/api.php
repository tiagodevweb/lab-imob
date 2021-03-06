<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('properties', 'Api\PropertyController@index')->name('api.properties.index');
Route::post('properties', 'Api\PropertyController@store')->name('api.properties.store');
Route::delete('properties/{property}', 'Api\PropertyController@delete')->name('api.properties.delete');
Route::post('contracts', 'Api\ContractController@store')->name('api.contracts.store');
