<?php

namespace App\Exports;

use App\Judiciales;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class JuridicasExport implements FromCollection, WithHeadings, ShouldAutoSize
{
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $juridicas;

    public function __construct($juridicas= null)
    {
        $this->juridicas = $juridicas;
    }

    public function collection()
    {   
        ini_set('memory_limit','512M');
        return $this->juridicas ?: Judiciales::all();
    
    }
    public function headings(): array
    {
        return [
            'id','fecha_de_recepcion_juzgado',
            'numero_radicacion_juzgado',
            'aux_apoyo_pemel',
            'tipo_de_accion_juridica',
            'fecha_notificacion_a_juridico_1',
            'año_notif',
            'mes_notif',
            'hora_notificacion_a_juridico',
            'solicitud_apoyo_pemel_fecha',
            'solicitud_apoyo_pemel_hora',
            'pemel_vencimiento_entrega_apoyo_fecha',
            'pemel_vencimiento_entrega_apoyo_hora',
            'entrega_apoyo_fecha',
            'entrega_apoyo_hora',
            'año_solicitud_apoyo',
            'mes_solicitud_apoyo',
            'vencimiento_respuesta_juridico',
            'dias_limite_apoy',
            'dias_tiempo_respuesta_apoy',
            'dias_cumplimiento_apoy',
            'marca_oportunidad_apoy',
            'clasificacion_dias_tiempo_resp_apoy',
            'cumpl_apoyo_vs_venc_resp_juridica',
            'marca_oportunidad_a_juridico',
            'tiempo_reporte_a_pemel',
            'clasificacion_dias_tiempo_reporte_pemel',
            'dias_de_notif_juridico_vs_vencim_juridico',
            'difer',
            'nombre_abogado_eps',
            'nombre_demandante',
            'nit_demandante',
            'descripcion_juzgado',
            'tipo_juzgado',
            'temeridad',
            'area',
            'motivo_de_accion',
            'regimen_del_usuario',
            'tipo_cotizante_demandante',
            'municipio',
            'ips_asignacion_usuario',
            'nombre_aportante',
            'nit_aportante',
            'nombre_apellidos_usuario',
            'nit_usuario',
            'estado_de_la_notificacion',
            'cobertura_de_tutela',
            'pronunciamiento_eps',
            'fecha_de_fallo',
            'fecha_notificacion_fallo_a_eps',
            'fecha_notificacion_fallo_a_pemel',
            'sujeto_de_pago',
            'decision_juzgado_1_instancia_impacto_eps',
            'fecha_cumplimiento_fallo',
            'fecha_vencimiento_fallo',
            'observacion_cumplimiento_fallo',
            'decision_a_tomar_impugnar_post_fallo',
            'fecha_impugnacion',
            'quien_toma_desicion',
            'fecha_fallo_segunda_instancia',
            'fecha_notificacion_a_juridico_2',
            'fecha_entrega_fallo_2da_insta_a_pemel',
            'decision_segunda_instancia',
            'desisicon_final_ajustada_impacto_eps',
            'actividad_a_realizar_segun_fallo',
            'fecha_cumplimiento_fallo_2da_instancia',
            'costo_de_prestacion_economica',
            'numero_radicado_requerimiento_1_supersalud',
            'fecha_requerimientos_1',
            'año_req_1',
            'mes_req_1',
            'fecha_entrega_pemel_requerimiento_1',
            'fecha_soporte_requerimiento_1',
            'fecha_cumplimiento_requerimiento_1',
            'observacion_requerimiento_1',
            'numero_radicado_requerimiento_2_supersalud',
            'fecha_requerimiento_2',
            'año_req_2',
            'mes_req_2',
            'fecha_entrega_pemel_requerimiento_2',
            'fecha_soporte_requerimiento_2',
            'fecha_cumplimiento_requerimiento_2',
            'observacion_requerimiento_2',
            'fecha_incidente_o_primer_requerimiento_desacato_1',
            'año_desac_1',
            'mes_desca_1',
            'fecha_notificacion_juridico_3',
            'fecha_entrega_pemel_desacato_1',
            'fecha_soporte_desacato_1',
            'fecha_cumplimiento_desacato_1',
            'fecha_cierre_desacato_1',
            'tipo_sancion_no_cumplimiento_fallo_desacato_mas_requrimiento',
            'magnitud_sancion_arresto_dias_1',
            'magnitud_sancion_1',
            'fecha_requerimiento_o_desacato_2',
            'año_desac_2',
            'mes_desca_2',
            'fecha_notificacion_juridico_4',
            'fecha_entrega_pemel_desacato_2',
            'fecha_soporte_desacato_2',
            'fecha_cumplimiento_desacato_2',
            'fecha_cierre_desacato_2',
            'tipo_sancion_no_cumplimiento_fallo_desacato_2',
            'magnitud_sancion_arresto_dias_2',
            'magnitud_sancion_desacato',
            'fecha_sancion',
            'año_sancion',
            'mes_sancion',
            'fecha_notificacion_sancion_a_jur',
            'fecha_notificacion_sancion_a_pemel',
            'fecha_soporte_sancion',
            'magnitud_sancion_arresto_dias_3',
            'magnitud_sancion_2',
            'cierre_sancion',
            'observacion',
            ];
    }
}
