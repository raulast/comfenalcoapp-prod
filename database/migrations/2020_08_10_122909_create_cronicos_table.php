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

            $table->string('consecutivo')->nullable();
            $table->string('numero_notificacion')->nullable();
            $table->date('fecha_notificacion')->nullable();
            $table->string('ano_notificacion')->nullable();
            $table->string('tipo_id_usuario')->nullable();
            $table->string('id_usuario')->nullable();
            $table->string('cc_repetidos')->nullable();
            $table->string('cant_ciclos')->nullable();
            $table->string('nombre_1_usuario')->nullable();
            $table->string('nombre_2_usuario')->nullable();
            $table->string('apellido_1_usuario')->nullable();
            $table->string('apellido_2_usuario')->nullable();
            $table->string('tipo_afiliado')->nullable();
            $table->string('estado_afiliado')->nullable();
            $table->string('tipo_afiliado_poblacion_mayo2020')->nullable();
            $table->string('estado_afiliado_poblacion_mayo2020')->nullable();
            $table->string('telefono_fijo_usuario')->nullable();
            $table->string('celular_usuario')->nullable();
            $table->string('email_usuario')->nullable();
            $table->string('apellidos_nombres_acudiente')->nullable();
            $table->string('telefono_fijo_acudiente')->nullable();
            $table->string('telefono_celular_acudiente')->nullable();
            $table->string('email_acudiente')->nullable();
            $table->string('tipo_id_aportante')->nullable();
            $table->string('nit_aportante')->nullable();
            $table->string('nombre_aportante')->nullable();
            $table->string('cod_arl')->nullable();
            $table->string('nombre_arl')->nullable();
            $table->string('cod_afp')->nullable();
            $table->string('nombre_afp')->nullable();
            $table->string('municipio')->nullable();
            $table->string('codigo_municipio')->nullable();
            $table->string('nit_ips_primaria')->nullable();
            $table->string('nombre_ips')->nullable();
            $table->string('nombre_medico_laboral_(mel)')->nullable();
            $table->string('no_licencia_medico_laboral')->nullable();
            $table->string('fecha_primera_asistio_mel')->nullable();
            $table->string('fecha_ultima_cita_mel')->nullable();
            $table->string('fecha_proxima_mel')->nullable();
            $table->string('fecha_primera_asistio_sic')->nullable();
            $table->string('fecha_ultima_cita_sic')->nullable();
            $table->string('fecha_proxima_sic')->nullable();
            $table->string('dias_acumulados_a_identificacion_caso')->nullable();
            $table->string('fecha_fin_it_dias_acumulados_a_indetificacion')->nullable();
            $table->string('tipo_seguimiento')->nullable();
            $table->string('estado_seguimiento')->nullable();
            $table->string('motivo_estado_seguimiento')->nullable();
            $table->string('cie10_evento_seguimiento')->nullable();
            $table->string('descripcion_cie10')->nullable();
            $table->string('contingencia_origen_inicial')->nullable();
            $table->string('fecha_cierre')->nullable();
            $table->string('fecha_it_inicio_ciclo')->nullable();
            $table->string('fecha_inicio_ultima_it')->nullable();
            $table->string('fecha_fin_ultima_it')->nullable();
            $table->string('dias_acumulados_a_fecha_ultima_it')->nullable();
            $table->string('rango_dias_a_fecha_ultima_it')->nullable();
            $table->string('dias_acumulado_a_hoy_desde_fech _inic _ciclo')->nullable();
            $table->string('perdidos')->nullable();
            $table->string('fecha_dia_180')->nullable();
            $table->string('fecha_dia_540')->nullable();
            $table->string('fecha_dia_120')->nullable();
            $table->string('fecha_dia_150')->nullable();
            $table->string('radicacion_masiva_fecha_carta')->nullable();
            $table->string('fecha_emision_crh1_(antes_del_180)')->nullable();
            $table->string('ano_emision_crh1')->nullable();
            $table->string('mes_emision_crh1')->nullable();
            $table->string('decision_crh1')->nullable();
            $table->string('dias_acumulados_a_crh1')->nullable();
            $table->string('oportunidad_a_crh1')->nullable();
            $table->string('fecha_remision_afp_arl_crh1')->nullable();
            $table->string('fecha_notif_crh1_a_afp')->nullable();
            $table->string('fecha_dia_480')->nullable();
            $table->string('fecha_emision_crh2_(antes_del_540)')->nullable();
            $table->string('decision_crh2_favorable')->nullable();
            $table->string('dias_acum_a_crh2')->nullable();
            $table->string('fecha_remision_afp_arl_crh2')->nullable();
            $table->string('fecha_notif_crh2_a_afp')->nullable();
            $table->string('fecha_emision_crh3_mod_pronostico')->nullable();
            $table->string('decision_crh3_favorable')->nullable();
            $table->string('dias_acum_a_crh3')->nullable();
            $table->string('fecha_remision_afp_arl_crh3')->nullable();
            $table->string('fecha_notif_crh3_a_afp')->nullable();
            $table->string('cpclo_fecha_1a_oport')->nullable();
            $table->string('entidad_califica_1a_oportunidad')->nullable();
            $table->string('cpclo')->nullable();
            $table->string('contingencia_origen_dictamen_1_oport')->nullable();
            $table->string('fecha_estructuracion_1_oport')->nullable();
            $table->string('quien_manifiesta_desacuerdo')->nullable();
            $table->string('fecha_manifestacion_desacuerdo')->nullable();
            $table->string('fecha_entrega_a_jrci')->nullable();
            $table->string('cpclo_fecha_jrci')->nullable();
            $table->string('cpclo2')->nullable();
            $table->string('contingencia_origen_dictamen_jrci')->nullable();
            $table->string('fecha_estructuracion_jrci')->nullable();
            $table->string('quien_manifiesta_controversia')->nullable();
            $table->string('fecha_manifestacion_controversia')->nullable();
            $table->string('fecha_entrega_a_jnci')->nullable();
            $table->string('cpclo_fecha_jnci')->nullable();
            $table->string('cpclo3')->nullable();
            $table->string('contingencia_origen_dictamen_jnci')->nullable();
            $table->string('fecha_estructuracion_jnci')->nullable();
            $table->string('fecha_demanda_lboral')->nullable();
            $table->string('cpclo_demanda_dictamen')->nullable();
            $table->string('contingencia_origen_dictamen_demanda')->nullable();
            $table->string('fecha_estructuracion_demanda')->nullable();
            $table->string('firme_si')->nullable();
            $table->string('cpclo_cierre')->nullable();
            $table->string('rango_cpclo_cierre')->nullable();
            $table->string('categoria_discapacidad')->nullable();
            $table->string('contingencia_origen_de_cierre')->nullable();
            $table->string('fecha_estructuracion_cierre')->nullable();
            $table->string('instancia_al_cierre')->nullable();
            $table->string('clasificacion_tipo_incpacidad')->nullable();
            $table->string('fecha_cert_inva')->nullable();
            $table->string('fecha_carta_cita_pemel')->nullable();
            $table->string('fecha_carta_explicaciones_abuso')->nullable();
            $table->string('fecha_carta_cita_acuerdo__abuso')->nullable();
            $table->string('fecha_acta_acuerdo_de_cumplimiento')->nullable();
            $table->string('fecha_carta_suspension_abuso_del_derecho')->nullable();
            $table->string('fecha_restitucion_derecho_it')->nullable();
            $table->string('fecha_reintegro_por_mmm')->nullable();
            $table->string('fecha_control_reintegro')->nullable();
            $table->string('resultado_reintegro_por_mmm')->nullable();
            $table->string('fecha_refuerzo_reintegro')->nullable();
            $table->string('fecha_control_fallido')->nullable();
            $table->string('resultado_refuerzo_reintegro')->nullable();
            $table->string('fecha_comunicado_usuario')->nullable();
            $table->string('tipo_comunicado_(llamado-email-carta)')->nullable();
            $table->string('fecha_comunicado_busqueda_empresa')->nullable();
            $table->string('deuda')->nullable();
            $table->string('procedimiento_pendiente')->nullable();
            $table->string('fecha_de_solicitud')->nullable();
            $table->string('area_de_contacto')->nullable();
            $table->string('fecha_de_respuesta')->nullable();
            $table->string('respuesta')->nullable();
            $table->string('fecha_cierre_notificacion_evento')->nullable();
            $table->string('observacion')->nullable();
            $table->string('tutela_pe')->nullable();
            $table->string('observacion_cobertura_tutela')->nullable();


            /*$table->integer('consecutivo')->nullable();
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

            $table->string('categoria_discapacidad',)->nullable();
    
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
            $table->string('tutela_pe',2)->nullable();
            $table->string('observacion_tutela')->nullable();*/



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
