<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class GeneralController extends Controller
{
    //
    public function obtener(Request $request, $modelo){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)) {
            $data=$model['modelo']::orderBy('id','asc')->get();
            return response()->json([
                'data' => $data
            ]);
        }
    }
    //crear un nuevo registro en las tablas
    public function agregar(Request $request, $modelo){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)) {
            $data = $this->requestFormato($request,$modelo);
            $row = $model['modelo']::create($data);
            $result = "El registro ha sido agregado exitosamente";
        }else{
           $result = "No se pudo crear, por favor refresque la pagina e intente nuevamente";
        }

        return response()->json([
            'data' => $result,
            'row' => $row
        ]);
    }
    //
    public function obtenerDetalles(Request $request, $modelo, $id){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)) {
            $data=$model['modelo']::where('id', $id)->get();
            return response()->json([
                'data' => $data
            ]);
        }
    }
    //Actualizar un registro en las tablas
    public function editar(Request $request, $modelo, $id){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)){
            if($model['modelo']::where('id', $id)->exists()){
                $data = $this->requestFormato($request,$modelo);
                $model['modelo']::where('id', $id)->update($data);
                $result=  "Actualizado con exito";
            }else{
                $result=  "El registro ha sido eliminado o no existe";
            }
        } else{
            $result= "El registro no se ha actualizado por favor refresque la pagina e intente nuevamente";
        }
        return response()->json([
            'data' => $result
        ]);
    }
    //Eliminar un registro en las tablas
    public function eliminar(Request $request, $modelo, $id){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)){
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
    //normalizar nombres de los modelos
    private function obtenerModelo($modelo_url){
        switch ($modelo_url) {
            case 'causae':
                $model = ['modelo' => 'App\Causae'];
                break;
            case 'ips':
                $model = ['modelo' => 'App\Ips'];
                break;
            case 'diasmax':
                $model = ['modelo' => 'App\Diasmax'];
                break;
            case 'estadosi':
                $model = ['modelo' => 'App\Estadosi'];
                break;
            case 'clasesa':
                $model = ['modelo' => 'App\Clasesa'];
                break;
            case 'estadosa':
                $model = ['modelo' => 'App\Estadosa'];
                break;
            case 'descripcionesp':
                $model = ['modelo' => 'App\Descripcionesp'];
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

}
