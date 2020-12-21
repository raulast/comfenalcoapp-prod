<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Clasesa extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
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
