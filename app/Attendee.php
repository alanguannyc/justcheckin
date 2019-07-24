<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendee extends Model
{
    protected $guarded = [];
    
    public function event()
    {
        return $this->belongsTo('App\Event');
    }
}
