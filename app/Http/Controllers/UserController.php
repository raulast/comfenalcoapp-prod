<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use Auth;

class UserController extends Controller
{
    public function obtener(Request $request, $modelo){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)) {
            if($modelo=='medico'){
                $data=$model['modelo']::orderBy('medicos.id','asc')
                ->select( 'medicos.*', 'users.email')->join('users','medicos.user_id','users.id')->get();
            }else{
                $data=$model['modelo']::orderBy('id','asc')
                ->get();
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
                    $model2['modelo']::where('email',$data['email'])->update([
                        'name' => $data['nombre'],
                        'email' => $data['email'],
                        'password' => $data['password'],
                        'tipo'=>1
                    ]);
                    $usr = $model2['modelo']::where('email',$data['email'])->first();
                    unset($data['email'], $data['password']);
                    $data = array_merge($data,['user_id' => $usr->id]);
                }else{
                    $usr = $model2['modelo']::create([
                        'name' => $data['nombre'],
                        'email' => $data['email'],
                        'password' => $data['password'],
                        'tipo'=>1
                    ]);
                    unset($data['email'], $data['password']);
                    $data = array_merge($data,['user_id' => $usr->id]);
                }
            }else{
                $data = $this->requestFormato($request,$modelo);
            }
            $row = $model['modelo']::create($data);
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
            $data2 = $request->toArray();
            if($modelo == 'medico'){
                $model2 = $this->obtenerModelo('user');
                if($model2['modelo']::where('id',$model['modelo']::where('id',$id)->first()->user_id)->exists()){
                    if($data2['password']==''){
                        $data = $this->requestFormato($request,'user', $id);
                        $model2['modelo']::where('id',$model['modelo']::where('id',$id)->first()->user_id)->update([
                            'name' => $data['nombre'],
                            'email' => $data['email'],
                            'tipo'=>1
                        ]);
                        unset(
                            $data['email']
                        );
                    }else{
                        $data = $this->requestFormato($request,'user', $id);
                        if($data['password']){
                            $model2['modelo']::where('id',$model['modelo']::where('id',$id)->first()->user_id)->update([
                                'name' => $data['nombre'],
                                'password' => Hash::make($data2['password']),
                                'email' => $data['email'],
                                'tipo'=>1
                            ]);
                            unset(
                                $data['password'],
                                $data['email']
                            );
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
                    if($model2['modelo']::where('user_id',$id)->exists()){
                        $model2['modelo']::where('user_id',$id)->update([
                            'nombre' => $data['name']
                        ]);
                    }
                }else{
                    $data = $this->requestFormato($request,'user', $id);
                    if($data['password']){
                        $data['password'] = Hash::make($data2['password']);
                        if($model2['modelo']::where('user_id',$id)->exists()){
                            $model2['modelo']::where('user_id',$id)->update([
                                'nombre' => $data['name']
                            ]);
                        }
                    }else{
                        return response()->json([
                            'rejected' => "Ya has utilizado esa contraseña. Por seguridad usa una diferente"
                        ]);
                    }
                }
            }else{
                $data = $this->requestFormato($request,$modelo, $id);
            }

            $model['modelo']::where('id',$id)->update($data);
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
                if($modelo == 'user'){
                    $model2 = $this->obtenerModelo('medico');
                    if($model2['modelo']::where('user_id',$id)->exists()){
                        $model2['modelo']::where('user_id',$id)->delete();
                    }
                }elseif($modelo == 'medico'){
                    $model2 = $this->obtenerModelo('user');
                    if($model2['modelo']::where('id',$model['modelo']::where('id',$id)->first()->user_id)->exists()){
                        $model2['modelo']::where('id',$model['modelo']::where('id',$id)->first()->user_id)->delete();
                    }
                }
                $model['modelo']::where('id', $id)->delete();
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

    public function editarPassword(Request $request){
        $user = Auth::user();
        $id = $user->id;

        $actual_password = $request->input('actual-password');
        $password = $request->input('password');
        if (!(Hash::check($actual_password, $user->password))) {
            return response()->json([
                'rejected' => "Contraseña actual incorrecta",
                'success' => false
            ]);
        }
        $checked = $this->validarPassword($password, $id);
        if ($checked['validation']) {
            $model = $this->obtenerModelo('user');
            $model['modelo']::where('id',$id)->update([
                'password' => $checked['password']
            ]);
        } else {
            return response()->json([
                'rejected' => "Ya has utilizado esa contraseña. Por seguridad usa una diferente",
                'success' => $checked['validation']
            ]);
        }

        return response()->json([
            'data' => 'Contraseña actualizada exitosamente',
            'success' => $checked['validation']
        ]);

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
