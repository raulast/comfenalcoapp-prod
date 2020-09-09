<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJudicialesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('judiciales', function (Blueprint $table) {
            //
            $table->bigIncrements('id');
            $table->string('fecha_de_recepcion_juzgado')->nullable();
            $table->string('numero_radicacion_juzgado')->nullable();
            $table->string('aux_apoyo_pemel')->nullable();
            $table->string('tipo_de_accion_juridica')->nullable();
            $table->string('fecha_notificacion_a_juridico_1')->nullable();
            $table->string('año_notif')->nullable();
            $table->string('mes_notif')->nullable();
            $table->string('hora_notificacion_a_juridico')->nullable();
            $table->string('solicitud_apoyo_pemel_fecha')->nullable();
            $table->string('solicitud_apoyo_pemel_hora')->nullable();
            $table->string('pemel_vencimiento_entrega_apoyo_fecha')->nullable();
            $table->string('pemel_vencimiento_entrega_apoyo_hora')->nullable();
            $table->string('entrega_apoyo_fecha')->nullable();
            $table->string('entrega_apoyo_hora')->nullable();
            $table->string('año_solicitud_apoyo')->nullable();
            $table->string('mes_solicitud_apoyo')->nullable();
            $table->string('vencimiento_respuesta_juridico')->nullable();
            $table->string('dias_limite_apoy')->nullable();
            $table->string('dias_tiempo_respuesta_apoy')->nullable();
            $table->string('dias_cumplimiento_apoy')->nullable();
            $table->string('marca_oportunidad_apoy')->nullable();
            $table->string('clasificacion_dias_tiempo_resp_apoy')->nullable();
            $table->string('cumpl_apoyo_vs_venc_resp_juridica')->nullable();
            $table->string('marca_oportunidad_a_juridico')->nullable();
            $table->string('tiempo_reporte_a_pemel')->nullable();
            $table->string('clasificacion_dias_tiempo_reporte_pemel')->nullable();
            $table->string('dias_de_notif_juridico_vs_vencim_juridico')->nullable();
            $table->string('difer')->nullable();
            $table->string('nombre_abogado_eps')->nullable();
            $table->string('nombre_demandante')->nullable();
            $table->string('nit_demandante')->nullable();
            $table->string('descripcion_juzgado')->nullable();
            $table->string('tipo_juzgado')->nullable();
            $table->string('temeridad')->nullable();
            $table->string('area')->nullable();
            $table->string('motivo_de_accion')->nullable();
            $table->string('regimen_del_usuario')->nullable();
            $table->string('tipo_cotizante_demandante')->nullable();
            $table->string('municipio')->nullable();
            $table->string('ips_asignacion_usuario')->nullable();
            $table->string('nombre_aportante')->nullable();
            $table->string('nit_aportante')->nullable();
            $table->string('nombre_apellidos_usuario')->nullable();
            $table->string('nit_usuario')->nullable();
            $table->string('estado_de_la_notificacion')->nullable();
            $table->string('cobertura_de_tutela')->nullable();
            $table->string('pronunciamiento_eps')->nullable();
            $table->string('fecha_de_fallo')->nullable();
            $table->string('fecha_notificacion_fallo_a_eps')->nullable();
            $table->string('fecha_notificacion_fallo_a_pemel')->nullable();
            $table->string('sujeto_de_pago')->nullable();
            $table->string('decision_juzgado_1_instancia_impacto_eps')->nullable();
            $table->string('fecha_cumplimiento_fallo')->nullable();
            $table->string('fecha_vencimiento_fallo')->nullable();
            $table->string('observacion_cumplimiento_fallo')->nullable();
            $table->string('decision_a_tomar_impugnar_post_fallo')->nullable();
            $table->string('fecha_impugnacion')->nullable();
            $table->string('quien_toma_desicion')->nullable();
            $table->string('fecha_fallo_segunda_instancia')->nullable();
            $table->string('fecha_notificacion_a_juridico_2')->nullable();
            $table->string('fecha_entrega_fallo_2da_insta_a_pemel')->nullable();
            $table->string('decision_segunda_instancia')->nullable();
            $table->string('desisicon_final_ajustada_impacto_eps')->nullable();
            $table->string('actividad_a_realizar_segun_fallo')->nullable();
            $table->string('fecha_cumplimiento_fallo_2da_instancia')->nullable();
            $table->string('costo_de_prestacion_economica')->nullable();
            $table->string('numero_radicado_requerimiento_1_supersalud')->nullable();
            $table->string('fecha_requerimientos_1')->nullable();
            $table->string('año_req_1')->nullable();
            $table->string('mes_req_1')->nullable();
            $table->string('fecha_entrega_pemel_requerimiento_1')->nullable();
            $table->string('fecha_soporte_requerimiento_1')->nullable();
            $table->string('fecha_cumplimiento_requerimiento_1')->nullable();
            $table->string('observacion_requerimiento_1')->nullable();
            $table->string('numero_radicado_requerimiento_2_supersalud')->nullable();
            $table->string('fecha_requerimiento_2')->nullable();
            $table->string('año_req_2')->nullable();
            $table->string('mes_req_2')->nullable();
            $table->string('fecha_entrega_pemel_requerimiento_2')->nullable();
            $table->string('fecha_soporte_requerimiento_2')->nullable();
            $table->string('fecha_cumplimiento_requerimiento_2')->nullable();
            $table->string('observacion_requerimiento_2')->nullable();
            $table->string('fecha_incidente_o_primer_requerimiento_desacato_1')->nullable();
            $table->string('año_desac_1')->nullable();
            $table->string('mes_desca_1')->nullable();
            $table->string('fecha_notificacion_juridico_3')->nullable();
            $table->string('fecha_entrega_pemel_desacato_1')->nullable();
            $table->string('fecha_soporte_desacato_1')->nullable();
            $table->string('fecha_cumplimiento_desacato_1')->nullable();
            $table->string('fecha_cierre_desacato_1')->nullable();
            $table->string('tipo_sancion_no_cumplimiento_fallo_desacato_mas_requrimiento')->nullable();
            $table->string('magnitud_sancion_arresto_dias_1')->nullable();
            $table->string('magnitud_sancion_1')->nullable();
            $table->string('fecha_requerimiento_o_desacato_2')->nullable();
            $table->string('año_desac_2')->nullable();
            $table->string('mes_desca_2')->nullable();
            $table->string('fecha_notificacion_juridico_4')->nullable();
            $table->string('fecha_entrega_pemel_desacato_2')->nullable();
            $table->string('fecha_soporte_desacato_2')->nullable();
            $table->string('fecha_cumplimiento_desacato_2')->nullable();
            $table->string('fecha_cierre_desacato_2')->nullable();
            $table->string('tipo_sancion_no_cumplimiento_fallo_desacato_2')->nullable();
            $table->string('magnitud_sancion_arresto_dias_2')->nullable();
            $table->string('magnitud_sancion_desacato')->nullable();
            $table->string('fecha_sancion')->nullable();
            $table->string('año_sancion')->nullable();
            $table->string('mes_sancion')->nullable();
            $table->string('fecha_notificacion_sancion_a_jur')->nullable();
            $table->string('fecha_notificacion_sancion_a_pemel')->nullable();
            $table->string('fecha_soporte_sancion')->nullable();
            $table->string('magnitud_sancion_arresto_dias_3')->nullable();
            $table->string('magnitud_sancion_2')->nullable();
            $table->string('cierre_sancion')->nullable();
            $table->string('observacion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('judiciales');
    }
}
