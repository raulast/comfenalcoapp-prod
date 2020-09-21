<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLateralidadIncapacidad extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('incapacidad', function (Blueprint $table) {
            //
            $table->integer('lateralidad1')->nullable();
            $table->integer('lateralidad2')->nullable();
            $table->integer('lateralidad3')->nullable();
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
            $table->dropColumn(['lateralidad1']);
            $table->dropColumn(['lateralidad2']);
            $table->dropColumn(['lateralidad3']);
        });
    }
}
