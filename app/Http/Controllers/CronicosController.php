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
       // $id ="5333106";
        $id =$request['id'];
        $consec=0;
        $data = array();
        $alarmas = array();
        $data["consec"]=0;
        $data["visible"] = "visible";
        if (Cronicos::where('nit_usuario',$id)->exists()){
            $cr = Cronicos::where('nit_usuario',$id)->first();
            $consec = $cr->id;
            $motivo =$cr->motivo_estado_seguimiento;
            $crh1 = $cr->crh1;
            $crh2 = $cr->crh2_favorable;
            $estado = $cr->estado_seguimiento;
            $reintegro = $cr->fecha_reintegro_por_mmm_;
           // dd($reintegro);
            $abuso = $cr->fecha_carta_suspension_abuso_del_derecho;
            if ($motivo == "TRAMITE DE PENSION"){
                array_push($alarmas,"Paciente con IPT");
            }
            if (($crh1 == "SI" && $crh2=="NO") || ($crh1 == "NO" && $crh2=="NO") || ($crh1 == "NO" && $crh2=="")){
                array_push($alarmas,"Paciente CRH no favorable ");
                $data["visible"] = "oculto";
            }
            
            if (($estado == "SEGUIMIENTO") && ($motivo=="IPP")){
                array_push($alarmas, "Paciente con IPP (NOTA: REMITIR A MEDICINA LABORAL LA INCAPACIDAD LA GENERA EL MEDICO LABORAL)");
                $data["visible"] = "oculto";
            }
            
            if (($estado == "SEGUIMIENTO") && ($motivo!="IPP") &&  ($reintegro!="1900-01-01")){
                array_push($alarmas, "Paciente seguimiento ICP - Reintegrado ".$reintegro);
            } 
            if ($abuso !="1900-01-01"){
                array_push($alarmas, "Abuso del derecho - comunicado de abuso y suspensión en ".$abuso);
                $data["visible"] = "oculto";
            }

            $data["consec"]= $consec;
        }    
        $data["alarmas"]=$alarmas; 
        return response()->json([
            'data' => $data
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
