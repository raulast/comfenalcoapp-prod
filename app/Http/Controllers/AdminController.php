<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    //
    public function index(){
        return view('admin.admin');
    }
    public function users(){
        return view('admin.users');
    }
    public function incapacidades(){
        return view('admin.incapacidades');
    }
}