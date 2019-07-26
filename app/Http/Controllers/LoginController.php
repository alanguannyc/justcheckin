<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $http = new \GuzzleHttp\Client;

        // $response = $http->post('/oauth/token', [
        //     'form_params' => [
        //         'grant_type' => 'password',
        //         'client_id' => '1',
        //         'client_secret' => '9UA0jqgjQktVY8UNqm7amgDUsWxeK7ACXZuJVAKE',
        //         'username' => $request['email'],
        //         'password' => $request['password'],
        //         'scope' => '',
        //     ],
        // ]);

        // \Log::info($response);

        // return json_decode((string) $response->getBody(), true);

       
        if (Auth::attempt($credentials)) {
            \Log::info(Auth::attempt($credentials));
            // Authentication passed...
            $user = $request->user();
            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->token;
            return response()->json([
                
                    'api_token' => $token,
                    'message' => 'Login successful', 
                    'status_code' => 200
                
            ]);
        }
        else {
            // return response()->json([
            //     'error' => [
            //         'message' => 'Login failed', 
            //         'status_code' => 20
            //     ]
            // ]);
            return response()->json([
                'error' => true,
                'msg' => 'Bad request'
            ], 403);
        }
    }
}
