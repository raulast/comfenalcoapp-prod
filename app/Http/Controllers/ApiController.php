<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ips;
use App\Cie10;
use App\Medico;
use App\Causae;
use App\Incapacidad;
use App\User;
use Illuminate\Support\Facades\Hash;


use Auth;

class ApiController extends Controller
{
    //lists
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
            $data=Cie10::where('descripcion_diagnostico','like','%'.$value.'%')->where('num_dias_maximo_solicitud','>',0)->get();

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

    //saves

    public function saveIncapacidad(Request $request){
            $datos = $request->datos;
            if ($datos['prorroga']=="No"){
                if(Incapacidad::latest()->first() !== null){
                    $id = Incapacidad::latest()->first()->id;
                    $id+=1;
                }
                else{
                    $id=1;
                } 
            }
            else{
                $id =(int)$datos['id'];
            }       

           // return $datos;
            $i = Incapacidad::create([
                'id' => $id,
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
                'codigo_diagnostico1' => $datos['codigoDiagnostico1'],
                'codigo_diagnostico2' =>$datos['codigoDiagnostico2'],
                'codigo_diagnostico3' => $datos['codigoDiagnostico3'],
                'ips' => $datos['ips_id'],
                'medico_id' => $datos['medico_id'],
                'lateralidad' => $datos['lateralidad_id'],
                'prorroga' => $datos['prorroga'],
                'dias_acumulados_previos' => $datos['diasAcumuladosPrevios'],
                'dias_acumulados_ultima_incapacidad' => $datos['diasAcumuladosUltima'],
                'estado_id' => $datos['estado_id'],
                'observacion_estado' => $datos['observacion_estado'],
            ]);
                
            return  "Incapacidad almacenada";
        
    }
    public function saveUser(Request $request){
        $data = $request->datos;
        //return $data;

        if(User::where('email',$data['correo'])->exists()){
           User::where('email',$data['correo'])
            ->update([
                'name' => $data['nombre'],
                'email' => $data['correo'],
                'password' => Hash::make($data['contraseña']),
                'tipo' => $data['tipo'],
            ]);
            $u=0;
        }
        else{
            $u = User::create([
                'name' => $data['nombre'],
                'email' => $data['correo'],
                'password' => Hash::make($data['contraseña']),
                'tipo' => $data['tipo'],
            
            ]);
        }
        $data=User::orderBy('name','asc')->get();

        return response()->json([
            'data' => $u
        ]);
            
        //return  "Usuario almacenado";
    
    }
    public function deleteUser(Request $request){
        if(User::where('id', $request->userId)->exists()){
            User::where('id', $request->userId)->delete();     
        } 
        return  "Usuario eliminado";
    }

    //gets
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
    public function getSystemUsers(Request $request){
        $data=User::orderBy('name','asc')->get();
        return response()->json([
            'data' => $data
        ]);
    }
    public function getUser(Request $request){
        //return $request;
        $data=User::where('id', $request->userId)->get();
        return response()->json([
            'data' => $data
        ]);
    }
    public function getMedicosUsers(Request $request){
        
        $data=Medico::orderBy('nombre','asc')->get();

        return response()->json([
            'data' => $data
        ]);
    }
}
