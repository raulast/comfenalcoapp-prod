<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

class AdminController extends Controller
{
    //
    public function index(){
        $tipo = auth()->user()->tipo;
        return view('admin.admin',[
            'tipo' => $tipo
        ]);
    }
    public function users(){
        return view('admin.users');
    }
    public function incapacidades(){
        return view('admin.incapacidades');
    }
}
