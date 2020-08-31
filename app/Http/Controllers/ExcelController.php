<?php


namespace App\Http\Controllers;
use App\Exports\IncapacidadExport;
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
    public function export(){
        return Excel::download(new IncapacidadExport, 'incapacidades.xlsx');
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
