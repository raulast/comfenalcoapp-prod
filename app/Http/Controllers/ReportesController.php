<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Incapacidad;
use App\Licencia;

class ReportesController extends Controller
{
    //
    public function index(){
        return view('reportes.reportes');
    }
    public function reportIncapacidades(Request $request){
        $datos = $request->datos;
        $desde = $datos['desde'];
        $hasta = $datos['hasta'];
        
        
        $i = Incapacidad::where('id','>',0);
        if ($datos['ips']!=""){
            $i->where('ips',$datos['ips']);
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
