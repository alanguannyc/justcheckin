<?php

namespace App\Http\Controllers;

use App\Attendee;
use Illuminate\Http\Request;

class AttendeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $attendees = \App\Event::all();
        return $attendees;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attendee = new Attendee(request(['firstName','lastName','company','title','phone','note','event_id', 'email','checkin','checkedin_at']));

        $attendee->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Attendee  $attendee
     * @return \Illuminate\Http\Response
     */
    public function show(Attendee $attendee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Attendee  $attendee
     * @return \Illuminate\Http\Response
     */
    public function edit(Attendee $attendee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Attendee  $attendee
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $attendee = Attendee::findOrFail($id);
        $attendee->update($request->all());
        return $attendee;
    }

   


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Attendee  $attendee
     * @return \Illuminate\Http\Response
     */
    public function destroy(Attendee $attendee, $id)
    {
        \App\Attendee::destroy($id);

    }
}
