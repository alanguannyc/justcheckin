<?php

namespace App\Http\Controllers;

use App\Attendee;
use App\Event;
use Illuminate\Http\Request;

class CheckInController extends Controller
{
    public function attendees($eventID)
    {
        
        return Event::with(['attendees'])->find($eventID);
    }
}
