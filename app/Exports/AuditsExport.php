<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use DB;

class AuditsExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $audits;

    public function __construct($audits= null)
    {
        $this->audits = $audits;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        ini_set('memory_limit','512M');
        return $this->audits?:$this->getAudits();
    }

    private function getAudits()
    {
        $audits = DB::select("
            select
                case
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
                u.name as usuario,
                a.created_at as fecha,
                old_values,
                new_values

            from  audits a

            inner join users u on a.user_id = u.id

            where user_id in (26)

            and auditable_type in (
                'App\Causae',
                'App\Clasesa',
                'App\Descripcionesp',
                'App\Diasmax',
                'App\Estadosa',
                'App\Estadosi',
                'App\Ips',
                'App\Medico',
                'App\User'
            )

            and a.created_at between '2020-11-28 22:05:00' and '2020-11-30 22:05:50' ;
        ");
        return $audits;
    }
}
