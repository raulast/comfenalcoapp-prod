<?php

namespace App\Exports;

use App\Incapacidad;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class IncapacidadExport implements FromCollection, WithHeadings, ShouldAutoSize
{
    /**
    * @return \Illuminate\Support\Collection
    */

 
 
    protected $incapacidades;
 
    public function __construct($incapacidades= null)
    {
        $this->incapacidades = $incapacidades;
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->incapacidades ?: Incapacidad::all();
        //return Inscripcion::all();
    }

    public function headings(): array
    {
        return [
             'id',
            'prorrogaid',
            'tipo_documento_afiliado',
            'num_documento_afiliado',
            'tipo_prestador',
            'ips',
            'medico_id',
            'fecha_atencion',
            'causa_externa',
            'codigo_diagnostico',
            'codigo_diagnostico1',
            'codigo_diagnostico2',
            'codigo_diagnostico3',
            'lateralidad',
            'fecha_inicio_incapacidad',
            'dias_solicitados',
            'dias_reconocidos',
            'fecha_fin_incapacidad',
            'prorroga',
            'dias_acumulados_previos',
            'contingencia_origen',
            'dias_acumulados_ultima_incapacidad',
            'observacion',
            'estado_id',
            'observacion_estado',
            'created_at',	
            'updated_at',
            'nombre_afiliado',
            'estado_afiliado',
            'tipo_cotizante',
            'programa_afiliado',
            'aportantes',
    
            'lateralidad1',
            'lateralidad2',
            'lateralidad3',
           
        ];
    }
}
