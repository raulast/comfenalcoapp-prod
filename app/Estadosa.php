<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estadosa extends Model
{
    //
    //
    public $timestamps = false;
    protected $table = 'estados_afiliado';
    protected $fillable = [
        'estado','incapacidad','licencia' ,'activo'
    ];
    public function incapacidades()
    {
        return $this->hasMany('App\Incapacidades');
    }
}
