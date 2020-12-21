<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Diasmax extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    //
    public $timestamps = false;
    protected $table = 'dias_max_especialidad';
    protected $fillable = [
        'especialidad','dias_maximos'
    ];
}
