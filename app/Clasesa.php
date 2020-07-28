<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clasesa extends Model
{
    //
    //
    public $timestamps = false;
    protected $table = 'clases_afiliacion';
    protected $fillable = [
      'clase','abbr', 'activo'
    ];
    public function incapacidades()
    {
        return $this->hasMany('App\Incapacidades');
    }
    public function descripciones()
    {
        return $this->hasMany('App\Descripcionesp');
    }
}
