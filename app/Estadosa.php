<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Estadosa extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
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
