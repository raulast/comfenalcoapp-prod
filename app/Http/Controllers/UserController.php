<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function obtener(Request $request, $modelo){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)) {
            $data=$model['modelo']::orderBy('id','asc')->get();
            return response()->json([
                'data' => $data
            ]);
        }
    }

    public function obtenerDetalles(Request $request, $modelo, $id){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)) {
            $data=$model['modelo']::where('id', $id)->get();
            if ($modelo=='medico') {
                $model = $this->obtenerModelo('user');
                $user = $model['modelo']::where('id', $data->user_id)->get();
                return response()->json([
                    'data' => $data,
                    'user' => $user
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
            default:
                $model = null;
                break;
        }
        return $model;
    }

    private function requestFormato($data, $modelo){
        $data = $data->toArray();
        switch ($modelo) {
            case 'user':
                $data['password'] = Hash::make($data['password']);
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
            if($modelo == 'medico'){
                $model2 = $this->obtenerModelo('user');
                $data = $this->requestFormato($request,'user');
                if($model2['modelo']::where('id',$model['modelo']::where('id',$id)->first()->user_id)->exists()){
                    $model2['modelo']::where('id',$model['modelo']::where('id',$id)->first()->user_id)->update([
                        'name' => $data['nombre'],
                        'password' => $data['password'],
                        'tipo'=>1
                    ]);
                    unset(
                        $data['password']);
                }
            }else{
                $data = $this->requestFormato($request,$modelo);
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
            if($modelo == 'user'){
                $model2 = $this->obtenerModelo('medico');
                if($model2['modelo']::where('user_id',$id)->exists()){
                    $model2['modelo']::where('user_id',$id)->delete();
                }
            }
            if($model['modelo']::where('id', $id)->exists()){
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

}
