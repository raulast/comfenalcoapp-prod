<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LicenciaController extends Controller
{
    //
    public function inicio(){
        return view('licencias.licencia');
    }
}
