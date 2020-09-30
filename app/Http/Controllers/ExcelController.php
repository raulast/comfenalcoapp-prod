<?php


namespace App\Http\Controllers;
use App\Exports\IncapacidadExport;
use App\Exports\LicenciasExport;
use App\Exports\CronicosExport;
use App\Exports\JuridicasExport;
use Maatwebsite\Excel\Facades\Excel;

use App\Incapacidad;
use App\Licencia;

use PDF;
use DB;


use Illuminate\Http\Request;


class ExcelController extends Controller
{
    //
    public function export(Request $request){
        $datos = $request;
       
        if ($datos['export']=="incapacidad"){
            //dd($datos['ips']);
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
            if ($datos['codigoDiagnostico']!=""){
                $i->where('codigo_diagnostico',$datos['codigoDiagnostico']);
            }
            if ($datos['contingencia']!=""){
                $i->where('contingencia_origen',$datos['contingencia']);
            }
            if ($datos['soat']=="si"){
                $i->where('causa_externa',2);
            }
            if (($datos['desde']!="")&&($datos['hasta']!="")){
                $desde = $desde." 00:00:00";
                $hasta = $hasta." 11:59:59";
                $i->whereBetween('created_at', [$desde, $hasta]);
            }
            $totales=array();
            $totales["total"]=$i->count();
            $totales["dias"] = $i->sum('dias_solicitados');
            $i = $i->with('medico')->get()->toArray();
            
            $datos = collect([]);
            foreach ($i as $in){
                $in['medico_id']=$in["medico"]["nombre"];
                unset($in["medico"]);
                unset($in["validacion"]);
                $datos->push($in);
            }
            //$datos->push($i);
            //$datos->forget("validacion");
            //dd($datos);
            
            return Excel::download(new IncapacidadExport($datos), 'incapacidades.xlsx');
        }
        if ($datos['export']=="licencia"){
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
            if (($datos['desde']!="")&&($datos['hasta']!="")){
                $i->whereBetween('created_at', [$desde, $hasta]);
            }
            $totales=array();
            $totales["total"]=$i->count();
            $totales["dias"] = $i->sum('dias_solicitados');
            $i = $i->get();
            return Excel::download(new LicenciasExport($i), 'licencias.xlsx');

        }
    }
    public function exportCronicos(){
        return Excel::download(new CronicosExport, 'cronicos.xlsx');
    }
    public function exportJuridicas(){
        return Excel::download(new JuridicasExport, 'juridicas.xlsx');
    }

    
}
