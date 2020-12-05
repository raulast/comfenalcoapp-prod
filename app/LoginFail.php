<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LoginFail extends Model
{
    use SoftDeletes;
    protected $table = 'login_fail';
    protected $fillable = [
        'user_id','intentos','session'
    ];


    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
