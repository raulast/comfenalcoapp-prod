<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
    public function index(){
        return view('auth.twoFactor');
    }
    public function inicio(){
        return 'inicio';
    }
    public function menu(){
        return view('menu');
    }
    public function pemel(){
        return view('pemel');
    }
}
