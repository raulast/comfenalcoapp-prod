<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDescripcionesProgramasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('descripciones_programas', function (Blueprint $table) {
            $table->increments('id')->index();
            $table->string('codigo');
            $table->foreignId('clases_afiliacion_id')->references('id')->on('clases_afiliacion');
            $table->string('descripcion');
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
        Schema::dropIfExists('descripciones_programas');
    }
}
