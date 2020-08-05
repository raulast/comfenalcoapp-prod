<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Diasmax extends Model
{
    //
    public $timestamps = false;
    protected $table = 'dias_max_especialidad';
    protected $fillable = [
        'especialidad','dias_maximos'
    ];
}
