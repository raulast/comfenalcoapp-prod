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

    public function getNumeroIncapacidad(){
        if(Incapacidad::latest()->first() !== null){
         $id = Incapacidad::latest()->first()->id;
         $id+=1;
        }
        else{
            $id=1;
        }        
        return response()->json([
            'data' => $id
        ]);

    }
    public function buscarHistorico($tipo,$numero){
        //return $numero;
        
        if (Incapacidad::where('tipo_documento_afiliado',$tipo)->where('num_documento_afiliado',$numero)->exists()){
            $datos= Incapacidad::where('tipo_documento_afiliado',$tipo)->where('num_documento_afiliado',$numero)->orderBy('created_at','desc')->get();
           
        }
        else{
            $datos="no";
        }
        /*dd($datos);
        return* response()->json([
            'dataos' => $datos,
        ]);
        */
      //  dd($datos);
        return view('incapacidades.historicoIncapacidad',[
            'datos' => $datos
        ]);
    }
    public function buscarHistoricoUltimaDias($tipo,$numero){
        //return $numero;
        
        if (Incapacidad::where('tipo_documento_afiliado',$tipo)->where('num_documento_afiliado',$numero)->exists()){
            $i= Incapacidad::where('tipo_documento_afiliado',$tipo)->where('num_documento_afiliado',$numero)->orderBy('created_at','desc')->first();
            $dias = $i->dias_solicitados;
            $codigo=$i->codigo_diagnostico;
            $cie10 = Cie10::where('codigo',$codigo)->first();
            $capitulo = $cie10->capitulo_grupo;
            $idant = $i->id;
            $prorrogaidant = $i->prorrogaid;
        }
        else{
            $datos="no";
        }
        //dd($datos);
        return response()->json([
            'dias' => (int)$dias,
            'capitulo' => $capitulo,
            'idant' => $idant,
            'prorrogaidant' => (int)$prorrogaidant
        ]);
        
        
    }

    //save
    public function saveIncapacidad(Request $request){
            $datos = $request->datos;
            
            $i = Incapacidad::create([
                'id' => (int)$datos['id'],
                'prorrogaid' => $datos['prorrogaId'],
                'tipo_prestador' => $datos['tipoPrestador'],
                'tipo_documento_afiliado' =>$datos['tipoDocAfiliado'],
                'num_documento_afiliado' => $datos['IDTrabajador'],
                'fecha_atencion' => $datos['fechaAtencion'],
                'fecha_inicio_incapacidad' => $datos['fechaInicioIncapacidad'],
                'dias_solicitados' => $datos['diasSolicitados'],
                'fecha_fin_incapacidad' => $datos['fechaFinIncapacidad'],
                'dias_reconocidos' => $datos['diasReconocidos'], 
                'causa_externa' => $datos['causae'],
                'contingencia_origen' =>$datos['contingencia'], 
                'observacion' => $datos['observacion'],
                'codigo_diagnostico' => $datos['codigoDiagnostico'],
                'ips' => $datos['ips_id'],
                'medico_id' => $datos['medico_id'],
                'lateralidad' => $datos['lateralidad_id'],
                'prorroga' => $datos['prorroga'],
                'dias_acumulados_previos' => $datos['diasAcumuladosPrevios'],
                'dias_acumulados_ultima_incapacidad' => $datos['diasAcumuladosUltima'],
            ]);
                
            return  "Incapacidad almacenada";
        
    }
   
}
