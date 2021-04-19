<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Hash;
use App\Notifications\TwoFactorCode;
use Illuminate\Http\Request;
use App\User;
use App\Contrasenas;
use DB;
use Auth;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    public function reset(Request $request)
    {
        $token = DB::table('password_resets')
        ->select('token')
        ->where('email', $request->input('email'))
        ->first();
        $tokenR=isset($token->token)?$token->token:null;
        if ($tokenR) {
            if(!(Hash::check($request->input('token'), $tokenR))){
                return back()->withInput()->withErrors(['email'=>"El token ha expirado por favor solicita nuevamente cambiar tu contraseña"]);
            }
        }else{
            return back()->withInput()->withErrors(['email'=>"Ya se ha restablecido la contraseña para este email, si no lo ha hecho usted por favor comuniquese con el administrador"]);
        }
        $user = User::where('email',$request->input('email'))->first();
        if(!$user){
            return back()->withInput()->withErrors(['email'=>"El email que intenta recuperar no se encuentra registrado en la plataforma. Por favor comuníquese con el administrador."]);
        }
        $id = $user->id;

        $password = $request->input('password');
        $password_confirmation = $request->input('password_confirmation');

        if ($password !== $password_confirmation) {
            return back()->withInput()->withErrors(['password'=>"Las contraseñas no coinciden"]);
        }

        $checked = $this->validarPassword($password, $id);
        if ($checked['validation']) {
            $user->password = $checked['password'] ;
            $user->update();
            DB::table('password_resets')
            ->select('token')
            ->where('email', $request->input('email'))
            ->delete();

        } else {
            return back()->withInput()->withErrors(['password'=>"Ya has utilizado esta contraseña. Por seguridad usa una diferente"]);
        }
        if (Auth::attempt(['email'=>$request->input('email'),'password'=>$password],true)) {
            // Authentication passed...
            $user = Auth::user();
            $user->generateTwoFactorCode();
            $user->notify(new TwoFactorCode());
            return redirect('verify');
        }else{
            return redirect('login')->withInput();
        }

    }

    private function validarPassword($password, $id){
        $model = new Contrasenas;
        $data = [];
        $data['user_id']=$id;
        $data['password']=Hash::make($password);
        $count=0;
        $validation=false;
        $contrasenas= $model::orderBy('updated_at','asc')->where('user_id',$id)->get();
        foreach ($contrasenas as $key => $value) {
            $validation = Hash::check($password, $value->password);
            if ($validation) {
                break;
            }
            $count=$count+1;
        }
        if(!$validation | ($contrasenas->count()==15 && $count == 0) ){
            if ($contrasenas->count() < 15) {
                $model::create($data);
            }elseif(($count == 15) | ($count == 0)){
                $tmp=$model::where('user_id',$id)
                ->orderBy('updated_at','asc')->first()->update($data);
                $validation=false;
            }
        }else{
            $data['validation'] = !$validation;
            $data['count'] = $count;
            return $data;
        }
        $data['validation'] = !$validation;
        $data['count'] = $count;
        return $data;
    }
}
