<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLicenciasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('licencias', function (Blueprint $table) {
           
                $table->integer('id')->index();
               
                $table->char('tipo_documento_afiliado',2);
                $table->string('num_documento_afiliado');
                $table->string('nombre_afiliado');
                $table->string('estado_afiliado');
                $table->string('tipo_cotizante');
                $table->string('programa_afiliado');

                $table->integer('tipo_prestador');
                $table->integer('ips');
                $table->integer('medico_id');
               

                $table->integer('contingencia_origen');
                $table->date('fecha_atencion');
                $table->date('fecha_inicio_licencia');
                $table->integer('causa_externa');
                $table->integer('tipo_atencion');
                $table->integer('edad_gestacional_semanas');
                $table->integer('edad_gestacional_dias');
                $table->integer('dias_gestacion');
                $table->integer('recien_nacido_viable');
                $table->integer('tipo_licencia');

                $table->char('codigo_diagnostico',5);
                $table->char('codigo_diagnostico1',5)->nullable();
                $table->char('codigo_diagnostico2',5)->nullable();
                $table->char('codigo_diagnostico3',5)->nullable();
                
                $table->integer('dias_solicitados');
                $table->date('fecha_fin_licencia');
               
                $table->longText('observacion');
                $table->integer('estado_id');
                $table->longText('observacion_estado')->nullable();
                $table->timestamps();
                $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('licencias');
    }
}
