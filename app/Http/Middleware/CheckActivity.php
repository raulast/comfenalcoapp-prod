<?php

namespace App\Http\Middleware;

use Closure;
use App\Contrasenas;

class CheckActivity
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'editar/password',
        'usuario/editar/password'
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
        if($user && (date_diff($user->updated_at,now())->format("%a")> 0)){
            $update=Contrasenas::select('updated_at')
            ->orderBy('updated_at','desc')
            ->where('user_id',$user->id)->first()->updated_at;
            $diff=date_diff($update,now());
            if($diff->format("%a")>45){
                return redirect('editar/password')->with('info', 'Vaya!! hace mas de 45 dias no actiualizas tu contraseña por favor cambiala por una nueva para continuar');;
            }
            $user->updated_at = now();
            $user->save();
        }
        return $next($request);
    }
}
