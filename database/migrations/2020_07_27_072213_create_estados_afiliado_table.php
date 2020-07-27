<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstadosAfiliadoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estados_afiliado', function (Blueprint $table) {
            $table->increments('id')->index();
            $table->string('estado');
            $table->integer('incapacidad');
            $table->integer('licencia');
            $table->integer('activo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estados_afiliado');
    }
}
