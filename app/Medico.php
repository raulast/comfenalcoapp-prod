<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Medico extends Model implements Auditable
{
    use SoftDeletes;
    use \OwenIt\Auditing\Auditable;
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
