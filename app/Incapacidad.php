<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Incapacidad extends Model
{
    //
    protected $table = 'incapacidad';
    protected $fillable = [
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
    ];
}
