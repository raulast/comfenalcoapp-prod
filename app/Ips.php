<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Ips extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    //
    public $timestamps = false;
    protected $table = 'ips';
    protected $fillable = [
        'cod_sede', 'nombre_sede', 'estado','cod_habilitacion', 'direccion', 'telefono',
        'razon_social','nit'
    ];

}
