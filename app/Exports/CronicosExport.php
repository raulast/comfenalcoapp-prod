<?php

namespace App\Exports;

use App\Cronicos;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithMapping;

class CronicosExport implements FromCollection, WithHeadings, ShouldAutoSize, WithEvents, WithStyles, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $cronicos;
    protected $crepetidos;

    public function __construct($cronicos= null)
    {
        $this->cronicos = $cronicos;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        ini_set('memory_limit','512M');
        $this->cronicos = Cronicos::all();
        $tmp = [];
        foreach ($this->cronicos as $key => $value) {
            $tmp[$key]= $value->toArray();
        }
        $this->crepetidos = array_count_values(array_column($tmp,'id_usuario'));
        return $this->cronicos ?: Cronicos::all();
        //return Inscripcion::all();
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text.
            1    => ['font' => ['bold' => true], 'alignment'=>['horizontal' => 'center']],
        ];
    }

    public function map($invoice): array
    {
        $mel = "nombre_medico_laboral_(mel)";
        $daic = "dias_acumulado_a_hoy_desde_fech _inic _ciclo";
        $fec180 = "fecha_emision_crh1_(antes_del_180)";
        $fec540 = "fecha_emision_crh2_(antes_del_540)";
        $cod1o = "contingencia_origen_dictamen_1_oport ";
        $fe1o = "fecha_estructuracion_1_oport ";

        $cronico = $invoice;
        $cronico->ano_notificacion = ($cronico->fecha_notificacion != '')?(
            (date('Y',strtotime($cronico->fecha_notificacion))=='1900')?
            '2019':(
                (date('Y',strtotime($cronico->fecha_notificacion))<='2015')?'Años Anteriores':(
                    date('Y',strtotime($cronico->fecha_notificacion))))):
            '';

        $cronico->cant_ciclos = $this->crepetidos["$cronico->id_usuario"];

        $cronico->cc_repetidos = ($cronico->cant_ciclos > 1)? true : false;

        $rdf = $cronico->dias_acumulados_a_fecha_ultima_it;
        $cronico->rango_dias_a_fecha_ultima_it = ($rdf<60)?"01. No Aplica":(
            ($rdf>=60 && $rdf<=90)?"02. Entre 60 a 90":(
                ($rdf>=91 && $rdf<=120)?"03. Entre 91 a 120":(
                    ($rdf>=121 && $rdf<=150)?"04. Entre 121 a 150":(
                        ($rdf>=151 && $rdf<=180)?"05. Entre 151 a 180":(
                            ($rdf>=181 && $rdf<=360)?"06. Entre 181 a 360":(
                                ($rdf>=361 && $rdf<=540)?"07. Entre 361 a 540":(
                                    ($rdf>=541 && $rdf<=720)?"08. Entre 541 a 720":(
                                        ($rdf>=721 && $rdf<=1000)?"09. Entre 721 a 1000":(
                                            ($rdf>=1001)?"10. Entre Mayor a 1000":""
                                        )))))))));

        $tmp = "dias_acumulado_a_hoy_desde_fech _inic _ciclo";
        $cronico->$tmp = (strtoupper($cronico->estado_seguimiento) == "CERRADO")?$rdf:(
            (strtoupper($cronico->estado_seguimiento) == "SEGUIMIENTO")?"".intval((getdate()[0]-strtotime($cronico->fecha_it_inicio_ciclo))/86400):""
        );

        $cronico->perdidos = (strtoupper($cronico->estado_seguimiento) == "CERRADO")?"0":(
            (strtoupper($cronico->estado_seguimiento) == "SEGUIMIENTO")?"".intval((getdate()[0]-strtotime($cronico->fecha_fin_ultima_it))/86400):""
        );

        $cronico->fecha_dia_120 = date('d/m/Y',86400*((strtotime($cronico->fecha_it_inicio_ciclo)/86400)+120-1));
        $cronico->fecha_dia_150 = date('d/m/Y',86400*((strtotime($cronico->fecha_it_inicio_ciclo)/86400)+150-1));
        $cronico->fecha_dia_180 = date('d/m/Y',86400*((strtotime($cronico->fecha_it_inicio_ciclo)/86400)+180-1));
        $cronico->fecha_dia_480 = date('d/m/Y',86400*((strtotime($cronico->fecha_it_inicio_ciclo)/86400)+480-1));
        $cronico->fecha_dia_540 = date('d/m/Y',86400*((strtotime($cronico->fecha_it_inicio_ciclo)/86400)+540-1));

        $tmp = "fecha_emision_crh1_(antes_del_180)";
        $cronico->ano_emision_crh1 = ($cronico->$tmp>=2018)?date('Y',strtotime($cronico->$tmp)):"Años Anteriores";
        $cronico->mes_emision_crh1 = ($cronico->$tmp>=2018)?date('m',strtotime($cronico->$tmp)):"Años Anteriores";

        $cronico->oportunidad_a_crh1=($cronico->dias_acumulados_a_crh1<=0)?"No Aplica":(
            ($cronico->dias_acumulados_a_crh1>1 && $cronico->dias_acumulados_a_crh1<=150)?"1. Oportuno":(
                ($cronico->dias_acumulados_a_crh1>150)?"2. No Oportuno":""
            )
        );

        $cronico->rango_cpclo_cierre = ($rdf<25)?"01. Menor 25%":(
            ($rdf>=25 && $rdf<36)?"02. Entre 25% a 35%":(
                ($rdf>=36 && $rdf<46)?"03. Entre 36% a 45%":(
                    ($rdf>=46 && $rdf<50)?"04. Entre 46% a 49%":(
                        ($rdf>=50)?"05. Entre Mayor 50%":""))));

        $invoice = $cronico;

        return [
            $invoice->consecutivo,
            $invoice->numero_notificacion,
            $invoice->fecha_notificacion,
            $invoice->ano_notificacion,
            $invoice->municipio,
            $invoice->codigo_municipio,
            $invoice->tipo_id_aportante,
            $invoice->nit_aportante,
            $invoice->nombre_aportante,
            $invoice->nit_ips_primaria,
            $invoice->nombre_ips,
            $invoice->nombre_1_usuario,
            $invoice->nombre_2_usuario,
            $invoice->apellido_1_usuario,
            $invoice->apellido_2_usuario,
            $invoice->tipo_id_usuario,
            $invoice->id_usuario,
            $invoice->cc_repetidos,
            $invoice->cant_ciclos,
            $invoice->dias_acumulados_a_identificacion_caso,
            $invoice->fecha_fin_it_dias_acumulados_a_indetificacion,
            $invoice->estado_afiliado,
            $invoice->tipo_afiliado,
            '-',
            $invoice->$mel,
            $invoice->no_licencia_medico_laboral,
            $invoice->fecha_ultima_cita_mel,
            $invoice->cod_arl,
            $invoice->nombre_arl,
            $invoice->cod_afp,
            $invoice->nombre_afp,
            $invoice->tipo_seguimiento,
            $invoice->estado_seguimiento,
            $invoice->motivo_estado_seguimiento,
            $invoice->fecha_cierre,
            $invoice->cie10_evento_seguimiento,
            $invoice->descripcion_cie10,
            $invoice->contingencia_origen_inicial,
            $invoice->fecha_it_inicio_ciclo,
            $invoice->fecha_inicio_ultima_it,
            $invoice->fecha_fin_ultima_it,
            $invoice->dias_acumulados_a_fecha_ultima_it,
            $invoice->rango_dias_a_fecha_ultima_it,
            $invoice->$daic,
            $invoice->perdidos,
            $invoice->fecha_dia_180,
            $invoice->fecha_dia_540,
            $invoice->fecha_dia_120,
            $invoice->fecha_dia_150,
            $invoice->radicacion_masiva_fecha_carta,
            $invoice->$fec180,
            $invoice->decision_crh1,
            $invoice->dias_acumulados_a_crh1,
            '-',
            $invoice->oportunidad_a_crh1,
            $invoice->fecha_remision_afp_arl_crh1,
            $invoice->fecha_notif_crh1_a_afp,
            $invoice->fecha_dia_480,
            $invoice->$fec540,
            $invoice->decision_crh2_favorable,
            $invoice->dias_acum_a_crh2,
            $invoice->fecha_remision_afp_arl_crh2,
            $invoice->fecha_notif_crh2_a_afp,
            $invoice->fecha_emision_crh3_mod_pronostico,
            $invoice->decision_crh3_favorable,
            $invoice->dias_acum_a_crh3,
            $invoice->fecha_remision_afp_arl_crh3,
            $invoice->fecha_notif_crh3_a_afp,
            $invoice->cpclo_fecha_1a_oport,
            $invoice->entidad_califica_1a_oportunidad,
            $invoice->cpclo,
            $invoice->$cod1o,
            $invoice->$fe1o,
            $invoice->quien_manifiesta_desacuerdo,
            $invoice->fecha_manifestacion_desacuerdo,
            $invoice->fecha_entrega_a_jrci,
            $invoice->cpclo_fecha_jrci,
            $invoice->cpclo2,
            $invoice->contingencia_origen_dictamen_jrci,
            $invoice->fecha_estructuracion_jrci,
            $invoice->quien_manifiesta_controversia,
            $invoice->fecha_manifestacion_controversia,
            $invoice->fecha_entrega_a_jnci,
            $invoice->cpclo_fecha_jnci,
            $invoice->cpclo3,
            $invoice->contingencia_origen_dictamen_jnci,
            $invoice->fecha_estructuracion_jnci,
            $invoice->fecha_demanda_lboral,
            $invoice->cpclo_demanda_dictamen,
            $invoice->contingencia_origen_dictamen_demanda,
            $invoice->fecha_estructuracion_demanda,
            $invoice->firme_si,
            '-',
            $invoice->rango_cpclo_cierre,
            $invoice->contingencia_origen_de_cierre,
            $invoice->fecha_estructuracion_cierre,
            $invoice->instancia_al_cierre,
            $invoice->clasificacion_tipo_incpacidad,
            $invoice->fecha_cert_inva,
            $invoice->fecha_carta_cita_pemel,
            $invoice->fecha_carta_explicaciones_abuso,
            $invoice->fecha_carta_cita_acuerdo__abuso,
            $invoice->fecha_acta_acuerdo_de_cumplimiento,
            $invoice->fecha_carta_suspension_abuso_del_derecho,
            $invoice->fecha_restitucion_derecho_it,
            $invoice->fecha_reintegro_por_mmm,
            $invoice->fecha_control_reintegro,
            $invoice->resultado_reintegro_por_mmm,
            $invoice->fecha_refuerzo_reintegro,
            $invoice->fecha_control_fallido,
            $invoice->resultado_refuerzo_reintegro,
            $invoice->fecha_cierre_notificacion_evento,
            $invoice->observacion,
            $invoice->observacion_cobertura_tutela,
        ];
    }

    public function headings(): array
    {
        return [
                'consecutivo',
                'numero_notificacion',
                'fecha_notificacion',
                'ano_notificacion',
                'municipio',
                'codigo_municipio',
                'tipo_id_aportante',
                'nit_aportante',
                'nombre_aportante',
                'nit_ips_primaria',
                'nombre_ips',
                'nombre_1_usuario',
                'nombre_2_usuario',
                'apellido_1_usuario',
                'apellido_2_usuario',
                'tipo_id_usuario',
                'id_usuario',
                'cc_repetidos',
                'cant_ciclos',
                'dias_acumulados_a_identificacion_caso',
                'fecha_fin_it_dias_acumulados_a_indetificacion',
                'estado_afiliado',
                'tipo_afiliado',
                '##CODIGO TIPO AFILIADO ##',
                '[nombre_medico_laboral_(mel)]',
                'no_licencia_medico_laboral',
                'fecha_ultima_cita_mel',
                'cod_arl',
                'nombre_arl',
                'cod_afp',
                'nombre_afp',
                'tipo_seguimiento',
                'estado_seguimiento',
                'motivo_estado_seguimiento',
                'fecha_cierre',
                'cie10_evento_seguimiento',
                'descripcion_cie10',
                'contingencia_origen_inicial',
                'fecha_it_inicio_ciclo',
                'fecha_inicio_ultima_it',
                'fecha_fin_ultima_it',
                'dias_acumulados_a_fecha_ultima_it',
                'rango_dias_a_fecha_ultima_it',
                '[dias_acumulado_a_hoy_desde_fech _inic _ciclo]',
                'perdidos',
                'fecha_dia_180',
                'fecha_dia_540',
                'fecha_dia_120',
                'fecha_dia_150',
                'radicacion_masiva_fecha_carta',
                '[fecha_emision_crh1_(antes_del_180)]',
                'decision_crh1',
                'dias_acumulados_a_crh1',
                '##Diferencia Femision-Dia150##',
                'oportunidad_a_crh1',
                'fecha_remision_afp_arl_crh1',
                'fecha_notif_crh1_a_afp',
                'fecha_dia_480',
                '[fecha_emision_crh2_(antes_del_540)]',
                'decision_crh2_favorable',
                'dias_acum_a_crh2',
                'fecha_remision_afp_arl_crh2',
                'fecha_notif_crh2_a_afp',
                'fecha_emision_crh3_mod_pronostico',
                'decision_crh3_favorable',
                'dias_acum_a_crh3',
                'fecha_remision_afp_arl_crh3',
                'fecha_notif_crh3_a_afp',
                'cpclo_fecha_1a_oport',
                'entidad_califica_1a_oportunidad',
                'cpclo',
                '[contingencia_origen_dictamen_1_oport ]',
                '[fecha_estructuracion_1_oport ]',
                'quien_manifiesta_desacuerdo',
                'fecha_manifestacion_desacuerdo',
                'fecha_entrega_a_jrci',
                'cpclo_fecha_jrci',
                'cpclo2',
                'contingencia_origen_dictamen_jrci',
                'fecha_estructuracion_jrci',
                'quien_manifiesta_controversia',
                'fecha_manifestacion_controversia',
                'fecha_entrega_a_jnci',
                'cpclo_fecha_jnci',
                'cpclo3',
                'contingencia_origen_dictamen_jnci',
                'fecha_estructuracion_jnci',
                'fecha_demanda_lboral',
                'cpclo_demanda_dictamen',
                'contingencia_origen_dictamen_demanda',
                'fecha_estructuracion_demanda',
                'firme_si',
                '##PORCENTAJE CPCL##',
                'rango_cpclo_cierre',
                'contingencia_origen_de_cierre',
                'fecha_estructuracion_cierre',
                'instancia_al_cierre',
                'clasificacion_tipo_incpacidad',
                'fecha_cert_inva',
                'fecha_carta_cita_pemel',
                'fecha_carta_explicaciones_abuso',
                'fecha_carta_cita_acuerdo__abuso',
                'fecha_acta_acuerdo_de_cumplimiento',
                'fecha_carta_suspension_abuso_del_derecho',
                'fecha_restitucion_derecho_it',
                'fecha_reintegro_por_mmm',
                'fecha_control_reintegro',
                'resultado_reintegro_por_mmm',
                'fecha_refuerzo_reintegro',
                'fecha_control_fallido',
                'resultado_refuerzo_reintegro',
                'fecha_cierre_notificacion_evento',
                'observacion',
                'observacion_cobertura_tutela',
            ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->insertNewRowBefore(1, 1);
                $event->sheet->getStyle('1')->getAlignment()->applyFromArray(
                    array('horizontal' => 'center')
                );

                $event->sheet->mergeCells('B1:D1');
                $event->sheet->setCellValue('B1','NOTIFICACIÓN (SIR)');

                $event->sheet->mergeCells('E1:X1');
                $event->sheet->setCellValue('E1','IDENTIFICA EMPRESA SEDE USUARIO (REGISTRO CLIENTE)');

                $event->sheet->mergeCells('AF1:AL1');
                $event->sheet->setCellValue('AF1','INFORMACIÓN CASO (SIR)');

                $event->sheet->mergeCells('AM1:AS1');
                $event->sheet->setCellValue('AM1','INFORMACIÓN INCAPACIDAD (SISPOS)');

                $event->sheet->mergeCells('AT1:AW1');
                $event->sheet->setCellValue('AT1','FECHAS PROYECTADAS');

                $event->sheet->mergeCells('AX1:BP1');
                $event->sheet->setCellValue('AX1','SEGUIMIENTO CRHs (SIR)');

                $event->sheet->mergeCells('BQ1:CI1');
                $event->sheet->setCellValue('BQ1','SEGUIMIENTO A INSTANCIAS DE CPCLO (SIR)');

                $event->sheet->mergeCells('CJ1:CM1');
                $event->sheet->setCellValue('CJ1','INFORMACIÓN DEMANDA DICTAMEN (SIR)');

                $event->sheet->mergeCells('CN1:CU1');
                $event->sheet->setCellValue('CN1','CPCLO AL CIERRE');

                $event->sheet->mergeCells('CV1:DA1');
                $event->sheet->setCellValue('CV1','ABUSO DEL DERECHO');

                $event->sheet->mergeCells('DB1:DG1');
                $event->sheet->setCellValue('DB1','CIERRE REINTEGRO');
            }
        ];
    }

}
