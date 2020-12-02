<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Notifications\TwoFactorCode;
use App\Notifications\CuentaBloqueada;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\LoginFail;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->middleware('guest')->except('logout');
        if($request->method()=='POST'){
            $this->authenticate($request);
        }
    }

    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        $user->generateTwoFactorCode();
        $user->notify(new TwoFactorCode());
    }

    public function authenticate(Request $request)
    {
        $email = $request->input('email');
        $user = User::where('email', $email)->first();
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
                    if($LoginFail->intentos >= 7 ){
                        $restantes = 10 - $LoginFail->intentos;
                        $message = ($restantes==1)?"intento, por favor\n
                         restablesca su contraseña o su cuenta sera bloqueada\n
                         en el sigiente intento fallido" : "intento";
                         if($restantes > 0){
                            return back()->withInput()->withErrors(['email'=>"Aun tiene $restantes $message"]);
                         }else{
                            $user->notify(new CuentaBloqueada());
                            return back()->withInput()->withErrors(['email'=>"
                            Esta cuenta ha sido bloqueada.
                            \nDebido a muchos intentos fallidos de inicio de sesión.
                            \nComuniquese con el administrador para desbloquear su cuenta."]);
                         }
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
}
