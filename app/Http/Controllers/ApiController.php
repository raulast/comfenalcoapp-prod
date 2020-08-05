<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ips;
use App\Cie10;
use App\Medico;
use App\Causae;
use App\Incapacidad;
use App\Licencia;
use App\User;
use App\Clasesa;
use App\Descripcionesp;
use App\Estadosi;
use App\Estadosa;
use App\Diasmax;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Http\Controllers\IncapacidadController;
use PDF;

use Auth;

class ApiController extends Controller
{
    protected $IncapacidadController;
    public function __construct(IncapacidadController $IncapacidadController)
    {
        $this->IncapacidadController = $IncapacidadController;
    }
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
        if ($tipo="diagnosticoLicencia"){
            $data=Cie10::where('tipo_licencia',$value)->get();
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
    public function historicoIncapacidades(){
        $datos= Incapacidad::orderBy('created_at','desc')->get();
       
        return view('incapacidades.historicoIncapacidad',[
            'datos' => $datos
        ]);
    }

    public function updateCie10(Request $request){
        $datos = $request->datos;
        $id = $datos['id'];
        $update = Cie10::find($id)->update($datos);

        return  "Código actualizado";
        
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
    public function saveLicencia(Request $request){
        $datos = $request->datos;
        //return $datos;
        
        $i = Licencia::create([

            'id' => $datos['id'],
            
            'tipo_prestador' => $datos['tipoPrestador'],
            'tipo_documento_afiliado' =>$datos['tipoDocAfiliado'],
            'num_documento_afiliado' => $datos['IDTrabajador'],
            'nombre_afiliado' =>$datos['nombreCompleto'],
            'estado_afiliado' =>$datos['estado'],
            'tipo_cotizante' =>$datos['tipoCotizante'],
            'programa_afiliado'  =>$datos['descripcionPrograma'],

            'fecha_atencion' => $datos['fechaAtencion'],
            'fecha_inicio_licencia' => $datos['fechaInicioLicencia'],
            'dias_solicitados' => $datos['diasSolicitados'],
            'fecha_fin_licencia' => $datos['fechaFinLicencia'],

            'tipo_atencion' => $datos['tipoAtencion'],
            'edad_gestacional_semanas'=> $datos['semanasGestacion'],
            'edad_gestacional_dias'=> $datos['diasGestacion'],
            'dias_gestacion'=> $datos['diasGestacionC'],
            'recien_nacido_viable'=> $datos['nacidoViable'],
            'tipo_licencia'=> $datos['tipoLicencia'],
            
            'causa_externa' => $datos['causae'],
            'contingencia_origen' =>$datos['contingencia'], 
            'observacion' => $datos['observacion'],
            
            'codigo_diagnostico' => $datos['codigoDiagnostico'],
            'codigo_diagnostico1' => $datos['codigoDiagnostico1'],
            'codigo_diagnostico2' =>$datos['codigoDiagnostico2'],
            'codigo_diagnostico3' => $datos['codigoDiagnostico3'],
            'ips' => $datos['ips_id'],
            'medico_id' => $datos['medico_id'],
            
            'estado_id' => $datos['estado_id'],
            'observacion_estado' => $datos['observacion_estado'],
        ]);
            
        return  "Licencia almacenada";
    
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
    public function getNumeroLicencia(){
        /*if(Incapacidad::latest()->first() !== null){
         $id = Incapacidad::latest()->first()->id;
         $id+=1;
        }
        else{
            $id=1;
        }  */
        $id=1;      
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
    public function getSystemCausas(Request $request){
        
        $data=Causae::orderBy('id','asc')->get();

        return response()->json([
            'data' => $data
        ]);
    }
    public function getSystemCie10(Request $request){
        
        $data=Cie10::where('id','<',10)->orderBy('id','asc')->get();

        return response()->json([
            'data' => $data
        ]);
    }
    public function getCie10($id){
        
        $data=Cie10::where('id',$id)->orderBy('id','asc')->first();

        return response()->json([
            'data' => $data
        ]);
    }
    public function buscarCie10($campo,$texto){
        $data=Cie10::where($campo,'like','%'.$texto.'%')->get();

        return response()->json([
            'data' => $data
        ]);
    }
    

    public function getSystemEstados(Request $request){
        
        $data=Estadosi::orderBy('id','asc')->get();

        return response()->json([
            'data' => $data
        ]);
    }
    public function getSystemIps(Request $request){
        
        $data=Ips::orderBy('id','asc')->get();

        return response()->json([
            'data' => $data
        ]);
    }
    public function getSystemClasesa(Request $request){
        
        $data=Clasesa::orderBy('id','asc')->get();

        return response()->json([
            'data' => $data
        ]);
    }
    public function getSystemDescripciones(Request $request){
        
        $data=Descripcionesp::orderBy('id','asc')->get();

        return response()->json([
            'data' => $data
        ]);
    }
    public function getSystemEstadosa(Request $request){
        $data=Estadosa::orderBy('id','asc')->get();
        return response()->json([
            'data' => $data
        ]);
    }
    public function getSystemDiasmax(Request $request){
        $data=Diasmax::orderBy('id','asc')->get();
        return response()->json([
            'data' => $data
        ]);
    }
    //certificados

    public function certificadoIncapacidad($id,$pid){
        $fechahora= Carbon::now();
        
        $d =Incapacidad::where('id',$id)->where('prorrogaid',$pid)->first();
        
        $tipoDoc = $d->tipo_documento_afiliado;
        $numDoc = $d->num_documento_afiliado;
        $response = json_decode($this->IncapacidadController->validacion($tipoDoc,$numDoc));
        dd($response);
        $afiliado = $response->responseMessageOut->body->response->validadorResponse->DsAfiliado->Afiliado;
        if (is_array($afiliado) == false) {
            $afiliado = array($afiliado);
        }
        $nombre = $afiliado[0]->Nombre;
        $primerApellido = $afiliado[0]->PrimerApellido; 
        $segundoApellido = $afiliado[0]->SegundoApellido;
        $nombreCompleto = $nombre." ".$primerApellido." ".$segundoApellido;
        $numDoc = $afiliado[0]->IDTrabajador;
        $tipoAfiliado = $afiliado[0]->ClaseAfiliacion;
        $tipoCotizante = $afiliado[0]->DescripcionPrograma;
        $tipoAportante="";

        //dd($validacion);

        $i = collect([]);
        $i->put('titulo','CERTIFICADO MÉDICO INCAPACIDAD TEMPORAL');
        $i->put('No',$d->id."-".$d->prorrogaid);

        if ($d->prorrogaid == 0){
            $prorroga = "NO";
        }
        else{
            $prorroga = "SI";
        }

        if ($d->tipo_prestador== 1){
            $ips=Ips::where('id',$d->ips)->first();
            $prestador = $ips->nombre_sede;
            $nitprestador = $ips->nit;
            $direccionprestador = $ips->direccion;
        }
        if ($d->tipo_prestador== 2){
           $prestador="Consultorio";
           $nitprestador = Medico::where('id',$d->medico_id)->first()->num_documento;
           $direccionprestador ="";
        }

        if ($d->contingencia_origen=="2"){
            $soat="SI";
        }
        else{
            $soat="NO";
        }

        $nombrePrestador=Medico::where('id',$d->medico_id)->first()->nombre;
        $especialidad=Medico::where('id',$d->medico_id)->first()->especialidad;
        $tipoDocProf=Medico::where('id',$d->medico_id)->first()->tipo_documento;
        $numDocProf=Medico::where('id',$d->medico_id)->first()->num_documento;
        $registroMedico=Medico::where('id',$d->medico_id)->first()->reg_medico;

        $i->put('Nombre del prestador',$prestador);
        $i->put('Nit del prestador',$nitprestador);
        $i->put('Dirección del prestador',$direccionprestador);
        $i->put('Ciudad',"");
        $i->put('NombreEPS',"Comfenalco Valle de la gente EPS");
        $i->put('Fecha de impresion', $fechahora ->toDateTimeString());
        $i->put('Fecha de consulta médica',$d->fecha_atencion);
        $i->put('Fecha y hora de generacion',$d->created_at);
        $i->put('Nombre del paciente',$nombreCompleto);
        $i->put('Tipo de identificacion del paciente',$tipoDoc);
        $i->put('Numero de documento del paciente',$numDoc);
        $i->put('Tipo afiliado',$tipoAfiliado);

        $i->put('Tipo de cotizante',$tipoCotizante);
        $i->put('Tipo de aportante',$tipoAportante);
        $i->put('Nombre aportante',$afiliado[0]->NombreEmpresa);
        $i->put('Numero historia clinica',$numDoc);

        $i->put('Tipo de certificado','Incapacidad temporal');
        $i->put('Fecha de inicio de la incapacidad',$d->fecha_inicio_incapacidad);
        $i->put('Fecha fin de la incapacidad',$d->fecha_fin_incapacidad);

        $i->put('Días solicitados en letra','');
        $i->put('Días solicitados',$d->dias_solicitados);
        $i->put('Prorroga',$prorroga);

        $i->put('Días acumulados',$d->dias_acumulados_previos);
        $i->put('Diagnostico principal',$d->codigo_diagnostico);
        $i->put('Diagnostico relacionado 1',$d->codigo_diagnostico1);
        $i->put('Diagnostico relacionado 2',$d->codigo_diagnostico2);      
        $i->put('Contingencia origen',$d->contingencia_origen);

        $i->put('SOAT',$soat);
       
        $i->put('Nombre del profesional que genera',$nombrePrestador);      
        $i->put('Profesión profesional que genera',$especialidad);          
        $i->put('Firma profesional que genera',''); 
        $i->put('Tipo doc profesional que genera',$tipoDocProf); 
        $i->put('Numero doc profesional que genera',$numDocProf); 
        $i->put('Especialidad',$especialidad); 
        $i->put('Registro Médico',$registroMedico); 
        $i->put('Observacion EPS',''); 

        $pdf = PDF::loadView('incapacidades.certificado',[
            'i' => $i

        ])->setPaper('US Legal', 'landscape');
        
        return $pdf->stream('certificado.pdf');

        return view('incapacidades.certificado',[
            'i' => $i
        ]);
    }
    public function certificadoLicencia($id){
        $fechahora= Carbon::now();
        
        $d =Licencia::where('id',$id)->first();
        
        $tipoDoc = $d->tipo_documento_afiliado;
        $numDoc = $d->num_documento_afiliado;
        $response = json_decode($this->IncapacidadController->validacion($tipoDoc,$numDoc));
        //dd($response);
        $afiliado = $response->responseMessageOut->body->response->validadorResponse->DsAfiliado->Afiliado;
        if (is_array($afiliado) == false) {
            $afiliado = array($afiliado);
        }
        $nombre = $afiliado[0]->Nombre;
        $primerApellido = $afiliado[0]->PrimerApellido; 
        $segundoApellido = $afiliado[0]->SegundoApellido;
        $nombreCompleto = $nombre." ".$primerApellido." ".$segundoApellido;
        $numDoc = $afiliado[0]->IDTrabajador;
        $tipoAfiliado = $afiliado[0]->ClaseAfiliacion;
        $tipoCotizante = $afiliado[0]->DescripcionPrograma;
        $tipoAportante="";

        //dd($validacion);

        $i = collect([]);
        $i->put('titulo','CERTIFICADO MÉDICO LICENCIA DE MATERNIDAD');
        $i->put('No',$d->id);

       

        if ($d->tipo_prestador== 1){
            $ips=Ips::where('id',$d->ips)->first();
            $prestador = $ips->nombre_sede;
            $nitprestador = $ips->nit;
            $direccionprestador = $ips->direccion;
        }
        if ($d->tipo_prestador== 2){
           $prestador="Consultorio";
           $nitprestador = Medico::where('id',$d->medico_id)->first()->num_documento;
           $direccionprestador ="";
        }

       

        $nombrePrestador=Medico::where('id',$d->medico_id)->first()->nombre;
        $especialidad=Medico::where('id',$d->medico_id)->first()->especialidad;
        $tipoDocProf=Medico::where('id',$d->medico_id)->first()->tipo_documento;
        $numDocProf=Medico::where('id',$d->medico_id)->first()->num_documento;
        $registroMedico=Medico::where('id',$d->medico_id)->first()->reg_medico;

        $i->put('Nombre del prestador',$prestador);
        $i->put('Nit del prestador',$nitprestador);
        $i->put('Dirección del prestador',$direccionprestador);
        $i->put('Ciudad',"");
        $i->put('NombreEPS',"Comfenalco Valle de la gente EPS");
        $i->put('Fecha de impresion', $fechahora ->toDateTimeString());
        $i->put('Fecha de consulta médica',$d->fecha_atencion);
        $i->put('Fecha y hora de generacion',$d->created_at);
        $i->put('Nombre del paciente',$nombreCompleto);
        $i->put('Tipo de identificacion del paciente',$tipoDoc);
        $i->put('Numero de documento del paciente',$numDoc);
        $i->put('Tipo afiliado',$tipoAfiliado);

        $i->put('Tipo de cotizante',$tipoCotizante);
        $i->put('Tipo de aportante',$tipoAportante);
        $i->put('Nombre aportante',$afiliado[0]->NombreEmpresa);
        $i->put('Numero historia clinica',$numDoc);

        $i->put('Tipo de certificado','Licencia de maternidad');
        $i->put('Tipo de licencia',$d->tipo_licencia);
        $i->put('Fecha de inicio de la licencia',$d->fecha_inicio_licencia);
        $i->put('Fecha fin de la licencia',$d->fecha_fin_licencia);

        $i->put('Días solicitados en letra','');
        $i->put('Días solicitados',$d->dias_solicitados);


        $i->put('Diagnostico principal',$d->codigo_diagnostico);
           
        $i->put('Contingencia origen',$d->contingencia_origen);

        
       
        $i->put('Nombre del profesional que genera',$nombrePrestador);      
        $i->put('Profesión profesional que genera',$especialidad);          
        $i->put('Firma profesional que genera',''); 
        $i->put('Tipo doc profesional que genera',$tipoDocProf); 
        $i->put('Numero doc profesional que genera',$numDocProf); 
        $i->put('Especialidad',$especialidad); 
        $i->put('Registro Médico',$registroMedico); 
        $i->put('Observacion EPS',''); 

        $pdf = PDF::loadView('incapacidades.certificadoLicencia',[
            'i' => $i

        ])->setPaper('US Legal', 'landscape');
        
        return $pdf->stream('certificado.pdf');

        return view('incapacidades.certificadoLicencia',[
            'i' => $i
        ]);
    }
}
