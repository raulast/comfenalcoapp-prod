<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GeneralController extends Controller
{
    //obtener registros de un modelo
    public function obtener(Request $request, $modelo){
        //Codigo . . .
    }
    public function agregar(Request $request, $modelo){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)) {
            $data = $request->toArray();
            //formatear data # code
            $model['modelo']::create($data);
            $result = "El registro ha sido agregado exitosamente";
        }else{
           $result = "No se pudo crear, por favor refresque la pagina e intente nuevamente";
        }

        return response()->json([
            'data' => $result
        ]);
    }
    public function obtenerDetalles(Request $request, $modelo, $id){
        //Codigo. . .
    }
    public function editar(Request $request, $modelo, $id){
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)){
            if($model['modelo']::where('id', $id)->exists()){
                $data = $request->toArray();
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

}
