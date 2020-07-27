<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Descripcionesp extends Model
{
    //
    //
    public $timestamps = false;
    protected $table = 'descripciones_programas';
    protected $fillable = [
        'clases_afiliacion_id','descripcion','licencia','incapacidad', 'activo'
    ];
    public function incapacidades()
    {
        return $this->hasMany('App\Incapacidades');
    }
}
