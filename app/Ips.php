<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ips extends Model
{
    //
    public $timestamps = false;
    protected $table = 'ips';
    protected $fillable = [
        'cod_sede', 'nombre_sede', 'estado','cod_habilitacion', 'direccion', 'telefono',
        'razon_social','nit'
    ];
   
}
