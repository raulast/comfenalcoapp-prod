<?php

namespace App\Http\Middleware;

use Closure;

class TwoFactor
{
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

        if(auth()->check() && $user->two_factor_code)
        {
            if($user->two_factor_expires_at->lt(now()))
            {
                $user->resetTwoFactorCode();
                auth()->logout();

                return redirect()->route('login')->withMessage('El código a expirado. Por favor ingrese de nuevo');
            }

            if(!$request->is('verify*'))
            {
                return redirect()->route('verify.index');
            }
        }

        $user->updated_at = now();
        $user->save();

        return $next($request);
    }
}
