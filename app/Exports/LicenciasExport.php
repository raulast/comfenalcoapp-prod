<?php

namespace App\Exports;

use App\Licencias;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;


class LicenciasExport implements FromCollection, WithHeadings, ShouldAutoSize
{
    /**
    * @return \Illuminate\Support\Collection
    */

    protected $licencias;
 
    public function __construct($licencias= null)
    {
        $this->licencias = $licencias;
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->licencias ?: Licencias::all();
        //return Inscripcion::all();
    }

    public function headings(): array
    {
        return [
            'id',             
            'tipo_documento_afiliado',
            'num_documento_afiliado',
            'nombre_afiliado',
            'estado_afiliado',
            'tipo_cotizante',
            'programa_afiliado',
    
            'tipo_prestador',
            'ips',
            'medico_id',
           
    
            'contingencia_origen',
            'fecha_atencion',
            'fecha_inicio_licencia',
            'causa_externa',
            'tipo_atencion',
            'edad_gestacional_semanas',
            'edad_gestacional_dias',
            'dias_gestacion',
            'recien_nacido_viable',
            'tipo_licencia',
    
            'codigo_diagnostico',
            'codigo_diagnostico1',
            'codigo_diagnostico2',
            'codigo_diagnostico3',
            
            'dias_solicitados',
            'fecha_fin_licencia',
           
            'observacion',
            'estado_id',
            'observacion_estado',
            'created_at',	
            'updated_at',
            'delete_at',
            'aportantes',
            'validacion'
        ];
    }
}
