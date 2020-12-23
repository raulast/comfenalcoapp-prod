<?php

namespace App\Http\Middleware;

use Closure;
use App\Contrasenas;
use App\LoginFail;

class CheckActivity
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'editar/password',
        'usuario/editar/password',
        'home',
        'verify',
        'verify/resend'
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        foreach($this->except as $route) {
            if ($request->is($route)) {
              return $next($request);
            }
          }
        $user = auth()->user();
        if($user && ($user->updated_at == $user->created_at | date_diff($user->updated_at,now())->format("%a")> 0)){
            $get=Contrasenas::select('updated_at')
            ->orderBy('updated_at','desc')
            ->where('user_id',$user->id)->first();
            if ($get) {
                $update = $get->updated_at;
                $diff=date_diff($update,now());
                if($diff->format("%a")>45){
                    return redirect('editar/password')->with('info', '¡Vaya! hace más de 45 días no actualizas tu contraseña por favor cámbiala por una nueva para continuar');
                }
            }else{
                return redirect('editar/password')->with('info', '¡Bienvenido! vemos que conservas aun una contraseña asignada, por favor registra una de tu elección para continuar');
            }
            $banned = LoginFail::where('user_id', $user->id)
                        ->where('session', 'banned')->first();
            if ($banned) {
                auth()->logout();
                return redirect('login')->withInput(['email'=>$user->email])->withErrors(['email'=>"
                Esta cuenta ha sido bloqueada.
                \nDebido a muchos intentos fallidos de inicio de sesión.
                \nComuníquese con el administrador para desbloquear su cuenta."]);
            }
            $user->updated_at = now();
            $user->save();
        }
        return $next($request);
    }
}
