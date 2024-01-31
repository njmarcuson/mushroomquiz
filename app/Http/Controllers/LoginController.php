<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function show() {

        return view('admin-login', [
            'isLoggedIn' => Auth::check(),
            'token' => csrf_token(),
        ]);
    }

    public function index() {
        return json_encode(Auth::check());
    }

    public function store(Request $request) {

        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            return response()->json(['success' => 'success'], 200);
        }

        return response()->json(['error_message' => 'Credentials do not match database'], 401);
    }
}