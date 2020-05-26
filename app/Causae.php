<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Causae extends Model
{
    //
    protected $table = 'causae';
    protected $fillable = [
        'causa_externa','estado'
    ];
}
