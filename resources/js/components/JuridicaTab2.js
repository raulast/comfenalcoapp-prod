import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { size } from 'lodash';
import axios from 'axios';


class JuridicaTab2 extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            id: props.id,
            enable: props.enable,
            crud: props.crud,
            juridica: {},
            juridicac: {},
            fp: [],
            estados: ['CERRADO', 'SEGUIMIENTO'],
            motivos: ['FALLECIDO', 'IPP', 'NUEVO', 'PENSIONADO', 'REINTEGRADO', 'RETIRADO', 'SEGUIMIENTO', 'TRAMITE DE PENSION'],
        }
        // bind

        this.handleChange = this.handleChange.bind(this);
        this.getJuridica = this.getJuridica.bind(this);
        //this.calcularfp = this.calcularfp.bind(this);
        this.guardarJuridica = this.guardarJuridica.bind(this);
        this.getJuridica()
    }
    guardarJuridica() {
        let url = '';
        if (this.state.crud == "u") {
            url = '/updateJuridica';
        }
        if (this.state.crud == "c") {
            url = '/createJuridica';
        }
        axios.post(url, { datos: this.props.data })
            .then(resp => {
                console.log(resp.data);
                this.props.showToast(resp.data,'success');
                this.state.crud == 'c' ? setTimeout(()=>window.location.reload(),1000): null; 
            })
            .catch(err => {
                this.props.showToast(err,'error');
            })
    }
    getJuridica() {
        if(this.state.crud != 'c'){
            let url = '/getJuridica/' + this.state.id
            axios.get(url)
                .then(resp => {
                    this.setState({
                        juridica: resp.data.data,
                        juridicac: resp.data.data
                    });
                    let newJuridicac = Object.assign({}, this.state.juridicac);
                    // console.log(Object.entries(newState));  
                     Object.keys(newJuridicac).forEach(key => {
                         newJuridicac[key] = "";
                     });
                     this.setState({
                         juridicac : newJuridicac
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    handleChange({ target }) {
        if (this.state.crud == "u") {
            var njuridica = this.state.juridica;
            njuridica[target.id] = target.value;
            this.props.dataToSend(njuridica, 2);
        }
        
        if (this.state.crud == "c") {
            var njuridica = this.state.juridicac;
            njuridica[target.id] = target.value;
            this.props.dataToSend(njuridica, 2);
        }
    }
    render() {
        const { juridica } = this.state;
        const { juridicac } = this.state;
        const { crud } = this.state;

        if (typeof this.state.juridica === 'object') {
            var cols = Object.keys(this.state.juridica)
            //console.log(cols);
        }
        return (
            <div>
                <div className="row mt-2">
                    <div className="col-md-12 texto">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#paj">PRETENCION ACCION JURIDICA</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#fpi">FALLO PRIMERA INSTANCIA</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#fsi">FALLO SEGUNDA INSTANCIA</a>
                            </li>
                        </ul>
            
                        <div className="tab-content">
                            <div className="tab-pane container active" id="paj">
                                <div className="row mt-2">
                                    <div className="col-md-6 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group">
                                                    <td>Temeridad</td>
                                                    <td>
                                                        <select className="form-control" id="temeridad" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[35]]: ''}>{this.state.crud != "c" ? juridica[cols[35]]: ''}</option>
                                                            <option defaultValue="SI">SI</option>
                                                            <option defaultValue="NO">NO</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Area</td>
                                                    <td>
                                                        <select className="form-control" id="area" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[35]]: ''}>{this.state.crud != "c" ? juridica[cols[35]]: ''}</option>
                                                            <option defaultValue="MEL">MEL</option>
                                                            <option defaultValue="PE">PE</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Motivo de acción</td>
                                                    <td>
                                                        <select className="form-control" id="motivo_de_accion" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[36]]: ''}>{this.state.crud != "c" ? juridica[cols[36]]: ''}</option>
                                                            <option defaultValue="COBERTURA EMPRESA">COBERTURA EMPRESA</option>
                                                            <option defaultValue="DERECHO DE PETICION PE">DERECHO DE PETICION PE</option>
                                                            <option defaultValue="AISLAMIENTO COVID">AISLAMIENTO COVID</option>
                                                            <option defaultValue="LICENCIA MATERNIDAD">LICENCIA MATERNIDAD</option>
                                                            <option defaultValue="LICENCIAS DE PATERNIDAD">LICENCIAS DE PATERNIDAD</option>
                                                            <option defaultValue="MORA">MORA</option>
                                                            <option defaultValue="NO APORTES 4 SEMANAS">NO APORTES 4 SEMANAS</option>
                                                            <option defaultValue="PAGO EXTEMPORANEO">PAGO EXTEMPORANEO</option>
                                                            <option defaultValue="PAGO OPORTUNO">PAGO OPORTUNO</option>
                                                            <option defaultValue="ABUSO DEL DERECHO">ABUSO DEL DERECHO</option>
                                                            <option defaultValue="ATENCION EVENTO ATEL">ATENCION EVENTO ATEL</option>
                                                            <option defaultValue="CALIFICACION DE ORIGEN">CALIFICACION DE ORIGEN</option>
                                                            <option defaultValue="CALIFICACION PCLO">CALIFICACION PCLO</option>
                                                            <option defaultValue="CONCEPTO REHABILITACIÓN">CONCEPTO REHABILITACIÓN</option>
                                                            <option defaultValue="DERECHO DE PETICION MEL">DERECHO DE PETICION MEL</option>
                                                            <option defaultValue="DESPIDO LABORAL">DESPIDO LABORAL</option>
                                                            <option defaultValue="MAYOR 180 COBERTURA AFP">MAYOR 180 COBERTURA AFP</option>
                                                            <option defaultValue="MAYOR 540 COBERTURA EPS">MAYOR 540 COBERTURA EPS</option>
                                                            <option defaultValue="REINTEGRO LABORAL">REINTEGRO LABORAL</option>
                                                            <option defaultValue="TRAMITE PENSION">TRAMITE PENSION</option>
                                                            <option defaultValue="TRANSCRIPCION">TRANSCRIPCION</option>
                                                            <option defaultValue="VINCULADO">VINCULADO</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Estado de la notificación</td>
                                                    <td>
                                                        <select className="form-control" id="estado_de_la_notificacion" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[45]]: ''}>{this.state.crud != "c" ? juridica[cols[45]]: ''}</option>
                                                            <option defaultValue="CERRADO">CERRADO</option>
                                                            <option defaultValue="CUMPLIDO">CUMPLIDO</option>
                                                            <option defaultValue="GESTIONADO">GESTIONADO</option>
                                                            <option defaultValue="IMPUGNADO">IMPUGNADO</option>
                                                            <option defaultValue="INCAP CONTINUA PROLONGADA">INCAP CONTINUA PROLONGADA</option>
                                                            <option defaultValue="TRAMITE">TRAMITE</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Cobertura de tutela</td>
                                                    <td>
                                                        <select className="form-control" id="cobertura_de_tutela" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[46]]: ''}>{this.state.crud != "c" ? juridica[cols[46]]: ''}</option>
                                                            <option defaultValue="4 MESES">4 MESES</option>
                                                            <option defaultValue="CPCLO">CPCLO</option>
                                                            <option defaultValue="CRH">CRH</option>
                                                            <option defaultValue="DIAS ACUMULADOS">DIAS ACUMULADOS</option>
                                                            <option defaultValue="FECHA DEFINIDA">FECHA DEFINIDA</option>
                                                            <option defaultValue="PCL / PENSION">PCL / PENSION</option>
                                                            <option defaultValue="PENSION">PENSION</option>
                                                            <option defaultValue="REHABILITACION">REHABILITACION</option>
                                                            <option defaultValue="REINTEGRO">REINTEGRO</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Costo de prestación económica</td>
                                                    <td><input className="form-control" type="text" id="costo_de_prestacion_economica" defaultValue={this.state.crud != "c" ? juridica[cols[66]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="fpi">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group">
                                                    <td>Pronunciamiento EPS</td>
                                                    <td>
                                                        <select className="form-control" id="pronunciamiento_eps" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[47]]: ''}>{this.state.crud != "c" ? juridica[cols[47]]: ''}</option>
                                                            <option defaultValue="SI">SI</option>
                                                            <option defaultValue="NO">NO</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha de fallo</td>
                                                    <td><input className="form-control" type="date" id="fecha_de_fallo" defaultValue={this.state.crud != "c" ? juridica[cols[48]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha notificación fallo a EPS</td>
                                                    <td><input className="form-control" type="date" id="fecha_notificacion_fallo_a_eps" defaultValue={this.state.crud != "c" ? juridica[cols[49]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha notificación fallo a PEMEL</td>
                                                    <td><input className="form-control" type="date" id="fecha_notificacion_fallo_a_pemel" defaultValue={this.state.crud != "c" ? juridica[cols[50]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Sujeto de pago</td>
                                                    <td>
                                                        <select className="form-control" id="sujeto_de_pago" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[51]]: ''}>{this.state.crud != "c" ? juridica[cols[51]]: ''}</option>
                                                            <option defaultValue="AMBOS">AMBOS</option>
                                                            <option defaultValue="APODERADO">APODERADO</option>
                                                            <option defaultValue="CONTRATANTE">CONTRATANTE</option>
                                                            <option defaultValue="EMPRESA">EMPRESA</option>
                                                            <option defaultValue="FAMILIAR">FAMILIAR</option>
                                                            <option defaultValue="INDEPENDIENTE">INDEPENDIENTE</option>
                                                            <option defaultValue="TRABAJADOR DEP">TRABAJADOR DEP</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Decisión juzgado primera instancia impacto EPS</td>
                                                    <td>
                                                        <select className="form-control" id="decision_juzgado_1_instancia_impacto_eps" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[52]]: ''}>{this.state.crud != "c" ? juridica[cols[52]]: ''}</option>
                                                            <option defaultValue="A FAVOR">A FAVOR</option>
                                                            <option defaultValue="DENEGAR">DENEGAR</option>
                                                            <option defaultValue="DESISTIMIENTO">DESISTIMIENTO</option>
                                                            <option defaultValue="DESVINCULAR">DESVINCULAR</option>
                                                            <option defaultValue="EN CONTRA">EN CONTRA</option>
                                                            <option defaultValue="HECHO CUMPLIDO">HECHO CUMPLIDO</option>
                                                            <option defaultValue="HECHO SUPERADO">HECHO SUPERADO</option>
                                                            <option defaultValue="IMPROCEDENTE">IMPROCEDENTE</option>
                                                            <option defaultValue="NEGAR">NEGAR</option>
                                                            <option defaultValue="NO TUTELAR">NO TUTELAR</option>
                                                            <option defaultValue="NULIDAD">NULIDAD</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha cumplimiento de fallo</td>
                                                    <td><input className="form-control" type="date" id="fecha_cumplimiento_fallo" defaultValue={this.state.crud != "c" ? juridica[cols[53]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha vencimiento de fallo</td>
                                                    <td><input className="form-control" type="date" id="fecha_vencimiento_fallo" defaultValue={this.state.crud != "c" ? juridica[cols[54]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Observación cumplimiento de fallo</td>
                                                    <td><input className="form-control" type="text" id="observacion_cumplimiento_fallo" defaultValue={this.state.crud != "c" ? juridica[cols[55]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Decisión a tomar post fallo</td>
                                                    <td>
                                                        <select className="form-control" id="decision_a_tomar_impugnar_post_fallo" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[56]]: ''}>{this.state.crud != "c" ? juridica[cols[56]]: ''}</option>
                                                            <option defaultValue="NO IMPUGNAR">NO IMPUGNAR</option>
                                                            <option defaultValue="IMPUGNAR">IMPUGNAR</option>
                                                            <option defaultValue="MODULAR">MODULAR</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha impugnación</td>
                                                    <td><input className="form-control" type="date" id="fecha_impugnacion" defaultValue={this.state.crud != "c" ? juridica[cols[57]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>¿Quién toma decisión post fallo?</td>
                                                    <td>
                                                        <select className="form-control" id="quien_toma_desicion" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[58]]: ''}>{this.state.crud != "c" ? juridica[cols[58]]: ''}</option>
                                                            <option defaultValue="AFP">AFP</option>
                                                            <option defaultValue="ARL">ARL</option>
                                                            <option defaultValue="DEMANDANTE">DEMANDANTE</option>
                                                            <option defaultValue="EMPRESA">EMPRESA</option>
                                                            <option defaultValue="EPS">EPS</option>
                                                            <option defaultValue="USUARIO">USUARIO</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="fsi">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group" >
                                                    <td>Fecha de fallo segunda instancia</td>
                                                    <td><input className="form-control" type="date" id="fecha_fallo_segunda_instancia" defaultValue={this.state.crud != "c" ? juridica[cols[59]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha notificación fallo a Juridico</td>
                                                    <td><input className="form-control" type="date" id="fecha_notificacion_a_juridico_2" defaultValue={this.state.crud != "c" ? juridica[cols[60]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha entrga fallo segunda instancia a PEMEL</td>
                                                    <td><input className="form-control" type="date" id="fecha_entrega_fallo_2da_insta_a_pemel" defaultValue={this.state.crud != "c" ? juridica[cols[61]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Decisión segunda instancia</td>
                                                    <td>
                                                        <select className="form-control" id="decision_segunda_instancia" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[62]]: ''}>{this.state.crud != "c" ? juridica[cols[62]]: ''}</option>
                                                            <option defaultValue="CONFIRMA">CONFIRMA</option>
                                                            <option defaultValue="MODIFICA">MODIFICA</option>
                                                            <option defaultValue="MODULA">MODULA</option>
                                                            <option defaultValue="NO MODULA">NO MODULA</option>
                                                            <option defaultValue="REVOCA PARCIAL">REVOCA PARCIAL</option>
                                                            <option defaultValue="REVOCAR TOTAL">REVOCAR TOTAL</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Decisión final ajustada impacto EPS</td>
                                                    <td>
                                                        <select className="form-control" id="desisicon_final_ajustada_impacto_eps" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[63]]: ''}>{this.state.crud != "c" ? juridica[cols[63]]: ''}</option>
                                                            <option defaultValue="A FAVOR">A FAVOR</option>
                                                            <option defaultValue="EN CONTRA">EN CONTRA</option>
                                                            <option defaultValue="IMPROCEDENTE">IMPROCEDENTE</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Actividad a realizar según fallo</td>
                                                    <td><input className="form-control" type="text" id="actividad_a_realizar_segun_fallo" defaultValue={this.state.crud != "c" ? juridica[cols[64]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha cumplimiento fallo segunda instancia</td>
                                                    <td><input className="form-control" type="date" id="fecha_cumplimiento_fallo_2da_instancia" defaultValue={this.state.crud != "c" ? juridica[cols[65]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
                { this.state.enable == "1" ?
                <div className="row mt-4">
                    <div className="col-md-6 offset-md-3 texto">
                        <button className="btn btn-success btn-block" onClick={this.guardarJuridica}>GUARDAR CAMBIOS</button>
                    </div>                                            
                </div>
                : ''
                }
            </div>
        );
    }

}

export default JuridicaTab2;
