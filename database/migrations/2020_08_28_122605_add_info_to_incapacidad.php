<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInfoToIncapacidad extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('incapacidad', function (Blueprint $table) {
            $table->string('nombre_afiliado')->after('num_documento_afiliado');
            $table->string('estado_afiliado')->after('nombre_afiliado');
            $table->string('tipo_cotizante')->after('estado_afiliado');
            $table->string('programa_afiliado')->after('tipo_cotizante');
            $table->longText('aportantes')->after('programa_afiliado');
            $table->longText('validacion')->after('observacion_estado');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('incapacidad', function (Blueprint $table) {
            //
            $table->dropColumn(['nombre_afiliado']);
            $table->dropColumn(['estado_afiliado']);
            $table->dropColumn(['tipo_cotizante']);
            $table->dropColumn(['programa_afiliado']);
            $table->dropColumn(['aportantes']);
            $table->dropColumn(['validacion']);
        });
    }
}
