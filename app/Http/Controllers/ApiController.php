<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ips;
use App\Cie10;
use App\Medico;
use App\Causae;
use App\Incapacidad;
use Auth;

class ApiController extends Controller
{
    //
    public function list($tipo){
        if ($tipo== "ips"){ 
            $data=$this->loadIpsDB(); 
        }
        if ($tipo== "causas"){ 
            $data=$this->loadCausasDB(); 
        }
        return response()->json([
            'data' => $data
        ]);
    }
    private function loadIpsDB(){
        $ips=Ips::all();
        return $ips;
    }
    private function loadCausasDB(){
        $causas=Causae::all();
        return $causas;
    }
    public function search($tipo,$value){
        if ($tipo="diagnostico"){
            $data=Cie10::where('descripcion_diagnostico','like','%'.$value.'%')->get();

        }
        return response()->json([
            'data' => $data
        ]);
    }
    public function datosMedico(){
        $id = Auth::user()->id;
        $medico = Medico::where('user_id',$id)->get();
       // dd($medico);
       return response()->json([
        'data' => $medico
    ]);

    }


    //save
    public function saveIncapacidad(Request $request){
            $datos = $request->datos;

            /*
           
           
            ips integer
            medico_id integer 2
            lateralidad integer 
            proroga char 2
            dias_acumulados_previos integer
            dias_acumulados_ultima_incapacidad integer
           
            
            
            
            


            'id' => (int)datos['id'],
            'prorrogaid' => datos['prorrogaId'],
            'tipo_prestador' => datod['tipoPrestador'],
            'tipo_documento_afiliado' =>datos['tipoDocAfiliado'],
            'num_documento_afiliado' => datos['IDTrabajador'],
            'fecha_atencion' => datos['fechaAtencion'],
            'fecha_inicio_incapacidad' => datos['fechaInicioIncapacidad'],
            'dias_solicitados' => datos['diasSolicitados'],
            'fecha_fin_incapacidaddatos' => datos['fechaFinIncapacidad'],
            'dias_reconocidos' => datos['diasReconocidos'], 
            'causa_externa' => datos['causae'],
            'contingencia_origen' =>datos['contingencia'], 
            'observacion' => datos['observacion']
            'codigo_diagnostico' => datos['codigoDiagnostico'  
            
            

            $i = Incapacidad::create([
                'first_name' => 'Taylor',
                'last_name' => 'Otwell',
                'title' => 'Developer',
            ]);
                */
            return $request->datos;
        
    }
}
