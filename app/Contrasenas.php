<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contrasenas extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
         'user_id', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    protected $dates = [
        'updated_at',
        'created_at',
    ];

    //relacion con usuarios
    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
