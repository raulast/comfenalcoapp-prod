<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\LoginFail;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            return redirect(RouteServiceProvider::HOME);
        }

        if (($request->is('login'))&&($request->method()=='POST')) {
            $email = $request->input('email');
            $user = isset($email) ? User::where('email', $email)->first() : null;
            if($user){
                $LoginFail = LoginFail::where('user_id', $user->id)
                ->where('session', 'active')->first();
                if (!$LoginFail) {
                    $banned = LoginFail::where('user_id', $user->id)
                    ->where('session', 'banned')->first();
                    if ($banned) {
                        return back()->withInput()->withErrors(['email'=>"
                        Esta cuenta ha sido bloqueada.
                        \nDebido a muchos intentos fallidos de inicio de sesión.
                        \nComuniquese con el administrador para desbloquear su cuenta."]);
                    }
                }
            }

            $credentials = $request->only('email', 'password');
            if (Auth::attempt($credentials)) {
                // Authentication passed...
                $user = Auth::user();
                if ($LoginFail) {
                    $LoginFail->session = 'logged' ;
                    $LoginFail->update();
                }

                $user->generateTwoFactorCode();
                $user->notify(new TwoFactorCode());
            }else{
                if($user){
                    if ($LoginFail) {
                        $LoginFail->intentos = $LoginFail->intentos +1 ;
                        $LoginFail->session = ($LoginFail->intentos >= 10)?'banned':'active';
                        $LoginFail->update();
                        if ($LoginFail->session == 'banned') {
                            $user->notify(new CuentaBloqueada());
                            return back()->withInput()->withErrors(['email'=>"
                            Esta cuenta ha sido bloqueada.
                            \nDebido a muchos intentos fallidos de inicio de sesión.
                            \nComuniquese con el administrador para desbloquear su cuenta."]);
                        }
                    }else{
                        $LoginFail = new LoginFail;
                        $LoginFail->user_id = $user->id;
                        $LoginFail->intentos = 1 ;
                        $LoginFail->session = 'active' ;
                        $LoginFail->save();
                    }
                }
            }
        }



        return $next($request);
    }
}
