<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\LoginFail;
use Auth;
use DB;

class UserController extends Controller
{
    public function obtener(Request $request, $modelo){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)) {
            if($modelo=='medico'){
                $data=$model['modelo']::orderBy('medicos.id','asc')
                ->select( 'medicos.*', 'users.email')->join('users','medicos.user_id','users.id')->get();
            }else{
                $data= DB::select('
                    select
                        u.id,
                        u.name,
                        u.email,
                        u.tipo,
                        tmp.session
                    from users u
                    left join (select lf1.user_id, session from login_fail lf1
                            join (select max(id) as id, user_id from login_fail
                            group by user_id) as lf2 on lf1.id = lf2.id
                            where lf1.deleted_at is null) as tmp on tmp.user_id =u.id
                    where u.deleted_at is null
                    order by u.name asc
                ');
            }
            return response()->json([
                'data' => $data
            ]);
        }
    }

    public function obtenerDetalles(Request $request, $modelo, $id){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)) {
            $data=$model['modelo']::where('id', $id)->first();
            if ($modelo=='medico') {
                $model = $this->obtenerModelo('user');
                $user = $model['modelo']::where('id', $data->user_id)->first();
                return response()->json([
                    'data' => array_merge($data->toArray(),['email'=> $user->email]),
                    'email' => $user->email
                ]);
            }
            return response()->json([
                'data' => $data
            ]);
        }
    }

    private function obtenerModelo($model){
        switch ($model) {
            case 'user':
                $model = ['modelo' => 'App\User'];
                break;
            case 'medico':
                $model = ['modelo' => 'App\Medico'];
                break;
            case 'contrasenas':
                $model = 'App\Contrasenas';
                break;
            default:
                $model = null;
                break;
        }
        return $model;
    }

    private function requestFormato($data, $modelo, $id = null){
        $data = $data->toArray();
        switch ($modelo) {
            case 'user':
                if($data['password'] == ''){
                    unset($data['password']);
                }else{
                    $data['password'] = Hash::make($data['password']);
                }
                break;
            default:
                $data = $data;
                break;
        }
        return $data;
    }

    public function agregar(Request $request, $modelo){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)) {
            if($modelo == 'medico'){
                $data = $this->requestFormato($request,'user');
                $model2 = $this->obtenerModelo('user');
                if($model2['modelo']::where('email',$data['email'])->exists()){
                    $usr = $model2['modelo']::where('email',$data['email'])->first();
                    $usr->name = $data['nombre'];
                    $usr->email = $data['email'];
                    $usr->password = $data['password'];
                    $usr->tipo = 1;
                    $usr->update();
                    unset($data['email'], $data['password']);
                    $data = array_merge($data,['user_id' => $usr->id]);
                }else{
                    $usr = new $model2['modelo'];
                    $usr->name = $data['nombre'];
                    $usr->email = $data['email'];
                    $usr->password = $data['password'];
                    $usr->tipo = 1;
                    $usr->save();
                    unset($data['email'], $data['password']);
                    $data = array_merge($data,['user_id' => $usr->id]);
                }
            }else{
                $data = $this->requestFormato($request,$modelo);
            }
            $row = new $model['modelo'];
            foreach ($data as $key => $value) {
                $row->$key = $value;
            }
            $row->save();
            $result = "El registro ha sido agregado exitosamente";
        }else{
           $result = "No se pudo crear, por favor refresque la pagina e intente nuevamente";
           $row = null;
        }
        return response()->json([
            'data' => $result,
            'row' => $row
        ]);
    }

    public function editar(Request $request, $modelo, $id){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)){
            $row = $model['modelo']::find($id);
            $data2 = $request->toArray();
            if($modelo == 'medico'){
                $model2 = $this->obtenerModelo('user');
                if($model2['modelo']::where('id',$row->user_id)->exists()){
                    if($data2['password']==''){
                        $data = $this->requestFormato($request,'user', $id);
                        $usr = $model2['modelo']::find($row->user_id);
                        $usr->name = $data['nombre'];
                        $usr->email = $data['email'];
                        $usr->tipo = 1;
                        $usr->update();
                        unset($data['email']);
                    }else{
                        $data = $this->requestFormato($request,'user', $id);
                        if($data['password']){
                            $usr = $model2['modelo']::find($row->user_id);
                            $usr->name = $data['nombre'];
                            $usr->email = $data['email'];
                            $usr->password = Hash::make($data2['password']);
                            $usr->tipo = 1;
                            $usr->update();
                            unset($data['password'],$data['email']);
                        }else{
                            return response()->json([
                                'rejected' => "Ya has utilizado esa contraseña. Por seguridad usa una diferente"
                            ]);
                        }
                    }
                }else{
                    return response()->json([
                        'rejected' => "El correo asociado no se ha encontrado"
                    ]);
                }
            }elseif($modelo =='user'){
                $model2 = $this->obtenerModelo('medico');
                if($data2['password']==''){
                    $data = $this->requestFormato($request,'user', $id);
                }else{
                    $data = $this->requestFormato($request,'user', $id);
                    if($data['password']){
                        $data['password'] = Hash::make($data2['password']);
                    }else{
                        return response()->json([
                            'rejected' => "Ya has utilizado esa contraseña. Por seguridad usa una diferente"
                        ]);
                    }
                }
                if($model2['modelo']::where('user_id',$id)->exists()){
                    $medico = $model2['modelo']::where('user_id',$id)->first();
                    $medico->nombre = $data['name'];
                    $medico->update();
                }
            }else{
                $data = $this->requestFormato($request,$modelo, $id);
            }

            foreach ($data as $key => $value) {
                $row->$key = $value;
            }
            $row->update();
            $result= "El registro se actualizo correctamente";
        }else{
            $result= "El registro no se ha actualizado por favor refresque la pagina e intente nuevamente";
        }
        return response()->json([
            'data' => $result
        ]);
    }

    public function eliminar(Request $request, $modelo, $id){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)){
            if($model['modelo']::where('id', $id)->exists()){
                $row = $model['modelo']::find($id);
                if($modelo == 'user'){
                    $model2 = $this->obtenerModelo('medico');
                    if($model2['modelo']::where('user_id',$id)->exists()){
                        $medico = $model2['modelo']::where('user_id',$id)->first();
                        $medico->delete();
                    }
                }elseif($modelo == 'medico'){
                    $model2 = $this->obtenerModelo('user');
                    if($model2['modelo']::where('id',$row->user_id)->exists()){
                        $usr = $model2['modelo']::where('id',$row->user_id)->first();
                        $usr->delete();
                    }
                }
                $row->delete();
                $result=  "Eliminado con exito";
            }else{
                $result=  "El registro ya ha sido eliminado o no existe";
            }
        } else{
            $result= "El registro no se ha eliminado por favor refresque la pagina e intente nuevamente";
        }
        return response()->json([
            'data' => $result
        ]);
    }
    public function desbloquear(Request $request, $modelo, $id){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)){
            if($model['modelo']::where('id', $id)->exists()){
                $row = $model['modelo']::find($id);
                $banned = LoginFail::where('user_id', $id)
                        ->where('session', 'banned')->first();
                $banned->delete();
                $result=  "Usuario desbloqueado exitosamente";
            }
        }
        return response()->json([
            'data' => $result
        ]);
    }

    public function editarPassword(Request $request){

        $user = Auth::user();
        $id = $user->id;

        $actual_password = $request->input('actual-password');
        $password = $request->input('password');
        $password_confirm = $request->input('password-confirm');

        if ($password !== $password_confirm) {
            return back()->withInput()->withErrors(['password_comfirm'=>"Las contraseñas no coinciden"]);
        }

        if (!(Hash::check($actual_password, $user->password))) {
            return back()->withInput()->withErrors(['password_invalida'=>"Contraseña actual incorrecta"]);
            // response()->json([
            //     'rejected' => "Contraseña actual incorrecta",
            //     'success' => false
            // ]);
        }
        $checked = $this->validarPassword($password, $id);
        if ($checked['validation']) {
            $model = $this->obtenerModelo('user');
            $model['modelo']::where('id',$id)->update([
                'password' => $checked['password']
            ]);
        } else {
            return redirect('editar/password')->with('rejected','Ya has utilizado esa contraseña. Por seguridad usa una diferente');
            // response()->json([
            //     'rejected' => "Ya has utilizado esa contraseña. Por seguridad usa una diferente",
            //     'success' => $checked['validation']
            // ]);
        }

        if ($user->tipo == 1){
            return redirect()->route('menu');
        }
        if ($user->tipo == 2){
            return redirect()->route('pemel');
        }
        if ($user->tipo == 0){
            return redirect()->route('pemel');
        }
        if ($user->tipo == 5){
            return redirect()->route('admin');
        }
        // response()->json([
        //     'data' => 'Contraseña actualizada exitosamente',
        //     'success' => $checked['validation']
        // ]);

    }

    private function validarPassword($password, $id){
        $model = $this->obtenerModelo('contrasenas');
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
