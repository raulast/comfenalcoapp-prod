<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCronicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cronicos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('consecutivo')->nullable();
            $table->string('numero_notificacion')->nullable();
            $table->date('fecha_notificacion')->nullable();
      
            $table->string('municipio')->nullable();
            $table->string('codigo_municipio')->nullable();
            $table->string('tipo_identifica_aportante')->nullable();
            $table->string('nit_aportante')->nullable();
            $table->string('nombre_aportante')->nullable();
            $table->string('nit_ips_primaria')->nullable();
            $table->string('nombre_ips')->nullable();
            $table->string('nombre_1_usuario')->nullable();
            $table->string('nombre_2_usuario')->nullable();
            $table->string('apellido_1_usuario')->nullable();
            $table->string('apellido_2_usuario')->nullable();
            $table->string('tipo_nit_usuario')->nullable();
            $table->string('nit_usuario')->nullable();
            
            
            $table->integer('dias_acumulados_a_identificacion_caso')->nullable();
            $table->date('fecha_acumulados_fin_indetificacion')->nullable();
            $table->string('estado_afiliado')->nullable();
            $table->string('tipo_afiliado')->nullable();
            $table->integer('codigo_tipo_afiliado')->nullable();
            $table->string('nombre_medico_laboral')->nullable();
            $table->string('licencia_ml')->nullable();
            $table->date('fecha_ultima_cita')->nullable();
            $table->string('cdgo_arl')->nullable();
            $table->string('nombre_arl')->nullable();
            $table->string('cdgo_afp')->nullable();
            $table->string('nombre_afp')->nullable();
            $table->string('tipo_seguimiento')->nullable();
            $table->string('estado_seguimiento')->nullable();
            $table->string('motivo_estado_seguimiento')->nullable();
            $table->date('fecha_cierre')->nullable();
            $table->string('cie_10_evento_seguimiento')->nullable();
            $table->string('descripcion_cie_10')->nullable();
            $table->string('contingencia_origen_inicial',2)->nullable();
            $table->date('fecha_it_inicio_ciclo')->nullable();
            $table->date('fecha_inicio_ultima_it')->nullable();
            $table->date('fecha_fin_ultima_it')->nullable();
            $table->integer('dias_acumulado_fecha_ultima_it')->nullable();
                       
            $table->date('radicacion_masiva_fecha_carta')->nullable();
            $table->date('fecha_emision_crh1_antes_180')->nullable();
                       
            $table->string('crh1',2)->nullable();
            $table->integer('dias_acumulado_crh1')->nullable();
            
            $table->date('fecha_remision_afp_arl_crh1')->nullable();
            $table->date('fecha_notif_crh1_afp')->nullable();
            
            $table->date('fecha_emision_crh2_ante_540')->nullable();
            $table->string('crh2_favorable',2)->nullable();
            $table->integer('dias_acum_crh2')->nullable();
            $table->date('fecha_remision_afp_arl_crh2')->nullable();
            $table->date('fecha_notif_crh2_afp')->nullable();
            $table->date('fecha_emision_crh3_mod_pronostico')->nullable();
            $table->string('crh3__favorable',2)->nullable();
            $table->integer('dias_acum_crh3')->nullable();
            $table->date('fecha_remision_afp_arl_crh3')->nullable();
            $table->date('fecha_notif_crh3_afp')->nullable();
            $table->date('cpclo_fecha_1a_opor')->nullable();
            $table->string('entidad_califica_1_oportunidad',3)->nullable();
            $table->float('cpclo1',3,2)->nullable();
            $table->string('contingencia_origen_dictamen_1_oport')->nullable();
            $table->date('fecha_estructuracion_1_opor')->nullable();
            $table->string('quien_manifiesta_desacuerdo',50)->nullable();
            $table->date('fecha_manifestacion_desacuerdo')->nullable();
            $table->date('fecha_entrega_a_jrci')->nullable();
            $table->date('cpclo_fecha_jrci')->nullable();
            $table->float('cpclo2',3,2)->nullable();
            $table->string('contingencia_origen_dictamen_jrci',2)->nullable();
            $table->date('fecha_estructuracion_jrci')->nullable();
            $table->string('quien_manifiesta_controversia',50)->nullable();
            $table->date('fecha_manifestacion_controversia')->nullable();
            $table->date('fecha_entrega_a_jnci')->nullable();
            $table->date('cpclo_fecha_jnci')->nullable();
            $table->float('cpclo3',3,2)->nullable();
            $table->string('contingencia_origen_dictamen_jnci',2)->nullable();
            $table->date('fecha_estructuracion_jnci')->nullable();
            $table->date('fecha_demanda_lboral')->nullable();
            $table->float('cpclo4',3,2)->nullable();
            $table->string('contingencia_origen_dictamen_demanda',2)->nullable();
            $table->date('fecha_estructuracion_demanda')->nullable();
            $table->string('firme',2)->nullable();
            $table->float('porcentaje_cpcl',3,2)->nullable();
    
            $table->string('contingencia',2)->nullable();
            $table->date('fecha_estructuracion')->nullable();
            $table->string('instancia')->nullable();
            $table->string('clasificacion_tipo_incpacidad',5)->nullable();
            $table->date('fecha_cert_inva')->nullable();
            $table->date('fecha_carta_cita_pemel')->nullable();
            $table->date('fecha_carta_explicaciones_abuso')->nullable();
            $table->date('fecha_carta_cita_acuerdo__abuso')->nullable();
            $table->date('fecha_acta_acuerdo_de_cumplimiento')->nullable();
            $table->date('fecha_carta_suspension_abuso_del_derecho')->nullable();
            $table->date('fecha_restitucion_derecho_it')->nullable();
            $table->date('fecha_reintegro_por_mmm_')->nullable();
            $table->date('fecha_control_reintegro')->nullable();
            $table->string('resultado_reintegro_por_mmm')->nullable();
            $table->date('fecha_refuerzo_reintegro')->nullable();
            $table->date('fecha_control_fallido')->nullable();
            $table->string('resultado_refuerzo_reintegro')->nullable();
            $table->date('fecha_cierre_notificacion_evento')->nullable();
            $table->string('observacion')->nullable();
            $table->string('observacion_tutela')->nullable();
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
        Schema::dropIfExists('cronicos');
    }
}
