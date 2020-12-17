<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithMapping;
use DB;

class AuditsExport implements FromCollection, WithHeadings, ShouldAutoSize, WithStyles, WithMapping, WithColumnFormatting
{
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $audits;
    public $filter;

    public function __construct($audits= null, $filter=[])
    {
        $this->audits = $audits;
        $this->filter = $filter;

    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        ini_set('memory_limit','512M');
        return $this->audits?:$this->getAudits();
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text.
            1    => ['font' => ['bold' => true]],
        ];
    }

    public function columnFormats(): array
    {
        return [
            'D' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }

    public function map($invoice): array
    {
        return [
            $invoice->accion,
            $invoice->tabla_editada,
            $invoice->usuario,
            \PhpOffice\PhpSpreadsheet\Shared\Date::dateTimeToExcel(date_create($invoice->fecha)),
            $invoice->old_values,
            $invoice->new_values,
        ];
    }

    private function getAudits()
    {
        $f = $this->filter;
        if (!isset($f)&& !$f) {
            return [];
        }
        $modelos=[
            0=>"App\Causae",
            1=>"App\Clasesa",
            2=>"App\Descripcionesp",
            3=>"App\Diasmax",
            4=>"App\Estadosa",
            5=>"App\Estadosi",
            6=>"App\Ips",
            7=>"App\Medico",
            8=>"App\User",
            9=>"App\Cie10"
        ];
        $f['modelo']= is_string($f['modelo'])? (array)json_decode($f['modelo']):[0];
        $f['usuario']= is_string($f['usuario'])? (array)json_decode($f['usuario']):[0];
        foreach ($f['modelo'] as $key => $value) {
            $f['modelo'][$key] = $modelos[$value];
        }
        $audits = DB::table('audits')
        ->selectRaw(
            "case
                    when event = 'created' then 'Agregar'
                    when event = 'deleted' then 'Eliminar'
                    when event = 'updated' then 'Editar'
                    ELSE event
                END AS accion,
                case
                    when auditable_type = 'App\Causae' then 'Causas externas'
                    when auditable_type = 'App\Clasesa' then 'Clases de afiliacion'
                    when auditable_type = 'App\Descripcionesp' then 'Programas'
                    when auditable_type = 'App\Diasmax' then 'Dias maximos por especialidad'
                    when auditable_type = 'App\Estadosa' then 'Estados de afiliacion'
                    when auditable_type = 'App\Estadosi' then 'Estados en la generacion'
                    when auditable_type = 'App\Ips' then 'IPS'
                    when auditable_type = 'App\Medico' then 'Medicos'
                    when auditable_type = 'App\User' then 'Usuarios'
                    when auditable_type = 'App\Cie10' then  'CIE10'
                    ELSE auditable_type
                END AS tabla_editada,
                users.name as usuario,
                audits.created_at as fecha,
                old_values,
                new_values"
        )
        ->join('users','users.id','audits.user_id');
        $audits->whereIn('audits.user_id',$f['usuario']);
        $audits->whereIn('auditable_type',$f['modelo']);
        $audits->whereBetween('audits.created_at',[$f['desde'],$f['hasta']]);
        $rows = $audits->get();

        $datos = collect([]);
        foreach ($rows as $row) {
            $datos->push($row);
        }

        return $datos;
    }

    public function headings(): array
    {
        return [
            'ACCION',
            'TABLA EDITADA',
            'USUARIO',
            'FECHA',
            'VALOR ANTIGUO',
            'VALOR NUEVO'
            ];
    }
}
