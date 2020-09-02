<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Notifications\TwoFactorCode;
use Illuminate\Http\Request;

class TwoFactorController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'twofactor']);
    }

    public function index() 
    {
        return view('auth.twoFactor');
    }

    public function store(Request $request)
    {
        $request->validate([
            'two_factor_code' => 'integer|required',
        ]);

        $user = auth()->user();

        if($request->input('two_factor_code') == $user->two_factor_code)
        {
            $user->resetTwoFactorCode();
            if (auth()->user()->tipo == 1){
                return redirect()->route('menu');
            }
            if (auth()->user()->tipo == 2){
                return redirect()->route('pemel');
            }
            if (auth()->user()->tipo == 0){
                return "Panel de admin";
            }
        }

        return redirect()->back()->withErrors(['two_factor_code' => 'El código ingresado no es correcto']);
    }

    public function resend()
    {
        $user = auth()->user();
        $user->generateTwoFactorCode();
        $user->notify(new TwoFactorCode());

        return redirect()->back()->withMessage('El código ha sido enviado de nuevo');
    }
}
