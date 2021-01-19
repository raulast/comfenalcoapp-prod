import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IpsSelect from './IpsSelect.js';
import MedicoSelect from './MedicoSelect.js';
import EspecialidadesSelect from './EspecialidadesSelect.js';
import TipoCotizanteSelect from './TipoCotizanteSelect.js';
import EstadoSelect from './EstadoSelect.js';
import AutocompleteDescripcion from './AutocompleteDescripcion.js';
import TableReportes from './TableReportes.js';
import axios from 'axios';
class Reporte extends Component {
    constructor(props) {
        super(props);
        this.state = {
           ips:'',
           medico:'',
           especialidad:'',
           paciente: '',
           empresa:'',
           tipoCotizante:'',
           tipoLicencia:'',
           estado:'',
           desde:'',
           hasta:'',
           capitulo:'',
           categoria:'',
           diagnostico:'',
           codigoDiagnostico:'',
           contingencia:'',
           soat: '',
           datos:'',
           totales:'',
           export : ''
        }
        // bind
        
        this.handleChange = this.handleChange.bind(this);
        this.handleDiagnostico = this.handleDiagnostico.bind(this);
        this.handleCodigoDiagnostico = this.handleCodigoDiagnostico.bind(this);
        this.reportIncapacidades = this.reportIncapacidades.bind(this);
        this.reportLicencias = this.reportLicencias.bind(this);
        this.exportReport = this.exportReport.bind(this);
        
    }
    
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    handleDiagnostico(dato){
        this.setState({diagnostico: dato} )
    }
    handleCodigoDiagnostico(dato){
        this.setState({codigoDiagnostico: dato})
    }
    reportIncapacidades(){
        let url = 'reportIncapacidades'
        axios.post(url, { datos: this.state })
            .then(resp => {
                console.log(resp.data)
                this.setState({
                    datos: resp.data.data,
                    totales: resp.data.totales,
                    export: 'incapacidad'
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
    reportLicencias(){
        let url = 'reportLicencias'
        axios.post(url, { datos: this.state })
            .then(resp => {
                console.log(resp.data)
                this.setState({
                    datos: resp.data.data,
                    totales: resp.data.totales,
                    export: 'licencia'
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
    exportReport(){
       var url = 'exportReporte?datos='+this.state.datos
       window.open(url,'_blank');
       
    }
    render() {
        
        return (
            <div>
                <form action="exportReporte" method="get" target="_blank">
                <input type="hidden" value={this.state.export} name="export"/>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Generación de reportes - Datos Generales</div>
                            <div className="card-body texto">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="">IPS</label>
                                        <IpsSelect handleChange={this.handleChange}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Médico</label>
                                        <MedicoSelect handleChange={this.handleChange}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Especialidad</label>
                                        <EspecialidadesSelect handleChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="">ID Paciente</label>
                                        <input type="text" name="paciente" className="form-control form-control-sm" onChange={this.handleChange}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Empresa</label>
                                        <input type="text" name="empresa" className="form-control form-control-sm" onChange={this.handleChange}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Tipo de Cotizante</label>
                                        <TipoCotizanteSelect handleChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="">Tipo de licencia</label>
                                        <select name="tipoLicencia" className="form-control form-control-sm" onChange={this.handleChange} value={this.state.tipoLicencia}>
                                                <option value=""></option>
                                                <option value="1">Maternidad Normal</option>
                                                <option value="2">Parto no viable</option> 	
                                                <option value="3">Paternidad</option>
                                                <option value="4">Parto prematuro</option>
                                                <option value="5">Parto normal múltiple</option>
                                                <option value="6">Parto prematuro múltiple</option>
                                                <option value="10">Fallecimiento de la madre</option>
                                                <option value="12">Fallo de tutela</option>
                                                <option value="13">Enfermedad materna grave</option>
                                                <option value="14">Adopción</option>
                                                <option value="15">Prelicencia en época de parto (anticipo)</option>

                                            </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Estado</label>
                                        <EstadoSelect handleChange={this.handleChange}/>
                                    </div>
                                   
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                            <label htmlFor="">Período de tiempo (desde)</label>
                                            <input type="date" name="desde" className="form-control form-control-sm" onChange={this.handleChange}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Período de tiempo (hasta)</label>
                                        <input type="date" name="hasta" className="form-control form-control-sm" onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={this.reportIncapacidades}>Incapacidades</button>
                                        <button type="button" className="btn btn-success btn-sm" onClick={this.reportLicencias}>Licencias</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Generación de reportes - CIE10</div>
                            <div className="card-body texto">
                                <div className="row">
                                    <div className="col-md-6">
                                       
                                        <AutocompleteDescripcion title="Diagnóstico" handleDiagnostico ={this.handleDiagnostico} handleCodigoDiagnostico ={this.handleCodigoDiagnostico}  />
                                    </div>
                                    <div className="col-md-3">
                                    <label htmlFor="capitulo_grupo">Capítulo</label>
                                            <select className="form-control form-control-sm" name="capitulo" value={this.state.capitulo} onChange={this.handleChange }>
                                                <option value=""></option>
                                                <option value='1'>CIERTAS ENFERMEDADES INFECCIOSAS Y PARASITARIAS</option>
                                                <option value='2'>TUMORES [NEOPLASIAS]</option>
                                                <option value='3'>ENFERMEDADES DE LA SANGRE Y DE LOS ORGANOS HEMATOPOYETICOS, Y CIERTOS TRASTORNOS QUE AFECTAN EL MECANISMO DE LA INMUNIDAD</option>
                                                <option value='4'>ENFERMEDADES ENDOCRINAS, NUTRICIONALES Y METABOLICAS</option>
                                                <option value='5'>TRASTORNOS MENTALES Y DEL COMPORTAMIENTO</option>
                                                <option value='6'>ENFERMEDADES DEL SISTEMA NERVIOSO</option>
                                                <option value='7'>ENFERMEDADES DEL OJO Y SUS ANEXOS</option>
                                                <option value='8'>ENFERMEDADES DEL OIDO Y DE LA APOFISIS MASTOIDES</option>
                                                <option value='9'>ENFERMEDADES DEL SISTEMA CIRCULATORIO</option>
                                                <option value='10'>ENFERMEDADES DEL SISTEMA RESPIRATORIO</option>
                                                <option value='11'>ENFERMEDADES DEL SISTEMA DIGESTIVO</option>
                                                <option value='12'>ENEFERMEDADES DE LA PIEL Y DEL TEJIDO SUBCUTANEO</option>
                                                <option value='13'>ENFERMEDADES DEL SISTEMA OSTEOMUSCULAR Y DEL TEJIDO CONJUNTIVO</option>
                                                <option value='14'>ENFERMEDADES DEL SISTEMA GENITOURINARIO</option>
                                                <option value='15'>EMBARAZO, PARTO Y PUERPERIO</option>
                                                <option value='16'>CIERTAS AFECCIONES ORIGINADAS EN EL PERIODO PERINATAL</option>
                                                <option value='17'>MALFORMACIONES CONGENITAS, DEFORMIDADES Y ANOMALIAS CROMOSOMICAS</option>
                                                <option value='18'>SINTOMAS, SIGNOS Y HALLAZGOS ANORMALES CLINICOS Y DE LABORATORIO, NO CLASIFICADOS EN OTRA PARTE</option>
                                                <option value='19'>TRAUMATISMOS, ENVENENAMIENTOS Y ALGUNAS OTRAS CONSECUENCIAS DE CAUSAS EXTERNAS</option>
                                                <option value='20'>CAUSAS EXTERNAS DE MORBILIDAD Y DE MORTALIDAD</option>
                                                <option value='21'>FACTORES QUE INFLUYEN EN EL ESTADO DE SALUD Y CONTACTO CON LOS SERVICIOS DE SALUD</option>
                                                <option value='22'>ASIGNACIÓN PROVISIONAL DE NUEVAS ENFERMEDADES DE ETIOLOGÍA INCIERTA</option>
                                            </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="categoria">Categoría</label>
                                            <select className="form-control form-control-sm" name="categoria" value={this.state.categoria} onChange={this.handleChange }>
                                                <option value=""></option>
                                                <option value='1_1'>ENFERMEDADES INFECCIOSAS INTESTINALES</option>
                                                <option value='1_2'>TUBERCULOSIS</option>
                                                <option value='1_3'>CIERTAS ZOONOSIS BACTERIANA</option>
                                                <option value='1_4'>OTRAS ENFERMEDADES BACTERIANAS</option>
                                                <option value='1_5'>INFECCIONES CON MODO DE TRANSMISION PREDOMINANTEMENTE SEXUAL</option>
                                                <option value='1_6'>OTRAS ENFERMEDADESA ESPIROQUETAS</option>
                                                <option value='1_7'>OTRAS ENFERMEDADES CAUSADAS POR CLAMIDIAS</option>
                                                <option value='1_8'>RICKETTSIOSIS</option>
                                                <option value='1_9'>INFECCIONES VIRALES DEL SISTEMA NERVIOSOS CENTRAL</option>
                                                <option value='1_10'>FIEBRESVIRALES TRANSMITIDAS POR ARTROPODOS Y FIEBRES VIRALES HEMORRAGICAS</option>
                                                <option value='1_11'>INFECCCIONES VIRALES CARACTERIZADAS POR LESIONES DE LA PIEL Y DE LAS MEMBRANAS MUCOSAS</option>
                                                <option value='1_12'>HEPATISIRIS VIRAL</option>
                                                <option value='1_13'>ENFERMEDAD POR VIRUS DE LA INMUNODEFICIENCIA HUMANA [HIH]</option>
                                                <option value='1_14'>OTRAS ENFERMEDADES VIRALES</option>
                                                <option value='1_15'>MICOSIS</option>
                                                <option value='1_16'>ENFERMEDADES DEBIDAS A PROTOZOARIOS</option>
                                                <option value='1_17'>HELMINTIASIS</option>
                                                <option value='1_18'>PEDICULOSIS, ACARIASIS Y OTRAS INFECCIONES</option>
                                                <option value='1_19'>SECUELAS DE ENFERMEDADES INFECCIOSAS Y PARASITARIAS</option>
                                                <option value='1_20'>BACTERIAS, VIRUS, Y OTROS AGENTES INFECCIOSOS</option>
                                                <option value='2_1'>TUMORES (NEIPLASIAS MALIGNOS)</option>
                                                <option value='2_2'>TUMORES [NEOPLASIAS] IN SITU</option>
                                                <option value='2_3'>TUMORES [NEOPLASIAS] BENIGNOS</option>
                                                <option value='2_4'>TUMORES [NEOPLASIAS]DE COMPORTAMIENTO INCIERTO O DESCONOCIDO</option>
                                                <option value='3_1'>ANEMIAS NUTRICIONALES</option>
                                                <option value='3_2'>ANEMIAS HEMILITICAS</option>
                                                <option value='3_3'>ANEMIAS APLASTICAS Y OTRAS ANEMIAS</option>
                                                <option value='3_4'>DEFECTOS DE LA COAGULACION, PURPURA Y OTRAS AFECCIONES HEMORRAGICAS</option>
                                                <option value='3_5'>OTRAS ENFERMEDADES DE LA SANGRE Y DE LOS ORGANOS HEMATOPOYETICOS</option>
                                                <option value='3_6'>CIERTOS TRASTORNOS QUE AFECTAN EL MECANISMO DE LA INMUNIDAD</option>
                                                <option value='4_1'>TRASTORNOS DE LA GLANDULA TIROIDES</option>
                                                <option value='4_2'>DIABETES MELLITUS</option>
                                                <option value='4_3'>OTROS TRASTORNOS DE LA REGULACIÓN DE LA GLUCOSA Y DE LA SECRECION INTERNA DEL PANCREAS</option>
                                                <option value='4_4'>TRASTORNOS DE OTRAS GLANDULAS ENDOCRINAS</option>
                                                <option value='4_5'>DESNUTRICION</option>
                                                <option value='4_6'>OTRAS DEFICIENCIAS NUTRICIONALES</option>
                                                <option value='4_7'>OBESIDAD Y OTROS TIPOS DE HIPERALIMENTACION</option>
                                                <option value='4_8'>TRASTORNOS METABILICOS</option>
                                                <option value='5_1'>TRASTORNOS MENTALES ORGANICOS, INCLUIDOS LOS TRASTORNOS SINTOMATICOS</option>
                                                <option value='5_2'>TRASTORNOS MENTALES Y DEL COMPORTAMIENTO DEBIDO AL USO DE SUSTANCIAS PSICOATIVAS</option>
                                                <option value='5_3'>ESQUIZOFRENIA, TRASTORNOS ESQUIZOTIPICOS Y TRASTORNOS DELIRANTES</option>
                                                <option value='5_4'>TRASTORNOS DEL HUMOR [AFECTIVOS]</option>
                                                <option value='5_5'>TRASTORNOS NEUROTICOS, TRASTORNOS RELACIONADOS CON EL ESTRES Y TRASTORNOS SOMATOMORFOS</option>
                                                <option value='5_6'>SINDROMES DEL COMPORTAMIENTO ASOCIADOS CON ALTERACIONES FISIOLOGICAS Y FACTORES FISICOS</option>
                                                <option value='5_7'>TRASTORNOS DE LA PERSONALIDAD Y DEL COMPORTAMIENTO EN ADULTOS</option>
                                                <option value='5_8'>RETRASO MENTAL</option>
                                                <option value='5_9'>TRASTORNOS DEL DESARROLLO PSICOLOGICO</option>
                                                <option value='5_10'>TRASTORNOS EMOCIONALES Y DEL COMPORTAMIENTO QUE APARECEN HABITUALMENTE EN LA NIÑEZ Y EN LA ADOLESCENCIA</option>
                                                <option value='6_1'>ENFERMEDADES INFLAMATORIAS DEL SISTEMA NERVIOSO CENTRAL</option>
                                                <option value='6_2'>ATROFIAS SISTEMATICAS QUE AFECTAN PRICIPALMENTE EL SISTEMA NERVIOSO CENTRAL</option>
                                                <option value='6_3'>TRASTORNOS EXTRAPIRAMIDALES Y DEL MOVIMIENTO</option>
                                                <option value='6_4'>OTRAS ENFERMEDADES DEGENERATIVAS DEL SISTEMA NERVIOSO</option>
                                                <option value='6_5'>ENFERMEDADES DESMIELIZANTES DEL SISTEMA NERVIOSO CENTRAL</option>
                                                <option value='6_6'>TRASTORNOS EPISODICOS Y PAROXISTICOS</option>
                                                <option value='6_7'>TRASTORNOS DE LOS NERVIOS, DE LAS RAICES DE LOS PLEXOS NERVIOSOS</option>
                                                <option value='6_8'>POLINEUROPATIAS Y OTROS TRASTORNOS DEL SISTEMA NERVIOSO PERIFERICO</option>
                                                <option value='6_9'>ENFERMEDADES MUSCULARES Y DE LA UNION NEUROMUSCULAR</option>
                                                <option value='6_10'>PARALISIS CEREBRAL Y OTROS SINDROMES PARALITICOS</option>
                                                <option value='6_11'>OTROS TRASTORNOS DEL SITEMA NERVIOSO CENTRAL</option>
                                                <option value='7_1'>TRASTORNOS DEL PARPADO, APARATO LAGRIMAL Y ORBITA </option>
                                                <option value='7_2'>TRASTORNOS DE LA CONJUNTIVA</option>
                                                <option value='7_3'>TRASTORNOS DE LA ESCLEROTICA, CORNEA, IRIS Y CUERPO CILIAR</option>
                                                <option value='7_4'>TRASTORNOS DEL CRISTALINO</option>
                                                <option value='7_5'>TRASTORNOS DE LA COROIDES Y DE LA RETINA</option>
                                                <option value='7_6'>GLAUCOMA</option>
                                                <option value='7_7'>TRASTORNOS DEL CUERPO VITREO Y DEL GLOBO OCULAR</option>
                                                <option value='7_8'>TRASTORNOS DEL NERVIO OPTICO Y DE LAS VIAS OPTICA</option>
                                                <option value='7_9'>TRASTORNOS DE LOS MUSCULOS OCULARES, DEL MOVIEMIENTO BINOCULAR, DE LA ACOMODACION Y DE LA REFRACCION</option>
                                                <option value='7_10'>ALTERACIONES DE LA VISION Y CEGUERA</option>
                                                <option value='7_11'>OTROS TRASTORNOS DEL OJO Y SUS ANEXOS</option>
                                                <option value='8_1'>ENFERMEDADES DEL OIDO EXTERNO</option>
                                                <option value='8_2'>ENFERMEDADES DEL OIDO MEDIO Y DE LA MASTOIDES</option>
                                                <option value='8_3'>ENFERMEDADES DEL OIDO EINTERNO</option>
                                                <option value='8_4'>OTROS TRASTORNOS DEL OIDO</option>
                                                <option value='9_1'>FIEBRE REUMATICA AGUDA</option>
                                                <option value='9_2'>ENFERMEDADES CARDIACAS REUMATICAS CRONICAS</option>
                                                <option value='9_3'>ENFERMEDADES HIPERTENSIVAS</option>
                                                <option value='9_4'>ENFERMEDADES ISQUEMICAS DEL CORAZON</option>
                                                <option value='9_5'>ENFERMEDAD CARDIOPULMONAR Y ENFERMEDADES DE LA CIRCULACION PULMONAR</option>
                                                <option value='9_6'>OTRAS FORMAS DE ENFERMEDAD DEL CORAZON</option>
                                                <option value='9_7'>ENFERMEDADES CEREBROVASCULARES</option>
                                                <option value='9_8'>ENFERMEDADES DE LAS ARTERIAS, DE LAS ARTERIOLAS Y DE LOS VASOS CAPILARES</option>
                                                <option value='9_9'>ENFERMEDADES DE LAS VENAS Y DE LOS VASOS GANGLIOS LINFATICOS, NO CLASIFICADAS EN OTRA PARTE</option>
                                                <option value='9_10'>OTROS TRASTORNOS Y DE LOS NO ESPECIFICADOS DEL SISTEMA CIRCULATORIO</option>
                                                <option value='10_1'>INFECCIONES AGUDAS DE LAS VIAS RESPIRATORIAS SUPERIORES</option>
                                                <option value='10_2'>INFLUENZA Y NEUMONIA</option>
                                                <option value='10_3'>OTRAS INFECCIONES AGUDAS DE LAS VIAS RESPIRATORIAS INFERIORES</option>
                                                <option value='10_4'>OTRAS ENFERMEDADES DE LAS VIAS RESPIRATORIAS SUPERIORES</option>
                                                <option value='10_5'>ENFERMEDADES CRONICAS DE LAS VIAS RESPIRATORIAS INFERIORES</option>
                                                <option value='10_6'>ENFERMEDADES DEL PULMON DEBIDAS A AGENTES EXTERNOS</option>
                                                <option value='10_7'>OTRAS ENFERMEDADES RESPIRATORIAS QUE AFECTAN PRINCIPALMENTE AL INTERSTICO </option>
                                                <option value='10_8'>AFECCIONES SUPURATIVAS Y NECROTICAS DE LAS VIAS RESPIRATORIAS INFERIORES</option>
                                                <option value='10_9'>OTRAS ENFERMEDADES DEL SISTEMA RESPIRATORIO</option>
                                                <option value='11_1'>ENFERMEDADES DE LA CAVIDAD BUCAL DE LAS GLANDULAS SALIVALES Y DE LOS MAXILARES</option>
                                                <option value='11_2'>ENFERMEDADES DEL ESOFAGO, DEL ESTOMAGO Y DEL DUODENO</option>
                                                <option value='11_3'>ENFERMEDADES DEL APENDICE</option>
                                                <option value='11_4'>HERNIA HINGUINAL</option>
                                                <option value='11_5'>ENTERITIS Y COLITIS NO INFECCIOSAS</option>
                                                <option value='11_6'>OTRAS ENFERMEDADES DE LOS INTESTINOS</option>
                                                <option value='11_7'>ENFERMEDADES DEL PERITONEO</option>
                                                <option value='11_8'>ENFERMEDADES DEL HIGADO</option>
                                                <option value='11_9'>TRASTORNOS DE LA VESICULA BILIAR, DE LAS VIAS BILIARES Y DEL PANCREAS</option>
                                                <option value='11_10'>OTRAS ENFERMEDADES DEL SISTEMA DIGESTIVO</option>
                                                <option value='12_1'>INFECCIONES DE LA PIEL Y DEL TEJIDO SUBCUTANEO</option>
                                                <option value='12_2'>TRASTORNOS FLICTENULARES</option>
                                                <option value='12_3'>DERMATITIS Y ECZEMA</option>
                                                <option value='12_4'>TRASTORNOS PAPULOESCAMOSOS</option>
                                                <option value='12_5'>URTICARIA Y ERITEMA</option>
                                                <option value='12_6'>TRASTORNOS DE LA PIEL Y DEL TEJIDO SUBCUTANEO RELACIONADOS CON RADIACION</option>
                                                <option value='12_7'>TRASTORNOS DE LAS FANERAS</option>
                                                <option value='12_8'>OTROS TRASTORNOS DE LA PIEL Y DEL TEJIDO SUBCUTANEO</option>
                                                <option value='13_1'>ARTROPATIAS</option>
                                                <option value='13_2'>ARTROSIS</option>
                                                <option value='13_3'>TRASTORNOS SISTEMICOS DEL TEJIDO</option>
                                                <option value='13_4'>DORSOPATIAS</option>
                                                <option value='13_5'>TRASTORNOS DE LOS TEJIDOS BLANDOS</option>
                                                <option value='13_6'>OSTEOPATIAS Y CONDROPATIAS</option>
                                                <option value='13_7'>OTROS TRASTORNOS DEL SISTEMA OSTEOMUSCULAR Y DEL TEJIDO CONJUNTIVO</option>
                                                <option value='14_1'>ENFERMEDADES GLOMERULARES</option>
                                                <option value='14_2'>ENFERMEDAD RENAL TUBUINTERSTICIAL</option>
                                                <option value='14_3'>INSUFICIENCIA RENAL</option>
                                                <option value='14_4'>LITIASIS URINARIA</option>
                                                <option value='14_5'>OTROS TRASTORNOS DEL RIÑON Y DEL URETER</option>
                                                <option value='14_6'>ENFERMEDADES DE LOS ORGANOS GENITALES MASCULINOS</option>
                                                <option value='14_7'>TRASTORNOS DE LA MAMA</option>
                                                <option value='14_8'>ENFERMEDADES INFLAMATORIAS DE LOS ORGANOS PELVICOS FEMENINOS</option>
                                                <option value='14_9'>TRASTORNOS NO INFLAMATORIOS DE LOS ORGANOS GENITALES FEMENINOS</option>
                                                <option value='14_10'>OTROS TRASTORNOS DEL SITEMA GENITOURINARIO</option>
                                                <option value='15_1'>EMBARAZO TERMINADO EN ABORTO</option>
                                                <option value='15_2'>EDEMA, PROTEINURIA Y TRASTORNOS HIPERTENSIVOS EN EL EMBARAZO, EL PARTO Y EL PUERPERIO</option>
                                                <option value='15_3'>ATENCION MATERNA RELACIONADA CON EL FETO Y LA CAVIDAD AMNIOTICA Y CON POSIBLES PROBLEMAS DE PARTO</option>
                                                <option value='15_4'>COMPLICACIONES DEL TRABAJO DE PARTO Y DEL PARTO</option>
                                                <option value='15_5'>PARTO</option>
                                                <option value='15_6'>COMPLICACIONES PRINCIPALMENTE RELACIONADAS CON EL PUERPERIO</option>
                                                <option value='16_1'>FETO Y RECIEN NACIDO AFECTADOS POR FACTORES MATERNOS Y POR COMPLICACIONES DEL EMBARAZO, DEL TRABAJO DE PARTO Y DEL PARTO</option>
                                                <option value='16_2'>TRASTORNOS RELACIONADOS CON LA DURACION DE LA GESTACION Y EL CRECIMIENTO FETAL</option>
                                                <option value='16_3'>TRAUMATISMO DEL NACIMIENTO </option>
                                                <option value='16_4'>TRASTORNOS RESPIRATORIOS Y CARDIOVASCULARES ESPECIFICOS DEL PERIODO PERINATAL</option>
                                                <option value='16_5'>INFECCIONES ESPECIFICAS DEL PERIODO PERINATAL</option>
                                                <option value='16_6'>TRASTORNOS HEMORRAGICOS Y HEMATOLOGICOS DEL FETO Y DEL RECIEN NACIDO</option>
                                                <option value='16_7'>TRASTORNOS ENDOCRINOS Y METABOLICOS TRANSITORIOS ESPECIFICOS DEL FETO Y DEL RECIEN NACIDO</option>
                                                <option value='16_8'>TRASTORNOS DEL SISTEMA DIGESTIVO DEL FETO Y DEL RECIEN NACIDO</option>
                                                <option value='16_9'>AFECCIONES CON LA REGULACION TEGUMENTARIA Y DE LA TEMPERATURA DEL FETO Y DEL RECIEN NACIDO</option>
                                                <option value='16_10'>OTROS TRASTORNOS ORIGINADOS EN EL PERIODO PERINATAL</option>
                                                <option value='17_1'>MALFORMACIONES CONGENITAS DEL SISTEMA NERVIOSO</option>
                                                <option value='17_2'>MALFORMACIONES CONGENITAS DEL OJO, DEL OIDO, DE LA CARA Y DEL CUELLO</option>
                                                <option value='17_3'>MALFORMACIONES CONGENITAS DEL SISTEMA CIRCULATORIO</option>
                                                <option value='17_4'>MALFORMACIONES CONGENITAS DEL SISTEMA RESPIRATORIO</option>
                                                <option value='17_5'>FISURA DEL PALADAR Y LABIO LEPORINO</option>
                                                <option value='17_6'>OTRAS MALFORMACIONES CONGENITAS DEL SISTEMA DIGESTIVO</option>
                                                <option value='17_7'>MALFORMACIONES CONGENITAS DE LOS ORGANOS GENITALES</option>
                                                <option value='17_8'>MALFORMACIONES CONGENITAS DEL SISTEMA URINARIO</option>
                                                <option value='17_9'>MALFORMACIONES Y DEFORMIDADES CONGENITAS DEL SISTEMA OSTEOMUSCULAROTRAS MALFOMACIONES CONGENITAS</option>
                                                <option value='17_10'>OTRAS MALFORMACIONES CONGENITAS</option>
                                                <option value='17_11'>ANOMALIAS CROMOSOMICAS, NO CLASIFICADAS EN OTRA PARTE</option>
                                                <option value='18_1'>SINTOMAS Y SIGNOS QUE INVOLUCRAN LOS SISTEMAS CIRCULATORIO Y RESPIRATORIO</option>
                                                <option value='18_2'>SINTOMAS Y SIGNOS QUE INVOLUCRAN EL SISTEMA DIGESTIVO Y EL ABDOMEN</option>
                                                <option value='18_3'>SINTOMAS Y SIGNOS QUE INVOLUCRAN LA PIEL Y EL TEJIDO SUBCUTANEO</option>
                                                <option value='18_4'>SINTOMAS Y SIGNOS QUE INVOLUCRAN LOS SITEMAS NERVIOSO Y OSTEOMUSCULAR</option>
                                                <option value='18_5'>SINTOMAS Y SIGNOS QUE INVOLUCRAN EL SISTEMA URINARIO</option>
                                                <option value='18_6'>SINTOMAS Y SIGNOS QUE INVOLUCRAN EL CONOCIMIENTO, LA PERCEPCION, EL ESTADO EMOCIONAL Y LA CONDUCTA</option>
                                                <option value='18_7'>SINTOMAS Y SIGNOS QUE INVOLUCRAN EL HABLA Y LA VOZ</option>
                                                <option value='18_8'>SINTOMAS Y SIGNOS GENERALES</option>
                                                <option value='18_9'>HALLAZGOS ANORMALES EN EL EXAMEN DE LA SANGRE, SIN DIAGNOSTICO</option>
                                                <option value='18_10'>HALLAZGOS ANORMALES EN EL EXAMEN DE ORINA, SIN DIAGNOSTICO</option>
                                                <option value='18_11'>HALLAZGOS ANORMALES EN EL EXAMEN DE OTROS LIQUIDOS SUSTANCIAS Y TEJIDOS CORPORALES, SIN DIAGNOSTICO</option>
                                                <option value='18_12'>HALLAZGOS ANORMALES EN DIAGNOSTICO POR IMAGENES Y EN ESTUDIOS FUNCIONALES, SIN DIAGNOSTICO</option>
                                                <option value='18_13'>CAUSAS DE MORTALIDAD MAL DEFINIDAS Y DESCONOCIDAS</option>
                                                <option value='19_1'>TRAUMATIZMOS DE LA CABEZA</option>
                                                <option value='19_2'>TRAUMATISMOS DEL CUELLO</option>
                                                <option value='19_3'>TRAUMATISMOS DEL TORAX</option>
                                                <option value='19_4'>TRAUMATISMOS DEL ABDOMEN, DE LA REGION LUMBOSACRA, DE LA COLUMNA LUMBAR Y DE LA PELVIS</option>
                                                <option value='19_5'>TRAUMATISMOS DEL HOMBRO Y DEL BRAZO</option>
                                                <option value='19_6'>TRAUMATISMOS DEL ANTEBRAZO Y DEL CODO</option>
                                                <option value='19_7'>TRAUMATISMOS DE LA MUÑECA Y DE LA MANO</option>
                                                <option value='19_8'>TRAUMATISMOS DE LA CADERA Y DEL MUSLO</option>
                                                <option value='19_9'>TRAUMATISMOS DE LA RODILLA Y DE LA PIERNA</option>
                                                <option value='19_10'>TRAUMATISMOS DE TOBILLO Y DEL PIE</option>
                                                <option value='19_11'>TRAUMATISMOS QUE AFECTAN MULTIPLES REGIONES DEL CUERPO</option>
                                                <option value='19_12'>EFECTOS DE CUERPOS EXTRAÑOS QUE PENETRAN POR ORIFICIOS NATURALES</option>
                                                <option value='19_13'>QUEMADURAS Y CORROSIONES DE LA SUPERFICIE EXTERNA DEL CUERPO, ESPECIFICADAS POR SITIO</option>
                                                <option value='19_14'>CONGELAMIENTO</option>
                                                <option value='19_15'>ENVENENAMIENTO POR DROGAS, MEDICAMENTOS Y SUSTANCIAS BIOLOGICAS</option>
                                                <option value='19_16'>EFECTOS TOXICOS DE SUSTANCIAS DE PROCEDENCIA PRINCIPALMENTE NO MEDICINAL</option>
                                                <option value='19_17'>OTROS EFECTOS Y LOS NO ESPECIFICADOS DE CAUSAS EXTERNAS</option>
                                                <option value='19_18'>ALGUNAS COMPLICACIONES PRECOCES DE TRAUMATISMOS</option>
                                                <option value='19_19'>COMPLICACIONES DE LA ATENCION MEDICA Y QUIRURGICA NO CLASIFICADA EN OTRA PARTE</option>
                                                <option value='19_20'>SECUELAS DE TRAUMATISMOS, DE ENVENENAMIENTOS Y DE OTRAS CONSECUENCIAS DE CAUSAS EXTERNAS</option>
                                                <option value='20_1'>ACCIDENTE DE TRANSPORTE</option>
                                                <option value='20_2'>OTRAS CAUSAS EXTERNAS DE TRAUMATISMOS ACCIDENTALES</option>
                                                <option value='20_3'>LESIONES AUTOINFLIGIDAS INTENCIONALMENTE</option>
                                                <option value='20_4'>AGRESIONES</option>
                                                <option value='20_5'>EVENTOS DE INTENCIÓN NO DETERMINADA</option>
                                                <option value='20_6'>INTERVENCIÓN LEGAL Y OPERACIONES DE GUERRA</option>
                                                <option value='20_7'>COMPLICACIONES DE LA ATENCION MEDICA Y QUIRURGICA </option>
                                                <option value='20_8'>SECUELAS DE CAUSAS EXTERNAS DE MORBILIDAD Y DE MORTALIDAD</option>
                                                <option value='20_9'>FACTORES SUPLEMENTARIOS RELACIONADOS CON CAUSAS DE MORBILIDAD Y DE MORTALIDAD CLASIFICADAS EN OTRA PARTE</option>
                                                <option value='21_1'>PERSONAS EN CONTACTO CON LOS SERVICIOS DE SALUD PARA INVESTIGACION Y EXAMENES</option>
                                                <option value='21_2'>PERSONAS CON RIESGO DE POTENCIALES PARA SU SALUD, RELACIONADOS CON ENEFERMEDADES TRANSMISIBLES</option>
                                                <option value='21_3'>PERSONAS EN CONTACTO CON LOS SERVICIOS DE SALUD EN CIRCUNSTANCIAS RELACIONADAS CON LA REPRODUCCION</option>
                                                <option value='21_4'>PERSONAS EN CONTACTO CON LOS SERVICIOS DE SALUD PARA PROCEDIMIENTOS ESPECIFICOS Y CUIDADOS DE SALUD</option>
                                                <option value='21_5'>PERSONAS EN CONTACTO CON LOS SERVICIOS DE SALUD POR OTRAS CIRCUNSTANCIAS</option>
                                                <option value='21_6'>PERSONAS CON RIESGOS POTENCIALES PARA SU SALUD, RELACIONADOS CON SU HISTORIA FAMILIAR Y PERSONAL Y ALGUNAS CONDICIONES QUE INFLUYEN SOBRE SU ESTADO DE SALUD</option>
                                                <option value='22_1'>EL SÍNDROME RESPIRATORIO AGUDO [SARS], NO ESPECIFICADO</option>
                                                <option value='22_2'>LOS AGENTES BACTERIANOS RESISTENTES A LOS ANTIBIÓTICOS</option>
                                            </select>
                                    </div>
                                </div>
                                
                                
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={this.reportIncapacidades}>Incapacidades</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Generación de reportes - Contingencia - SOAT</div>
                            <div className="card-body texto">
                                <div className="row">
                                    <div className="col-md-6">
                                            <label htmlFor="contingencia">Contingencia origen</label>
                                            <select name="contingencia" className="form-control form-constrol-sm" onChange={this.handleChange} value={ this.state.contingencia}>
                                                <option value=""></option> 
                                                <option value="1">Enfermedad general</option>
                                                <option value="2">Enfermedad laboral</option>
                                                <option value="3">Accidente de trabajo</option>
                                            </select>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" name="soat" id="soat" value="si" onChange={this.handleChange}/>
                                            <label className="form-check-label" htmlFor="soat">SOAT</label>
                                        </div>
                                    </div>

                                </div>
                                
                                
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={this.reportIncapacidades}>Incapacidades</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Resultados</div>
                            <div className="card-body texto">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="alert alert-success reco" role="alert">
                                           Número de certificados: {this.state.totales.total} 
                                           <br/>
                                           Total días solicitados: {this.state.totales.dias} 
                                        </div>
                                    </div>  
                                    <div className="col-md-6">
                                        <button type="submit" className="btn btn-success" >Exportar Datos</button>
                                    </div>


                                </div>
                                <div className="row">
                                {this.state.datos != '' ? (
                            <TableReportes datos={this.state.datos} />
                        ) : (
                                <p>No hay datos</p>
                            )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>

        );
    }

}

export default Reporte;

if (document.getElementById('reportesContent')) {
    ReactDOM.render(<Reporte/>, document.getElementById('reportesContent'));
}