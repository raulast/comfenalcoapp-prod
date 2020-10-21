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
            $result = $model['modelo']::create($data);
            return response()->json([
                'data' => $result
            ]);
        }else{
            return response()->json([
                'data' => "No se pudo crear, por favor refresque la pagina e intente nuevamente"
            ]);
        }

    }
    public function obtenerDetalles(Request $request, $modelo, $id){
        //
    }
    public function editar(Request $request, $modelo, $id){
        //
    }
    public function eliminar(Request $request, $modelo, $id){
        //
        $model = $this->obtenerModelo($modelo);
        if (!empty($model)){
            if($model::where('id', $id)->exists()){
                $model::where('id', $id)->delete();
                return  "Eliminado con exito";
            }else{
                return  "El registro ya ha sido eliminado o no existe";
            }
        } else{
            return "El registro no se ha eliminado por favor refresque la pagina e intente nuevamente";
        }
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
