<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Causae extends Model implements Auditable
{
    //
    use \OwenIt\Auditing\Auditable;

    protected $table = 'causae';
    protected $fillable = [
        'causa_externa','estado'
    ];
    protected $auditTimestamps = true;
}
