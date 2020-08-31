<?php


namespace App\Http\Controllers;
use App\Exports\IncapacidadExport;
use App\Exports\LicenciasExport;
use App\Exports\CronicosExport;
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
            if (($datos['desde']!="")&&($datos['hasta'])){
                $i->whereBetween('created_at', [$desde, $hasta]);
            }
            $totales=array();
            $totales["total"]=$i->count();
            $totales["dias"] = $i->sum('dias_solicitados');
            $i = $i->get();
            //dd($i);
            return Excel::download(new IncapacidadExport($i), 'incapacidades.xlsx');
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
            if (($datos['desde']!="")&&($datos['hasta'])){
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
    public function Incapacidades(Request $request){
        $i = Inscripcion::where('aceptado','si')->get();


        $inscripciones = array();

        if($request->actividad!=""){

                foreach($i as $in){
                    $a=$in->actividades;
                    $a = explode(",",$a);
                    foreach ($a as $aid){
                        if(intval($aid)==$request->actividad){
                            array_push($inscripciones,$in);
                        }
                    }       
                    
                }
                $inscripciones = collect($inscripciones);
        }
        else{
            $inscripciones1 = collect($i);
            $inscripciones = array();
            foreach ($inscripciones1 as $i){
                $a = $i->actividades;
                $i->actividades="";
                $a = explode(",",$a);
                    foreach ($a as $aid){
                        if(intval($aid)>0){
                            $nombre=Actividad::find($aid)->nombre;
                            if ($i->actividades==""){
                                $i->actividades=$nombre;
                            }
                            else{
                                $i->actividades=$i->actividades.",".$nombre;
                            }
                        }
                }  
                array_push($inscripciones,$i);  
            }
            $inscripciones = collect($inscripciones);
            //$inscripciones = $i;
        }
        //$inscripciones = Inscripcion::where('actividades','like','%'.$request->actividad.'%')->get();
        //return Excel::download(new InscripcionesExport, 'inscripciones.xlsx');
        return (new InscripcionesExport($inscripciones))->download('inscripciones.xlsx',\Maatwebsite\Excel\Excel::XLSX);
        //return (new ProductsExport($products))->download('products.tsv', \Maatwebsite\Excel\Excel::TSV);
      
    }
}
