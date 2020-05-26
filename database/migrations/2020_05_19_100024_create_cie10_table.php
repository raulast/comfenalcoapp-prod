<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCie10Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cie10', function (Blueprint $table) {

            $table->increments('id');
            $table->char('codigo',10);
            $table->string('descripcion_diagnostico');
            $table->integer('estado');
            $table->integer('num_dias_maximo_solicitud')->default(0);
            $table->integer('dias_maximo_evento')->default(0);
            $table->integer('capitulo_grupo');
            $table->integer('categoria_subgrupo');
            $table->integer('contingencia');
            $table->integer('tipo_licencia')->nullable();
            $table->char('genero_comfe',1);
            $table->char('cie_min_salud',2);
            $table->char('genero_minsalud',1)->nullable();
            $table->char('limite_edad_inferior_minsalud',4)->nullable();
            $table->char('limite_edad_maxima_minsalud',4)->nullable();
            $table->integer('tipo_diagnostico');
            $table->char('aplica_notificacion',1);
            $table->char('opcion_liquidacion',1);
            $table->char('diagnostico_centinela',1);
            $table->char('indicio_at_el',1)->nullable();
            $table->mediumText('observacion1')->nullable();
            $table->mediumText('observacion2')->nullable();
            $table->mediumText('observacion3')->nullable();
            $table->mediumText('observacion4')->nullable();


           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cie10');
    }
}
