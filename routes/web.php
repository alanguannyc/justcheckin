<?php


Auth::routes();

Route::view('/{path?}', 'index')
     ->where('path','.*')
     ->name('react');
     // ->middleware('auth','admin');



