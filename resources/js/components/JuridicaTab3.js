import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { size } from 'lodash';
import axios from 'axios';


class JuridicaTab3 extends Component {
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
                setTimeout(()=>window.location.reload(),300);
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
            this.props.dataToSend(njuridica, 3);
        }

        if (this.state.crud == "c") {
            var njuridica = this.state.juridicac;
            njuridica[target.id] = target.value;
            this.props.dataToSend(njuridica, 3);
        }
    }

    render() {
        const { juridica } = this.state;
        const { juridicac } = this.state;
        const { crud } = this.state;
        // console.log(cronico);

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
                                <a className="nav-link active" data-toggle="tab" href="#sspr">SUPER SALUD PRIMER REQUERIMIENTO</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#sssr">SUPER SALUD SEGUNDO REQUERIMIENTO</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#dpr">DESACATO PRIMER REQUERIMIENTO</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#dsr">DESACATO SEGUNDO REQUERIMIENTO</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#sd">SANCIÓN DESACATO</a>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane container active" id="sspr">
                                <div className="row mt-2">
                                    <div className="col-md-6 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group">
                                                    <td>Número radicado req. 1 SUPERSALUD</td>
                                                    <td><input className="form-control" type="text" id="numero_radicado_requerimiento_1_supersalud" defaultValue={this.state.crud != "c" ? juridica[cols[67]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha requerimiento</td>
                                                    <td><input className="form-control" type="date" id="fecha_requerimientos_1" defaultValue={this.state.crud != "c" ? juridica[cols[68]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Año requerimiento</td>
                                                        <td><input className="form-control" type="text" id="año_req_1" defaultValue={this.state.crud != "c" ? juridica[cols[69]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Mes requerimiento</td>
                                                        <td><input className="form-control" type="text" id="mes_req_1" defaultValue={this.state.crud != "c" ? juridica[cols[70]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                <tr className="form-group" >
                                                    <td>Fecha entrega PEMEL requerimiento</td>
                                                    <td><input className="form-control" type="date" id="fecha_entrega_pemel_requerimiento_1" defaultValue={this.state.crud != "c" ? juridica[cols[71]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha soporte requerimiento</td>
                                                    <td><input className="form-control" type="date" id="fecha_soporte_requerimiento_1" defaultValue={this.state.crud != "c" ? juridica[cols[72]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha cumplimiento requerimiento</td>
                                                    <td><input className="form-control" type="date" id="fecha_cumplimiento_requerimiento_1" defaultValue={this.state.crud != "c" ? juridica[cols[73]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Observación requerimiento</td>
                                                    <td><input className="form-control" type="text" id="observacion_requerimiento_1" defaultValue={this.state.crud != "c" ? juridica[cols[74]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="sssr">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                            <tr className="form-group">
                                                    <td>Número radicado req. 2 SUPERSALUD</td>
                                                    <td><input className="form-control" type="text" id="numero_radicado_requerimiento_2_supersalud" defaultValue={this.state.crud != "c" ? juridica[cols[75]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha requerimiento 2</td>
                                                    <td><input className="form-control" type="date" id="fecha_requerimiento_2" defaultValue={this.state.crud != "c" ? juridica[cols[76]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Año requerimiento 2</td>
                                                        <td><input className="form-control" type="text" id="año_req_2" defaultValue={this.state.crud != "c" ? juridica[cols[77]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Mes requerimiento 2</td>
                                                        <td><input className="form-control" type="text" id="mes_req_2" defaultValue={this.state.crud != "c" ? juridica[cols[78]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                <tr className="form-group" >
                                                    <td>Fecha entrega PEMEL requerimiento 2</td>
                                                    <td><input className="form-control" type="date" id="fecha_entrega_pemel_requerimiento_2" defaultValue={this.state.crud != "c" ? juridica[cols[79]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha soporte requerimiento 2</td>
                                                    <td><input className="form-control" type="date" id="fecha_soporte_requerimiento_2" defaultValue={this.state.crud != "c" ? juridica[cols[80]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha cumplimiento requerimiento 2</td>
                                                    <td><input className="form-control" type="date" id="fecha_cumplimiento_requerimiento_2" defaultValue={this.state.crud != "c" ? juridica[cols[81]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Observación requerimiento 2</td>
                                                    <td><input className="form-control" type="text" id="observacion_requerimiento_2" defaultValue={this.state.crud != "c" ? juridica[cols[82]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="dpr">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group" >
                                                    <td>Fecha incidente o primer requerimiento desacato 1</td>
                                                    <td><input className="form-control" type="date" id="fecha_incidente_o_primer_requerimiento_desacato_1" defaultValue={this.state.crud != "c" ? juridica[cols[83]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Año desacato 1</td>
                                                        <td><input className="form-control" type="text" id="año_desac_1" defaultValue={this.state.crud != "c" ? juridica[cols[84]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Mes desacato 1</td>
                                                        <td><input className="form-control" type="text" id="mes_desca_1" defaultValue={this.state.crud != "c" ? juridica[cols[85]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                <tr className="form-group" >
                                                    <td>Fecha notificación juridico</td>
                                                    <td><input className="form-control" type="date" id="fecha_notificacion_juridico_3" defaultValue={this.state.crud != "c" ? juridica[cols[86]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha entrgea PEMEL desacato 1</td>
                                                    <td><input className="form-control" type="date" id="fecha_entrega_pemel_desacato_1" defaultValue={this.state.crud != "c" ? juridica[cols[87]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha soporte desacato 1</td>
                                                    <td><input className="form-control" type="date" id="fecha_soporte_desacato_1" defaultValue={this.state.crud != "c" ? juridica[cols[88]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha cumplimiento desacato 1</td>
                                                    <td><input className="form-control" type="date" id="fecha_cumplimiento_desacato_1" defaultValue={this.state.crud != "c" ? juridica[cols[89]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha cierre desacato 1</td>
                                                    <td><input className="form-control" type="date" id="fecha_cierre_desacato_1" defaultValue={this.state.crud != "c" ? juridica[cols[90]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Tipo sanción no cumplimiento fallo desacato 1</td>
                                                    <td>
                                                        <select className="form-control" id="tipo_sancion_no_cumplimiento_fallo_desacato_mas_requrimiento" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[91]]: ''}>{this.state.crud != "c" ? juridica[cols[91]]: ''}</option>
                                                            <option defaultValue="ARRESTO">ARRESTO</option>
                                                            <option defaultValue="ECONOMICA">ECONOMICA</option>
                                                            <option defaultValue="ECONOMICA+ARRESTO">ECONOMICA+ARRESTO</option>
                                                            <option defaultValue="ENVIO SOPORTES">ENVIO SOPORTES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Magnitud sanción arresto días</td>
                                                    <td><input className="form-control" type="text" id="magnitud_sancion_arresto_dias_1" defaultValue={this.state.crud != "c" ? juridica[cols[92]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Magnitud sanción $</td>
                                                    <td><input className="form-control" type="text" id="magnitud_sancion_1" defaultValue={this.state.crud != "c" ? juridica[cols[93]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="dsr">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                            <tr className="form-group" >
                                                    <td>Fecha requerimiento desacato 2</td>
                                                    <td><input className="form-control" type="date" id="fecha_requerimiento_o_desacato_2" defaultValue={this.state.crud != "c" ? juridica[cols[94]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Año desacato 2</td>
                                                        <td><input className="form-control" type="text" id="año_desac_2" defaultValue={this.state.crud != "c" ? juridica[cols[95]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Mes desacato 2</td>
                                                        <td><input className="form-control" type="text" id="mes_desca_2" defaultValue={this.state.crud != "c" ? juridica[cols[96]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                <tr className="form-group" >
                                                    <td>Fecha notificación juridico</td>
                                                    <td><input className="form-control" type="date" id="fecha_notificacion_juridico_4" defaultValue={this.state.crud != "c" ? juridica[cols[97]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha entrgea PEMEL desacato 2</td>
                                                    <td><input className="form-control" type="date" id="fecha_entrega_pemel_desacato_2" defaultValue={this.state.crud != "c" ? juridica[cols[98]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha soporte desacato 2</td>
                                                    <td><input className="form-control" type="date" id="fecha_soporte_desacato_2" defaultValue={this.state.crud != "c" ? juridica[cols[99]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha cumplimiento desacato 2</td>
                                                    <td><input className="form-control" type="date" id="fecha_cumplimiento_desacato_2" defaultValue={this.state.crud != "c" ? juridica[cols[100]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha cierre desacato 2</td>
                                                    <td><input className="form-control" type="date" id="fecha_cierre_desacato_2" defaultValue={this.state.crud != "c" ? juridica[cols[101]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Tipo sanción no cumplimiento fallo desacato 2</td>
                                                    <td>
                                                        <select className="form-control" id="tipo_sancion_no_cumplimiento_fallo_desacato_2" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != "c" ? juridica[cols[102]]: ''}>{this.state.crud != "c" ? juridica[cols[102]]: ''}</option>
                                                            <option defaultValue="ARRESTO">ARRESTO</option>
                                                            <option defaultValue="ECONOMICA">ECONOMICA</option>
                                                            <option defaultValue="ECONOMICA+ARRESTO">ECONOMICA+ARRESTO</option>
                                                            <option defaultValue="ENVIO SOPORTES">ENVIO SOPORTES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Magnitud sanción arresto días</td>
                                                    <td><input className="form-control" type="text" id="magnitud_sancion_arresto_dias_2" defaultValue={this.state.crud != "c" ? juridica[cols[103]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Magnitud sanción $</td>
                                                    <td><input className="form-control" type="text" id="magnitud_sancion_desacato" defaultValue={this.state.crud != "c" ? juridica[cols[104]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="sd">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group" >
                                                    <td>Fecha sanción</td>
                                                    <td><input className="form-control" type="date" id="fecha_sancion" defaultValue={this.state.crud != "c" ? juridica[cols[105]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Año sanción</td>
                                                        <td><input className="form-control" type="text" id="año_sancion" defaultValue={this.state.crud != "c" ? juridica[cols[106]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Mes sanción</td>
                                                        <td><input className="form-control" type="text" id="mes_sancion" defaultValue={this.state.crud != "c" ? juridica[cols[107]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                <tr className="form-group" >
                                                    <td>Fecha notificación sanción a juridico</td>
                                                    <td><input className="form-control" type="date" id="fecha_notificacion_sancion_a_jur" defaultValue={this.state.crud != "c" ? juridica[cols[108]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha notificación sanción a PEMEL </td>
                                                    <td><input className="form-control" type="date" id="fecha_notificacion_sancion_a_pemel" defaultValue={this.state.crud != "c" ? juridica[cols[109]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha soporte sanción</td>
                                                    <td><input className="form-control" type="date" id="fecha_soporte_sancion" defaultValue={this.state.crud != "c" ? juridica[cols[110]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha cierre sanción</td>
                                                    <td><input className="form-control" type="date" id="cierre_sancion" defaultValue={this.state.crud != "c" ? juridica[cols[113]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Magnitud sanción arresto días</td>
                                                    <td><input className="form-control" type="text" id="magnitud_sancion_arresto_dias_3" defaultValue={this.state.crud != "c" ? juridica[cols[111]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Magnitud sanción $</td>
                                                    <td><input className="form-control" type="text" id="magnitud_sancion_2" defaultValue={this.state.crud != "c" ? juridica[cols[112]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Observación</td>
                                                    <td><input className="form-control" type="text" id="observacion" defaultValue={this.state.crud != "c" ? juridica[cols[114]]: ''} onChange={this.handleChange}/></td>
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

export default JuridicaTab3;
