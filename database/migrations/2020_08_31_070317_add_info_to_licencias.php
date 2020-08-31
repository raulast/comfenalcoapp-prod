<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInfoToLicencias extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('licencias', function (Blueprint $table) {
            //
            $table->longText('aportantes')->after('programa_afiliado')->nullable();
            $table->longText('validacion')->after('observacion_estado')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('licencias', function (Blueprint $table) {
            //
            $table->dropColumn(['aportantes']);
            $table->dropColumn(['validacion']);
        });
    }
}
