<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cronicos;

class CronicosController extends Controller
{
    //
    public function index(){
        return view('cronicos.cronicos');
    }
    public function getCronicos(){
        $data = Cronicos::where('id','<',11)->get();
        return response()->json([
            'data' => $data
        ]);
    }
    public function buscarCronicos(Request $request){
        $datos = $request->datos;
        
        $identificacion = $datos['identificacion'];
        
        $estado = $datos['estado'];
        $conducta = $datos['conducta'];
        $motivo = $datos['motivo'];

        $cronicos = Cronicos::where('id','>',1);
        
        if ($identificacion != ""){
            $data = $cronicos->where('nit_usuario',$identificacion)->get();
        }
        if ($estado != ""){
            $data = $cronicos->where('estado_seguimiento',$estado)->get();
        }
        if ($motivo != ""){
            $data = $cronicos->where('motivo_estado_seguimiento',$motivo)->get();
        }
        return response()->json([
            'data' => $data
        ]);
    }
    public function buscarCronico(Request $request){
        
        $id =$request['id'];
        $consec=0;
        if (Cronicos::where('nit_usuario',$id)->exists()){
            $consec = Cronicos::where('nit_usuario',$id)->get()->id;
        }    
        return response()->json([
            'data' => $consec
        ]);
    }
    public function verCronico($id){
      //  $cronico = Cronicos::where('id',$id)->first();
        //dd($cronico);
        return view('cronicos.verCronico',[
            'id' => $id
        ]); 
    }
    public function getCronico($id){
          $data = Cronicos::where('id',$id)->first();
         
          return response()->json([
            'data' => $data
        ]);
      }
}
