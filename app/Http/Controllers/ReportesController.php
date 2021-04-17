<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Incapacidad;
use App\Licencia;
use DB;

class ReportesController extends Controller
{
    //
    public function index(){
        return view('reportes.reportes');
    }
    public function reportesips(){
        return view('reportes.reportesips');
    }
    public function reportIncapacidades(Request $request){
        $datos = $request->datos;
        $desde = $datos['desde'];
        $hasta = $datos['hasta'];


        $i = Incapacidad::select(
            'incapacidad.id',
            'prorrogaid',
            'fecha_atencion',
            'tipo_documento_afiliado',
            'num_documento_afiliado',
            'nombre_afiliado',
            'fecha_inicio_incapacidad',
            'fecha_fin_incapacidad',
            'dias_solicitados',
            'dias_reconocidos',
            'prorroga',
            'dias_acumulados_previos',
            'dias_acumulados_ultima_incapacidad',
            'contingencia_origen',
            DB::raw("CASE contingencia_origen
                    WHEN 1 THEN 'Enfermedad general'
                    WHEN 2 THEN 'Enfermedad laboral'
                    WHEN 3 THEN 'Accidente de trabajo'
                ELSE '' END AS descripcion_contingencia"),
            'codigo_diagnostico',
            'codigo_diagnostico1',
            'codigo_diagnostico2',
            'codigo_diagnostico3',
            'lateralidad',
            'tipo_prestador',
            DB::raw("CASE tipo_prestador
                    WHEN 1 THEN 'IPS'
                    WHEN 2 THEN 'Consultorio'
                ELSE '' END AS descripcion_tipo_prestador"),
            'incapacidad.ips',
            'ips.nit as NIT_IPS',
            'ips.nombre_sede as NOMBRE_IPS',
            'medicos.nombre as medico',
            DB::raw("CASE contingencia_origen
                    WHEN 1 THEN 'Médico general'
                    WHEN 2 THEN 'Médico especialista'
                    WHEN 3 THEN 'Odontólogo general'
                    WHEN 4 THEN 'Odontólogo especialista'
                ELSE '' END AS especialidad_medico"),
            'incapacidad.causa_externa',
            'causae.causa_externa as descripcion_causa_externa',
            'estado_afiliado',
            'tipo_cotizante',
            'programa_afiliado',
            'aportantes',
            'validacion as NombreEmpresa',
            'observacion',
            'estado_id',
            'estados_incapacidad.estado as estados_incapacidad',
            'observacion_estado',
            'incapacidad.created_at',
            'incapacidad.updated_at',
            'programa_afiliado as descripcion_programa_afiliado'
        )->leftJoin('ips','ips.id','=','incapacidad.ips')
        ->leftJoin('causae','causae.id','=','incapacidad.causa_externa')
        ->leftJoin('estados_incapacidad','estados_incapacidad.id','=','incapacidad.estado_id')
        ->leftJoin('medicos','medicos.id','=','incapacidad.medico_id')
        ->where('incapacidad.id','>',0);
        if ($datos['ips']!=""){
            $i->where('incapacidad.ips',$datos['ips']);
        }
        if ($datos['medico']!=""){
            $i->where('medico_id',$datos['medico']);
        }
        if ($datos['paciente']!=""){
            $i->where('num_documento_afiliado',$datos['paciente']);
        }
        if ($datos['empresa']!=""){
            $i->where('aportantes','like', '%'.$datos['empresa'].'%');
        }
        if ($datos['tipoCotizante']!=""){
            $i->where('programa_afiliado','like', '%'.$datos['tipoCotizante'].'%');
        }
        if ($datos['codigoDiagnostico']!=""){
            $i->where('codigo_diagnostico',$datos['codigoDiagnostico']);
        }
        if ($datos['contingencia']!=""){
            $i->where('contingencia_origen',$datos['contingencia']);
        }
        if ($datos['estado']!=""){
            $i->where('estado_id',$datos['estado']);
        }
        if ($datos['soat']=="si"){
            $i->where('causa_externa',2);
        }
        if (($datos['desde']!="")&&($datos['hasta'])){
            $desde = $desde." 00:00:00";
            $hasta = $hasta." 11:59:59";
            $i->whereBetween('created_at', [$desde, $hasta]);
        }
        $totales=array();
        $totales["total"]=$i->count();
        $totales["dias"] = $i->sum('dias_solicitados');
        $i = $i->get();
        foreach ($i as $key=>$incapacidad) {
            if (isset($incapacidad->NombreEmpresa)){
                try {
                    $afiliado = json_decode($incapacidad->NombreEmpresa);
                    $afiliado = isset($afiliado->responseMessageOut->body->response->validadorResponse->DsAfiliado->Afiliado)?
                    $afiliado->responseMessageOut->body->response->validadorResponse->DsAfiliado->Afiliado:null;
                    if(is_object($afiliado)){
                        $i[$key]->NombreEmpresa=isset($afiliado->NombreEmpresa)?$afiliado->NombreEmpresa:null;
                        $i[$key]->descripcion_programa_afiliado=isset($afiliado->DescripcionPrograma)?$afiliado->DescripcionPrograma:null;
                    }elseif (is_array($afiliado)) {
                        $NE=[];$DPA=[];
                        foreach ($afiliado as $value) {
                            if(isset($value->NombreEmpresa)){
                                $NE[] = $value->NombreEmpresa;
                            }
                            if(isset($value->DescripcionPrograma)){
                                $DPA[] = $value->DescripcionPrograma;
                            }
                        }
                        $i[$key]->NombreEmpresa=implode(', ',$NE);
                        $i[$key]->descripcion_programa_afiliado=implode(', ',$DPA);
                    }else{
                        $i[$key]->NombreEmpresa= null;
                    }
                } catch (\Throwable $th) {
                    $i[$key]->NombreEmpresa=null;
                }
            }
        }

       //$i = Incapacidad::first();
        return response()->json([
            'data' => $i,
            'totales'=>$totales

        ]);
    }
    public function reportLicencias(Request $request){
        $datos = $request->datos;
        $desde = $datos['desde'];
        $hasta = $datos['hasta'];


        $i = Licencia::where('id','>',0);
        if ($datos['ips']!=""){
            $i->where('ips',$datos['ips']);
        }
        if ($datos['medico']!=""){
            $i->where('medico_id',$datos['medico']);
        }
        if ($datos['paciente']!=""){
            $i->where('num_documento_afiliado',$datos['paciente']);
        }
        if ($datos['tipoLicencia']!=""){
            $i->where('tipo_licencia',$datos['tipoLicencia']);
        }
        /*
        if ($datos['codigoDiagnostico']!=""){
            $i->where('codigo_diagnostico',$datos['codigoDiagnostico']);
        }
        if ($datos['contingencia']!=""){
            $i->where('contingencia_origen',$datos['contingencia']);
        }
        if ($datos['soat']=="si"){
            $i->where('causa_externa',2);
        }*/
        if (($datos['desde']!="")&&($datos['hasta'])){
            $i->whereBetween('created_at', [$desde, $hasta]);
        }
        $totales=array();
        $totales["total"]=$i->count();
        $totales["dias"] = $i->sum('dias_solicitados');
        $i = $i->get();
       //$i = Incapacidad::first();
        return response()->json([
            'data' => $i,
            'totales'=>$totales

        ]);
    }
}
