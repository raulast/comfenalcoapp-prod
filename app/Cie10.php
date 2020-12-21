<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Cie10 extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    //
    /*
    'descripcion_diagnostico','estado','num_dias_maximo_solicitud',
        'dias_maximo_evento','capitulo_grupo','categoria_subgrupo',
        'contingencia','tipo_licencia','genero_comfe','cie_min_salud',
        'genero_minsalud','limite_edad_inferior_minsalud',
        'limite_edad_maxima_minsalud','tipo_diagnostico','aplica_notificacion',
        'opcion_liquidacion','diagnostico_centinela','indicio_at_el',
        'observacion1','observacion2','observacion3','observacion4','codigo'

        */
    protected $table = 'cie10';
    public $timestamps = false;
    protected $fillable = [
        'codigo','descripcion_diagnostico','estado','num_dias_maximo_solicitud',
        'dias_maximo_evento','capitulo_grupo','categoria_subgrupo',
        'contingencia','tipo_licencia','genero_comfe','cie_min_salud',
        'genero_minsalud','limite_edad_inferior_minsalud',
        'limite_edad_maxima_minsalud','tipo_diagnostico','aplica_notificacion',
        'opcion_liquidacion','diagnostico_centinela','indicio_at_el',
        'observacion1','observacion2','observacion3','observacion4'
    ];
}
