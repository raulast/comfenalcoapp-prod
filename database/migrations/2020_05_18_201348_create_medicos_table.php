<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medicos', function (Blueprint $table) {
            $table->increments('id')->index();
            $table->foreignId('user_id')->references('id')->on('users');
            $table->integer('cod_medico');
            $table->string('nombre');
            $table->char('tipo_documento',2);
            $table->string('num_documento');
            $table->string('reg_medico');
            $table->integer('especialidad');
            $table->timestamps();

           
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medicos');
    }
}
