<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Judiciales;

class JuridicasController extends Controller
{
    //
    public function index(){
        return view('juridicas.juridicas');
    }
    public function getJuridicas(){
        $data = Judiciales::where('id','<',100)->get();
        return response()->json([
            'data' => $data
        ]);
    }
    public function verJuridica($id,$enable,$crud){
          return view('juridicas.verJuridica',[
              'id' => $id,
              'enable'=>$enable,
              'crud' => $crud
          ]); 
      }
      public function getJuridica($id){
        $data = Judiciales::where('id',$id)->first();
       
        return response()->json([
          'data' => $data
      ]);
    }
    public function buscarJuridicas(Request $request){
        $datos = $request->datos;
        
        $identificacion = $datos['identificacion'];
        $desde = $datos['desde'];
        $hasta = $datos['hasta'];
       // return $datos;
        
        $estado = $datos['estado'];
        //$conducta = $datos['conducta'];
        $motivo = $datos['motivo'];

        $juridicas = Judiciales::where('id','>=',1);
        
        if ($identificacion != ""){
            $data = $juridicas->where('nit_usuario',$identificacion);
        }
        /*
        if ($estado != ""){
            $data = $juridicas->where('estado_seguimiento',$estado);
        }
        if ($motivo != ""){
            $data = $juridicas->where('motivo_estado_seguimiento',$motivo);
        }
        
        if (($datos['desde']!="")&&($datos['hasta'])!=""){
            $data = $juridicas->whereBetween('fecha_notificacion', [$desde, $hasta]);
        }*/
        $data = $data->get();
        return response()->json([
            'data' => $data
        ]);
    }
    public function updateJuridica(Request $request){
        $datos = $request->datos;
        $id = $datos['id'];
        $update = Judiciales::find($id)->update($datos);

        return  "Información actualizada";
    }
    public function createJuridica(Request $request){
        $datos = $request->datos;
        $id =Judiciales::orderBy('id','desc')->first()->id;
        $id = $id + 1;
        $datos['id'] = $id;

        unset($datos['id']);
        
        //return $datos;

        $create = Judiciales::create($datos);

        return  "Registro creado";

    }
}
