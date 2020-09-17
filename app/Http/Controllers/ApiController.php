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


use Luecano\NumeroALetras\NumeroALetras;

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
        if ($tipo== "medicos"){ 
            $data=$this->loadMedicosDB(); 
        }
        if ($tipo== "especialidades"){ 
            $data=$this->loadEspDB(); 
        }
        if ($tipo== "tiposCotizante"){ 
            $data=$this->loadTcDB(); 
        }
        return response()->json([
            'data' => $data
        ]);
    }
    private function loadIpsDB(){
        $ips=Ips::orderBy('nombre_sede','asc')->get();
        return $ips;
    }
    private function loadMedicosDB(){
        $medicos=Medico::orderBy('nombre','asc')->get();
        return $medicos;
    }
    private function loadEspDB(){
        $esp=Diasmax::orderBy('especialidad','asc')->get();
        return $esp;
    }
    private function loadCausasDB(){
        $causas=Causae::all();
        return $causas;
    }
    private function loadTcDB(){
        $tc=Descripcionesp::where('incapacidad',1)->orderBy('descripcion','asc')->get();
        return $tc;
    }
    public function search($tipo,$value){
        if ($tipo=="diagnostico"){
            $data=Cie10::where('descripcion_diagnostico','like','%'.$value.'%')->where('num_dias_maximo_solicitud','>',0)->get();
        }
        if ($tipo=="diagnosticoLicencia"){
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
            $fechaFinUltima = $i->fecha_fin_incapacidad;
        }
        else{
            $datos="no";
        }
        //dd($datos);
        return response()->json([
            'dias' => (int)$dias,
            'capitulo' => $capitulo,
            'idant' => $idant,
            'prorrogaidant' => (int)$prorrogaidant,
            'fechaFinUltima' => $fechaFinUltima
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
                    $id = Incapacidad::latest()->where('prorrogaId',0)->first()->id;
                    $id+=1;
                }
                else{
                    $id=1;
                }   
            }
            else{
                $id =(int)$datos['id'];
            }       

            if (Incapacidad::where('id',$id)->where('prorrogaid',$datos['prorrogaId'])->exists()){
                return "La incapacidad ya se encuentra almacenada";
            }
            else{

           //return $datos;
            $i = Incapacidad::create([
                'id' => $id,
                'prorrogaid' => $datos['prorrogaId'],
                'tipo_prestador' => $datos['tipoPrestador'],
                'tipo_documento_afiliado' =>$datos['tipoDocAfiliado'],
                'num_documento_afiliado' => $datos['IDTrabajador'],
                'nombre_afiliado' =>$datos['nombreCompleto'],
                'estado_afiliado' =>$datos['estado'],
                'tipo_cotizante' =>$datos['tipoCotizante'],
                //'programa_afiliado'  =>$datos['descripcionPrograma'],
                'programa_afiliado'  =>$datos['programas'],
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

                'validacion' => $datos['validacion'],
                'aportantes' => $datos['aportantes'],
            ]);
                
            return  "Incapacidad almacenada";

            }
        
    }
    public function saveLicencia(Request $request){
        $datos = $request->datos;
        //return $datos;
        
        if (Licencia::where('id',$datos['id'])->exists()){
            return "La licencia ya se encuentra almacenada";
        }
        else{
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
            'validacion' => $datos['validacion'],
            'aportantes' => $datos['aportantes'],
        ]);
            
        return  "Licencia almacenada";
        }
}
    public function saveUser(Request $request){
        $data = $request->datos;
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
    public function saveMedico(Request $request){
        $data = $request->datos;
        if(User::where('email',$data['correo'])->exists()){
            User::where('email',$data['correo'])
             ->update([
                 'name' => $data['nombre'],
                 'email' => $data['correo'],
                 'password' => Hash::make($data['contraseña']),
             ]);
             
        }
        else{
             $u = User::create([
                 'name' => $data['nombre'],
                 'email' => $data['correo'],
                 'password' => Hash::make($data['contraseña']),
                 'tipo' =>1,
             
             ]);
        }
        if(Medico::where('num_documento',$data['numeroDocumento'])->exists()){
            Medico::where('num_documento',$data['numeroDocumento'])
            ->update([
                'cod_medico' => $data['codigoMedico'],
                'nombre' => $data['nombre'],
                'tipo_documento'  => $data['tipoDocumento'],
                'num_documento' => $data['numeroDocumento'],
                'reg_medico' => $data['registroMedico'],
                'especialidad' => $data['especialidad'],
            ]);
            $m=0;
        }
        else{
            $m = Medico::create([
                'user_id' => User::where('email',$data['correo'])->first()->id,
                'cod_medico' => $data['codigoMedico'],
                'nombre' => $data['nombre'],
                'tipo_documento'  => $data['tipoDocumento'],
                'num_documento' => $data['numeroDocumento'],
                'reg_medico' => $data['registroMedico'],
                'especialidad' => $data['especialidad'],
            ]);
           
        }
        return response()->json([
            'data' => $m
        ]);
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
         $id = Incapacidad::latest()->where('prorrogaId',0)->first()->id;
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
        if(Licencia::latest()->first() !== null){
         $id = Licencia::latest()->first()->id;
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
    public function getMedico(Request $request){
        //return $request;
        $userId = Medico::where('id', $request->medicoId)->first()->user_id;
        $u = User::where('id', $userId)->first();

        $data=Medico::where('id', $request->medicoId)->get();
        $data[0]['correo'] = $u->email;
        
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
        $formatter = new NumeroALetras;
       // dd( $formatter->toWords(126, 0));



        $fechahora= Carbon::now();
        
        $d =Incapacidad::where('id',$id)->where('prorrogaid',$pid)->first();
        
        $tipoDoc = $d->tipo_documento_afiliado;
        $numDoc = $d->num_documento_afiliado;
        $response =json_decode($d->validacion);
        //$response = json_decode($this->validacion($tipoDoc,$numDoc));
       // dd($response->responseMessageOut->body->response->validadorResponse->DsAfiliado->Afiliado);
        $afiliado = $response->responseMessageOut->body->response->validadorResponse->DsAfiliado->Afiliado;
        
        
        if (is_array($afiliado) == false) {
            $nombre = $afiliado->Nombre;
            $primerApellido = $afiliado->PrimerApellido; 
            $segundoApellido = $afiliado->SegundoApellido;
            $nombreCompleto = $nombre." ".$primerApellido." ".$segundoApellido;
            $numDoc = $afiliado->IDTrabajador;
            $tipoAfiliado = $afiliado->ClaseAfiliacion;
            $tipoCotizante = $afiliado->DescripcionPrograma;
            $tipoAportante="";
            
            if (gettype($afiliado->NombreEmpresa) == "string") {
               
                $nombreEmpresa =$afiliado->NombreEmpresa;
            }
            else{
                $nombreEmpresa= $nombreCompleto;
            }
        }
        else{
           
            $nombre = $afiliado[0]->Nombre;
            $primerApellido = $afiliado[0]->PrimerApellido; 
            $segundoApellido = $afiliado[0]->SegundoApellido;
            $nombreCompleto = $nombre." ".$primerApellido." ".$segundoApellido;
            $numDoc = $afiliado[0]->IDTrabajador;
            $tipoAfiliado = $afiliado[0]->ClaseAfiliacion;
            $tipoCotizante = $afiliado[0]->DescripcionPrograma;
            $tipoAportante="";
            $nombreEmpresa= $afiliado[0]->NombreEmpresa;
            if (gettype($afiliado[0]->NombreEmpresa) == "string") {
                $nombreEmpresa =$afiliado[0]->NombreEmpresa;
            }
            else{
                $nombreEmpresa= $nombreCompleto;
            }
        }

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
        $contingencias=["","Enfermedad general","Enfermedad laboral","Accidente de trabajo"];
       
        if ($d->causa_externa=="2"){
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
        $i->put('Nombre aportante',$nombreEmpresa);
        $i->put('Numero historia clinica',$numDoc);

        $i->put('Tipo de certificado','Incapacidad temporal');
        $i->put('Fecha de inicio de la incapacidad',$d->fecha_inicio_incapacidad);
        $i->put('Fecha fin de la incapacidad',$d->fecha_fin_incapacidad);

        $i->put('Días solicitados en letra',$formatter->toWords($d->dias_solicitados, 0));
        $i->put('Días solicitados',$d->dias_solicitados);
        $i->put('Prorroga',$prorroga);

        $i->put('Días acumulados',$d->dias_acumulados_previos);
        $i->put('Diagnostico principal',$d->codigo_diagnostico);
        $i->put('Diagnostico relacionado 1',$d->codigo_diagnostico1);
        $i->put('Diagnostico relacionado 2',$d->codigo_diagnostico2);      
        $i->put('Contingencia origen',$contingencias[$d->contingencia_origen]);

        $i->put('SOAT',$soat);
       
        $i->put('Nombre del profesional que genera',$nombrePrestador);      
        $i->put('Profesión profesional que genera',$especialidad);          
        $i->put('Firma profesional que genera',''); 
        $i->put('Tipo doc profesional que genera',$tipoDocProf); 
        $i->put('Numero doc profesional que genera',$numDocProf); 
        $especialidades=["","Médico general","Médico especialista","Odontólogo general","Odontólogo especialista"];
        
        $i->put('Especialidad',$especialidades[$especialidad]); 
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
        $formatter = new NumeroALetras;
        $fechahora= Carbon::now();
        
        $d =Licencia::where('id',$id)->first();
        
        $tipoDoc = $d->tipo_documento_afiliado;
        $numDoc = $d->num_documento_afiliado;
        $response =json_decode($d->validacion);
        //$response = json_decode($this->validacion($tipoDoc,$numDoc));
        //dd($response);
        //dd($response->responseMessageOut->body->response->validadorResponse->DsAfiliado->Afiliado);
        $afiliado = $response->responseMessageOut->body->response->validadorResponse->DsAfiliado->Afiliado;
        
        
        if (is_array($afiliado) == false) {
            $nombre = $afiliado->Nombre;
            $primerApellido = $afiliado->PrimerApellido; 
            $segundoApellido = $afiliado->SegundoApellido;
            $nombreCompleto = $nombre." ".$primerApellido." ".$segundoApellido;
            $numDoc = $afiliado->IDTrabajador;
            $tipoAfiliado = $afiliado->ClaseAfiliacion;
            $tipoCotizante = $afiliado->DescripcionPrograma;
            $tipoAportante="";
            
            if (gettype($afiliado->NombreEmpresa) == "string") {
               
                $nombreEmpresa =$afiliado->NombreEmpresa;
            }
            else{
                $nombreEmpresa= $nombreCompleto;
            }
        }
        else{
           
            $nombre = $afiliado[0]->Nombre;
            $primerApellido = $afiliado[0]->PrimerApellido; 
            $segundoApellido = $afiliado[0]->SegundoApellido;
            $nombreCompleto = $nombre." ".$primerApellido." ".$segundoApellido;
            $numDoc = $afiliado[0]->IDTrabajador;
            $tipoAfiliado = $afiliado[0]->ClaseAfiliacion;
            $tipoCotizante = $afiliado[0]->DescripcionPrograma;
            $tipoAportante="";
            $nombreEmpresa= $afiliado[0]->NombreEmpresa;
            if (gettype($afiliado[0]->NombreEmpresa) == "string") {
                $nombreEmpresa =$afiliado[0]->NombreEmpresa;
            }
            else{
                $nombreEmpresa= $nombreCompleto;
            }
        }

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
        $i->put('Nombre aportante',$nombreEmpresa);
        $i->put('Numero historia clinica',$numDoc);

        $i->put('Tipo de certificado','Licencia de maternidad');
        $i->put('Tipo de licencia',$d->tipo_licencia);
        $i->put('Fecha de inicio de la licencia',$d->fecha_inicio_licencia);
        $i->put('Fecha fin de la licencia',$d->fecha_fin_licencia);

        $i->put('Días solicitados en letra',$formatter->toWords($d->dias_solicitados, 0));
        $i->put('Días solicitados',$d->dias_solicitados);


        $i->put('Diagnostico principal',$d->codigo_diagnostico);
           
        $i->put('Contingencia origen',"Licencia");

        
       
        $i->put('Nombre del profesional que genera',$nombrePrestador);      
        $i->put('Profesión profesional que genera',$especialidad);          
        $i->put('Firma profesional que genera',''); 
        $i->put('Tipo doc profesional que genera',$tipoDocProf); 
        $i->put('Numero doc profesional que genera',$numDocProf); 
        $especialidades=["","Médico general","Médico especialista","Odontólogo general","Odontólogo especialista"];
        
        $i->put('Especialidad',$especialidades[$especialidad]); 
       
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
    public function validacion($tipo,$numero){
        
        $tipoDocumento = $tipo;
        $numeroIdentificacion = $numero;
        
       /*return view('incapacidades.validacion',[
            'tipoDocumento' => $tipoDocumento, 
            'numeroIdentificacion' => $numeroIdentificacion
            ]);*/
        //respuesta NO
       //return '{"responseMessageOut":{"header":{"invokerDateTime":"2020-05-26 15:50:56","moduleId":"CHATBOTEPS","systemId":"CHATBOTEPS","messageId":"CHATBOTEPS |80197028|CC","logginData":{"sourceSystemId":"NA","destinationSystemId":"NA"},"destination":{"namespace":"http:\/\/co\/com\/comfenalcovalle\/esb\/ws\/ValidadorServiciosEps","name":"ValidadorServiciosEps","operation":"execute"},"responseStatus":{"statusCode":"SUCCESS"}},"body":{"response":{"validadorResponse":{"xsi":"http:\/\/www.w3.org\/2001\/XMLSchema-instance","Derechos":{"DerechoPrestacion":"NO","Programa":"EP","DescripcionPrograma":"Por plan de beneficios de salud","MENSAJE":"El usuario con tipo CC y numero 80197028 NO tiene derecho a prestación de servicios, Por plan de beneficios de salud"},"DsAfiliado":{},"DsSede":{"Sede":{"Observaciones":"No se encontraron registros"},"SedeAtencion":{"Observaciones":"No se encontraron registros"}},"DsGrupoFamiliar":{"Beneficiario":{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"80197028","EstadoCaja":"NA","EstadoPOS":"RE","EstadoPCO":"NA","Nombre":"JUAN FERNANDO","PrimerApellido":"GUERRA","SegundoApellido":"CAMARGO","Sexo":"M","TidTrabajador":"1","IDTrabajador":"80197028"}}}}}}}';

        //respuesta correcta   
       //return '{"responseMessageOut":{"header":{"invokerDateTime":"2020-05-30 17:58:48","moduleId":"CHATBOTEPS","systemId":"CHATBOTEPS","messageId":"CHATBOTEPS |16449455|CC","logginData":{"sourceSystemId":"NA","destinationSystemId":"NA"},"destination":{"namespace":"http:\/\/co\/com\/comfenalcovalle\/esb\/ws\/ValidadorServiciosEps","name":"ValidadorServiciosEps","operation":"execute"},"responseStatus":{"statusCode":"SUCCESS"}},"body":{"response":{"validadorResponse":{"xsi":"http:\/\/www.w3.org\/2001\/XMLSchema-instance","Derechos":{"DerechoPrestacion":"SI","Programa":"EP","DescripcionPrograma":"Por plan de beneficios de salud","MENSAJE":"El usuario con tipo CC y numero 16449455 SI tiene derecho a prestación de servicios, Por plan de beneficios de salud"},"DsAfiliado":{"Afiliado":{"EstadoDescripcion":"Afiliado","TipoDocAfiliado":"CC","TipoDocEmpresa":"NI","TipoDocTrabajador":"CC","NombreDepartamento":"VALLE","NombreMunicipio":"YUMBO","TidTrabajador":"1","IDTrabajador":"16449455","Nombre":"MANUEL ANTONIO","PrimerApellido":"SALCEDO","SegundoApellido":"POVEDA","FechaNacimiento":"1961-02-04T00:00:00","Estrato":"1","Sexo":"M","IDEmpresa":"830511993","TidEmpresa":"2","SedeCapita":"SERSALUD S.A - SEDE YUMBO","IdAfiliado":"16449455","TIdAfiliado":"1","FechaAfiliacion":"2019-07-08T00:00:00","Estado":"0","IdEntidad":"12","Direccion":"CL 1 B ESTE 3CU 03","Telefono":"6933873","NombreEmpresa":"NUCLEO S.A","Telefono2":{},"IdCapita":"805025846","IdMunicipio":"76892","EstadoCivil":"SO","IdUnico":"6052103532445721","email":{},"FechaAfiliacionSSS":{},"Programa":"EP","IdPrograma":"121201","DescripcionPrograma":"Dependiente","IdRegional":"16","DiasCotizados":{},"IdArp":"15","IdDiscapacidad":{},"DirEmpresa":"CR 12 8 46","IdHistoria09":{},"IdHistoria12":"101658249","FechaDesafiliacion":"0","IdConyuge":"6089933260318791","CabezaFamilia":"S","NombreTrabajador":"MANUEL ANTONIO SALCEDO POVEDA","Principal":"S","IdBarrio":"0","FechaRetiro":"0","PorcentajeDescuento":{},"TipoDescuento":{},"IdIpsCapita":"16007","SemCotSSS":"0","ClaseAfiliacion":"COT","CodigoRegional":"16"}},"DsSede":{"Sede":[{"NitEntidad":"805026250","Descripcion":"CL.SIGMA S.YUMBO"},{"NitEntidad":"890307534","Descripcion":"OPTOMETRIA YUMBO"}],"SedeAtencion":{"IdSedeAtencion":"805025846","SedeAtencion":"SERSALUD S.A - SEDE YUMBO","CodSedeAtencion":"16007"}},"DsGrupoFamiliar":{"Beneficiario":[{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"16449455","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"MANUEL ANTONIO","PrimerApellido":"SALCEDO","SegundoApellido":"POVEDA","Sexo":"M","TidTrabajador":"1","IDTrabajador":"16449455"},{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"29820286","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"OLGA DORA","PrimerApellido":"PATINO","SegundoApellido":"QUINTERO","Sexo":"F","TidTrabajador":"1","IDTrabajador":"16449455"},{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"TI","TIdBeneficiario":"3","IDBeneficiario":"1104825934","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"JHON STEVEN","PrimerApellido":"GIRALDO","SegundoApellido":"PATINO","Sexo":"M","TidTrabajador":"1","IDTrabajador":"16449455"},{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"1118308000","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"JUAN CARLOS","PrimerApellido":"AGUIRRE","SegundoApellido":"PATINO","Sexo":"M","TidTrabajador":"1","IDTrabajador":"16449455"}]}}}}}}';
       //  return '{"responseMessageOut":{"header":{"invokerDateTime":"2020-07-28 15:56:11","moduleId":"CHATBOTEPS","systemId":"CHATBOTEPS","messageId":"CHATBOTEPS |29361924|CC","logginData":{"sourceSystemId":"NA","destinationSystemId":"NA"},"destination":{"namespace":"http:\/\/co\/com\/comfenalcovalle\/esb\/ws\/ValidadorServiciosEps","name":"ValidadorServiciosEps","operation":"execute"},"responseStatus":{"statusCode":"SUCCESS"}},"body":{"response":{"validadorResponse":{"xsi":"http:\/\/www.w3.org\/2001\/XMLSchema-instance","Derechos":{"DerechoPrestacion":"SI","Programa":"EP","DescripcionPrograma":"Por plan de beneficios de salud","MENSAJE":"El usuario con tipo CC y numero 29361924 SI tiene derecho a prestación de servicios, Por plan de beneficios de salud"},"DsAfiliado":{"Afiliado":{"EstadoDescripcion":"Afiliado","TipoDocAfiliado":"CC","TipoDocEmpresa":{},"TipoDocTrabajador":"CC","NombreDepartamento":"VALLE","NombreMunicipio":"CALI","TidTrabajador":"1","IDTrabajador":"29361924","Nombre":"CATHERINE MIGRETH","PrimerApellido":"SANCHEZ","SegundoApellido":"CASANOVA","FechaNacimiento":"1982-02-26T00:00:00","Estrato":"1","Sexo":"F","IDEmpresa":{},"TidEmpresa":{},"SedeCapita":"MODELO DE ATENCION DE SALUD SERVIMEDIC QUIRON LTDA","IdAfiliado":"29361924","TIdAfiliado":"1","FechaAfiliacion":"2020-07-17T00:00:00","Estado":"0","IdEntidad":"12","Direccion":"CR 98 A 42 85","Telefono":"3276471","NombreEmpresa":{},"Telefono2":{},"IdCapita":"900014785","IdMunicipio":"76001","EstadoCivil":"SO","IdUnico":"9999022619351478","email":"CATHESTEVEN@HOTMAIL.COM","FechaAfiliacionSSS":{},"Programa":"EP","IdPrograma":"121259","DescripcionPrograma":"Independiente Contrato de Prestación","IdRegional":"1","DiasCotizados":{},"IdArp":{},"IdDiscapacidad":{},"DirEmpresa":{},"IdHistoria09":{},"IdHistoria12":"158551","FechaDesafiliacion":"0","IdConyuge":{},"CabezaFamilia":{},"NombreTrabajador":"CATHERINE MIGRETH SANCHEZ CASANOVA","Principal":"S","IdBarrio":"0","FechaRetiro":"0","PorcentajeDescuento":{},"TipoDescuento":{},"IdIpsCapita":"14029","SemCotSSS":"0","ClaseAfiliacion":"COT","CodigoRegional":"1"}},"DsSede":{"Sede":[{"NitEntidad":"800168722","Descripcion":"LA OPTICA S.SUR"},{"NitEntidad":"805023423","Descripcion":"SEDE SUR - SERVIQUIRON"},{"NitEntidad":"890307534","Descripcion":"OPTOMETRIA S.SUR"},{"NitEntidad":"900014785","Descripcion":"SERVIMEDIC QUIRON"},{"NitEntidad":"900127525","Descripcion":"CIC-VITAL S.SUR"}],"SedeAtencion":{"IdSedeAtencion":"900014785","SedeAtencion":"MODELO DE ATENCION DE SALUD SERVIMEDIC QUIRON LTDA","CodSedeAtencion":"14029"}},"DsGrupoFamiliar":{"Beneficiario":[{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"29361924","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"CATHERINE MIGRETH","PrimerApellido":"SANCHEZ","SegundoApellido":"CASANOVA","Sexo":"F","TidTrabajador":"1","IDTrabajador":"29361924"},{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"RC","TIdBeneficiario":"7","IDBeneficiario":"1108259584","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"MATHIAS ","PrimerApellido":"RAMIREZ","SegundoApellido":"SANCHEZ","Sexo":"M","TidTrabajador":"1","IDTrabajador":"29361924"}]}}}}}}';
        //respuesta varios
       /*return '{
            "responseMessageOut": {
                "header": {
                    "invokerDateTime": "2020-07-26 10:46:54",
                    "moduleId": "CHATBOTEPS",
                    "systemId": "CHATBOTEPS",
                    "messageId": "CHATBOTEPS |16626278|CC",
                    "logginData": {
                        "sourceSystemId": "NA",
                        "destinationSystemId": "NA"
                    },
                    "destination": {
                        "namespace": "http://co/com/comfenalcovalle/esb/ws/ValidadorServiciosEps",
                        "name": "ValidadorServiciosEps",
                        "operation": "execute"
                    },
                    "responseStatus": {
                        "statusCode": "SUCCESS"
                    }
                },
                "body": {
                    "response": {
                        "validadorResponse": {
                            "xsi": "http://www.w3.org/2001/XMLSchema-instance",
                            "Derechos": {
                                "DerechoPrestacion": "SI",
                                "Programa": "EP",
                                "DescripcionPrograma": "Por plan de beneficios de salud",
                                "MENSAJE": "El usuario con tipo CC y numero 16626278 SI tiene derecho a prestaciÃ³n de servicios, Por plan de beneficios de salud"
                            },
                            "DsAfiliado": {
                                "Afiliado": [
                                    {
                                        "EstadoDescripcion": "Afiliado",
                                        "TipoDocAfiliado": "CC",
                                        "TipoDocEmpresa": "NI",
                                        "TipoDocTrabajador": "CC",
                                        "NombreDepartamento": "VALLE",
                                        "NombreMunicipio": "CALI",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278",
                                        "Nombre": "JUAN CARLOS",
                                        "PrimerApellido": "LUNA",
                                        "SegundoApellido": "CUELLAR",
                                        "FechaNacimiento": "1959-03-20T00:00:00",
                                        "Estrato": "2",
                                        "Sexo": "M",
                                        "IDEmpresa": "900336004",
                                        "TidEmpresa": "2",
                                        "SedeCapita": "MODELO DE ATENCION DE SALUD CIS EMCALI",
                                        "IdAfiliado": "16626278",
                                        "TIdAfiliado": "1",
                                        "FechaAfiliacion": "2019-09-01T00:00:00",
                                        "Estado": "0",
                                        "IdEntidad": "12",
                                        "Direccion": "CL 20 118 235 T2 APT 508",
                                        "Telefono": "3396742",
                                        "NombreEmpresa": "ADMINISTRADORA COLOMBIANA DE PENSIONES COLPENSIONES",
                                        "Telefono2": {},
                                        "IdCapita": "890303093",
                                        "IdMunicipio": "76001",
                                        "EstadoCivil": "CA",
                                        "IdUnico": "9999022619003651",
                                        "email": "JCLUNA57@HOTMAIL.COM",
                                        "FechaAfiliacionSSS": {},
                                        "Programa": "EP",
                                        "IdPrograma": "121205",
                                        "DescripcionPrograma": "Pensionado",
                                        "IdRegional": "1",
                                        "DiasCotizados": {},
                                        "IdArp": {},
                                        "IdDiscapacidad": {},
                                        "DirEmpresa": "CRA 10 N 72  33 TO B",
                                        "IdHistoria09": {},
                                        "IdHistoria12": "179870",
                                        "FechaDesafiliacion": "0",
                                        "IdConyuge": "9999022620123312",
                                        "CabezaFamilia": "S",
                                        "NombreTrabajador": "JUAN CARLOS LUNA CUELLAR",
                                        "Principal": "S",
                                        "IdBarrio": "0",
                                        "FechaRetiro": "0",
                                        "PorcentajeDescuento": {},
                                        "TipoDescuento": {},
                                        "IdIpsCapita": "2024",
                                        "SemCotSSS": "1152",
                                        "ClaseAfiliacion": "COT",
                                        "CodigoRegional": "1"
                                    },
                                    {
                                        "EstadoDescripcion": "Afiliado",
                                        "TipoDocAfiliado": "CC",
                                        "TipoDocEmpresa": {},
                                        "TipoDocTrabajador": "CC",
                                        "NombreDepartamento": "VALLE",
                                        "NombreMunicipio": "CALI",
                                        "IDEmpresa": "N/A",
                                        "TidEmpresa": "N/A",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278",
                                        "Nombre": "JUAN CARLOS",
                                        "PrimerApellido": "LUNA",
                                        "SegundoApellido": "CUELLAR",
                                        "FechaNacimiento": "1959-03-20T00:00:00",
                                        "Estrato": "2",
                                        "Sexo": "M",
                                        "SedeCapita": "MODELO DE ATENCION DE SALUD CIS EMCALI",
                                        "IdAfiliado": "16626278",
                                        "TIdAfiliado": "1",
                                        "FechaAfiliacion": "2020-01-29T00:00:00",
                                        "Estado": "0",
                                        "IdEntidad": "12",
                                        "Direccion": "CL 20 118 235 T2 APT 508",
                                        "Telefono": "3396742",
                                        "Telefono2": {},
                                        "IdCapita": "890303093",
                                        "IdMunicipio": "76001",
                                        "EstadoCivil": "CA",
                                        "IdUnico": "9999022619003651",
                                        "email": "JCLUNA57@HOTMAIL.COM",
                                        "FechaAfiliacionSSS": {},
                                        "Programa": "EP",
                                        "IdPrograma": "121259",
                                        "DescripcionPrograma": "Independiente Contrato de PrestaciÃ³n",
                                        "IdRegional": "2",
                                        "DiasCotizados": {},
                                        "IdArp": {},
                                        "IdDiscapacidad": {},
                                        "IdHistoria09": {},
                                        "IdHistoria12": "179870",
                                        "FechaDesafiliacion": "0",
                                        "IdConyuge": "9999022620123312",
                                        "CabezaFamilia": "S",
                                        "NombreTrabajador": "JUAN CARLOS LUNA CUELLAR",
                                        "Principal": "S",
                                        "IdBarrio": "0",
                                        "FechaRetiro": "0",
                                        "PorcentajeDescuento": {},
                                        "TipoDescuento": {},
                                        "IdIpsCapita": "2024",
                                        "SemCotSSS": "1152",
                                        "ClaseAfiliacion": "COT",
                                        "CodigoRegional": "2"
                                    }
                                ]
                            },
                            "DsSede": {
                                "Sede": [
                                    {
                                        "NitEntidad": "800168722",
                                        "Descripcion": "LA OPTICA EMCALI"
                                    },
                                    {
                                        "NitEntidad": "890307534",
                                        "Descripcion": "OPTOMETRIA EMCALI"
                                    },
                                    {
                                        "NitEntidad": "900127525",
                                        "Descripcion": "CIC-VITAL EMCAL"
                                    },
                                    {
                                        "NitEntidad": "900612531",
                                        "Descripcion": "SEDE EMCALI"
                                    }
                                ],
                                "SedeAtencion": {
                                    "IdSedeAtencion": "890303093",
                                    "SedeAtencion": "MODELO DE ATENCION DE SALUD CIS EMCALI",
                                    "CodSedeAtencion": "2024"
                                }
                            },
                            "DsGrupoFamiliar": {
                                "Beneficiario": [
                                    {
                                        "TipoDocTrabajador": "CC",
                                        "TipoDocBeneficiario": "CC",
                                        "TIdBeneficiario": "1",
                                        "IDBeneficiario": "16626278",
                                        "EstadoCaja": "NA",
                                        "EstadoPOS": "AF",
                                        "EstadoPCO": "NA",
                                        "Nombre": "JUAN CARLOS",
                                        "PrimerApellido": "LUNA",
                                        "SegundoApellido": "CUELLAR",
                                        "Sexo": "M",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278"
                                    },
                                    {
                                        "TipoDocTrabajador": "CC",
                                        "TipoDocBeneficiario": "CC",
                                        "TIdBeneficiario": "1",
                                        "IDBeneficiario": "30038121",
                                        "EstadoCaja": "NA",
                                        "EstadoPOS": "AF",
                                        "EstadoPCO": "NA",
                                        "Nombre": "MARIA ELENA",
                                        "PrimerApellido": "MARTINEZ",
                                        "SegundoApellido": {},
                                        "Sexo": "F",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278"
                                    },
                                    {
                                        "TipoDocTrabajador": "CC",
                                        "TipoDocBeneficiario": "CC",
                                        "TIdBeneficiario": "1",
                                        "IDBeneficiario": "31915457",
                                        "EstadoCaja": "NA",
                                        "EstadoPOS": "AF",
                                        "EstadoPCO": "NA",
                                        "Nombre": "PATRICIA ",
                                        "PrimerApellido": "MARTINEZ",
                                        "SegundoApellido": {},
                                        "Sexo": "F",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278"
                                    },
                                    {
                                        "TipoDocTrabajador": "CC",
                                        "TipoDocBeneficiario": "TI",
                                        "TIdBeneficiario": "3",
                                        "IDBeneficiario": "1006100013",
                                        "EstadoCaja": "NA",
                                        "EstadoPOS": "AF",
                                        "EstadoPCO": "NA",
                                        "Nombre": "MARIA JULIANA",
                                        "PrimerApellido": "LUNA",
                                        "SegundoApellido": "MARTINEZ",
                                        "Sexo": "F",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278"
                                    },
                                    {
                                        "TipoDocTrabajador": "CC",
                                        "TipoDocBeneficiario": "CC",
                                        "TIdBeneficiario": "1",
                                        "IDBeneficiario": "1144057372",
                                        "EstadoCaja": "NA",
                                        "EstadoPOS": {},
                                        "EstadoPCO": "NA",
                                        "Nombre": "ANA MARIA",
                                        "PrimerApellido": "LUNA",
                                        "SegundoApellido": "MARTINEZ",
                                        "Sexo": "F",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278"
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }';*/
        
        if ($numeroIdentificacion == "" || $tipoDocumento == "") {
            echo json_encode('error');
        }
        else{
                $hoy = date("Y-m-d H:i:s"); 
               
                $host = "https://virtual.comfenalcovalle.com.co/esbtest/V2RESTJSONChannelAdapter";
                $username = "INGENIOSE";
                $password = "1nG3n1o5e";
        
                $headers = array(
                    'Content-type: charset=iso-8859-1; charset=utf-8',
                    'Authorization: Basic '. base64_encode("$username:$password")
                );
                $payload = '{
                    "requestMessageOut": {
                    "header": {
                        "invokerDateTime": "'.$hoy.'",
                        "moduleId": "CHATBOTEPS",
                        "systemId": "CHATBOTEPS",
                        "messageId": "CHATBOTEPS |'.$numeroIdentificacion.'|'.$tipoDocumento.'",
                        "logginData": {
                        "sourceSystemId": "NA",
                        "destinationSystemId": "NA"
                        },
                        "destination": {
                        "namespace": "http://co/com/comfenalcovalle/esb/ws/ValidadorServiciosEps",
                        "name": "ValidadorServiciosEps",
                        "operation": "execute"
                        },
                        "securityCredential": {
                        "userName": "",
                        "userToken": ""
                        },
                        "classification": ""
                    },
                    "body": {
                        "request": {
                        "validadorRequest": {
                            "abreviatura":"'.$tipoDocumento.'",
                            "identificacion": "'.$numeroIdentificacion.'"
                        }
                        }
                    }
                    }
                }';
                //dd($payload);
                header("Content-type: charset=iso-8859-1");
                $process = curl_init($host);
                curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                curl_setopt($process, CURLOPT_HEADER, 0);
                curl_setopt($process, CURLOPT_USERPWD, $username . ":" . $password);
                curl_setopt($process, CURLOPT_TIMEOUT, 30);
                curl_setopt($process, CURLOPT_POST, 1);
                curl_setopt($process, CURLOPT_POSTFIELDS, $payload);
                curl_setopt($process, CURLOPT_ENCODING, "UTF-8" );
                curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                $return = curl_exec($process);
                
                curl_close($process);
            
                //finally print your API response
                return utf8_encode($return);
        }
    }
}
