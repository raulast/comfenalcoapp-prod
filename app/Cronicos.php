<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cronicos extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'cronicos';
     
    protected $fillable = [
    'id','consecutivo','numero_notificacion',
    'fecha_notificacion','municipio','codigo_municipio','tipo_identifica_aportante',
    'nit_aportante','nombre_aportante','nit_ips_primaria','nombre_ips','nombre_1_usuario',
    'nombre_2_usuario','apellido_1_usuario','apellido_2_usuario','tipo_nit_usuario','nit_usuario',
    'dias_acumulados_a_identificacion_caso','fecha_acumulados_fin_indetificacion','estado_afiliado',
    'tipo_afiliado','codigo_tipo_afiliado','nombre_medico_laboral','licencia_ml','fecha_ultima_cita',
    'cdgo_arl','nombre_arl','cdgo_afp','nombre_afp','tipo_seguimiento','estado_seguimiento','motivo_estado_seguimiento',
    'fecha_cierre','cie_10_evento_seguimiento','descripcion_cie_10','contingencia_origen_inicial',
    'fecha_it_inicio_ciclo','fecha_inicio_ultima_it','fecha_fin_ultima_it','dias_acumulado_fecha_ultima_it',
    'radicacion_masiva_fecha_carta','fecha_emision_crh1_antes_180','crh1','dias_acumulado_crh1',
    'fecha_remision_afp_arl_crh1','fecha_notif_crh1_afp','fecha_emision_crh2_ante_540',
    'crh2_favorable','dias_acum_crh2','fecha_remision_afp_arl_crh2','fecha_notif_crh2_afp',
    'fecha_emision_crh3_mod_pronostico','crh3__favorable','dias_acum_crh3','fecha_remision_afp_arl_crh3',
    'fecha_notif_crh3_afp','cpclo_fecha_1a_opor','entidad_califica_1_oportunidad','cpclo1',
    'contingencia_origen_dictamen_1_oport','fecha_estructuracion_1_opor','quien_manifiesta_desacuerdo',
    'fecha_manifestacion_desacuerdo','fecha_entrega_a_jrci','cpclo_fecha_jrci','cpclo2','contingencia_origen_dictamen_jrci',
    'fecha_estructuracion_jrci','quien_manifiesta_controversia','fecha_manifestacion_controversia','fecha_entrega_a_jnci',
    'cpclo_fecha_jnci','cpclo3','contingencia_origen_dictamen_jnci','fecha_estructuracion_jnci','fecha_demanda_lboral',
    'cpclo4','contingencia_origen_dictamen_demanda','fecha_estructuracion_demanda','firme',
    'porcentaje_cpcl','contingencia','fecha_estructuracion','instancia','clasificacion_tipo_incpacidad',
    'fecha_cert_inva','fecha_carta_cita_pemel','fecha_carta_explicaciones_abuso','fecha_carta_cita_acuerdo__abuso',
    'fecha_acta_acuerdo_de_cumplimiento','fecha_carta_suspension_abuso_del_derecho','fecha_restitucion_derecho_it',
    'fecha_reintegro_por_mmm_','fecha_control_reintegro','resultado_reintegro_por_mmm',
    'fecha_refuerzo_reintegro','fecha_control_fallido','resultado_refuerzo_reintegro','fecha_cierre_notificacion_evento','observacion',
'observacion_tutela'
    ];

}
