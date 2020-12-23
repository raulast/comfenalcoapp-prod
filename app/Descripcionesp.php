<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Descripcionesp extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    //
    public $timestamps = false;
    protected $table = 'descripciones_programas';
    protected $fillable = [
        'clases_afiliacion_id','descripcion','codigo','licencia','incapacidad', 'activo'
    ];
    public function incapacidades()
    {
        return $this->hasMany('App\Incapacidades');
    }
    public function estado()
    {
        return $this->belongsTo('App\Clasea');
    }
}
