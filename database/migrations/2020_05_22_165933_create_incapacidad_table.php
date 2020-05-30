<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIncapacidadTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incapacidad', function (Blueprint $table) {
            $table->integer('id');
            $table->integer('prorrogaid');
            $table->char('tipo_documento_afiliado',2);
            $table->string('num_documento_afiliado');
            $table->integer('tipo_prestador');
            $table->integer('ips');
            $table->integer('medico_id');
            $table->date('fecha_atencion');
            $table->integer('causa_externa');
            $table->char('codigo_diagnostico',5);
            $table->integer('lateralidad');
            $table->date('fecha_inicio_incapacidad');
            $table->integer('dias_solicitados');
            $table->integer('dias_reconocidos');
            $table->date('fecha_fin_incapacidad');
            $table->char('prorroga',2);
            $table->integer('dias_acumulados_previos');
            $table->integer('contingencia_origen');
            $table->integer('dias_acumulados_ultima_incapacidad');
            $table->longText('observacion');

            $table->index(['id', 'prorrogaid']);
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
        Schema::dropIfExists('incapacidad');
    }
}
