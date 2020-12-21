<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Estadosi extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    //
    public $timestamps = false;
    protected $table = 'estados_incapacidad';
    protected $fillable = [
        'estado', 'activo'
    ];
    public function incapacidades()
    {
        return $this->hasMany('App\Incapacidades');
    }
}
