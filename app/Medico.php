<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Medico extends Model
{
    use SoftDeletes;
    //
    protected $fillable = [
        'user_id', 'cod_medico','nombre','tipo_documento','num_documento',
        'reg_medico','especialidad'
    ];
    public function incapacidades()
    {
        return $this->hasMany('App\Incapcidad');
    }


    public function user()
    {
        return $this->belongsTo('App\User', 'id', 'user_id');
    }

}
