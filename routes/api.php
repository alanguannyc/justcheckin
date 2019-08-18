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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth']], function(){



});

Route::post('/login', 'LoginController@authenticate');

Route::get('/events', 'EventController@index');
Route::post('/events', 'EventController@store');
Route::get('/event/{id}', 'EventController@show');
Route::post('/event/{id}/edit', 'EventController@update');
Route::delete('/event/{id}', 'EventController@destroy');
Route::post('/event/{id}/bulk', 'EventController@bulk');
Route::delete('/event/{id}/bulk', 'EventController@removeAll');

Route::get('/attendees', 'AttendeeController@index');
Route::post('/attendees', 'AttendeeController@store');
Route::get('/attendee/{id}', 'AttendeeController@show');
Route::post('/attendee/{id}/edit', 'AttendeeController@update');
Route::delete('/attendee/{id}', 'AttendeeController@destroy');


Route::get('/event/{id}/checkin', 'CheckInController@attendees');
