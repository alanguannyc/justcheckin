<?php


Auth::routes();

Route::view('/{path?}', 'index')
     ->where('path','.*')
     ->name('react')
     ->middleware('auth');


Route::get('/home', 'HomeController@index')->name('home');
