<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medico extends Model
{
    //
    protected $fillable = [
        'user_id', 'cod_medico','nombre','tipo_documento','num_documento',
        'reg_medico','especialidad'
    ];
}
