<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estadosi extends Model
{
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
