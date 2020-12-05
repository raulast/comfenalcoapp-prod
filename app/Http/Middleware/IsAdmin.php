<?php

namespace App\Http\Middleware;

use Closure;

class IsAdmin
{
    /**
     * The URIs that should be excluded from CSRF verification.
     * Identificador del Admin
     * @var array
     */
    protected $admin = [
        0
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
        $user = auth()->user();
        if ($user) {
            foreach ($this->admin as $tipo) {
                if ($user->tipo == $tipo) {
                    return $next($request);
                }
            }
        }
        return abort(401, 'Usuario No autorizado');
    }
}
