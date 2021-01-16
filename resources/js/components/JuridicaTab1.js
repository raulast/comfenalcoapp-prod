import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class JuridicaTab1 extends Component {
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
        const {crud}  = this.state;
        if (crud == "u") {
            var njuridica = this.state.juridica;
            njuridica[target.id] = target.value;
            this.props.dataToSend(njuridica, 1);
        }
        
        if (crud == "c") {
            var njuridica = this.state.juridicac;
            njuridica[target.id] = target.value;
            this.props.dataToSend(njuridica, 1);
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
                                <a className="nav-link active" data-toggle="tab" href="#dj">DATOS DE ACCION JURIDICA</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#ngp">NOTIFICACION PARA GESTION PEMEL</a>
                            </li>
                            { this.state.crud != 'c' ?
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#agp">ANALISIS GESTION JURIDICA PEMEL</a>
                                </li>
                             :null}
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#ide">INFORMACION DEMANDANTE Y/O EMPRESA R.CLIENTE</a>
                            </li>
                        </ul>
            
                        <div className="tab-content">
                            <div className="tab-pane container active" id="dj">
                                <div className="row mt-2">
                                    <div className="col-md-6 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group">
                                                    <td>Número radicación juzgado</td>
                                                    <td><input className="form-control" type="text" id="numero_radicacion_juzgado" defaultValue={this.state.crud != 'c' ? juridica[cols[2]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha de recepción juzgado</td>
                                                    <td><input className="form-control" type="date" id="fecha_de_recepcion_juzgado" defaultValue={this.state.crud != 'c' ? juridica[cols[1]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Descripción juzgado</td>
                                                    <td><input className="form-control" type="text" id="descripcion_juzgado" defaultValue={this.state.crud != 'c' ? juridica[cols[32]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Tipo Juzgado</td>
                                                    <td>
                                                        <select className="form-control" id="tipo_juzgado" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != 'c' ? juridica[cols[33]]: ''}>{this.state.crud != 'c' ? juridica[cols[33]]: ''}</option>
                                                            <option defaultValue="ADMINISTRATIVO">ADMINISTRATIVO</option>
                                                            <option defaultValue="CIVIL">CIVIL</option>
                                                            <option defaultValue="CONSTITUCIONAL">CONSTITUCIONAL</option>
                                                            <option defaultValue="DESCONGESTION">DESCONGESTION</option>
                                                            <option defaultValue="FAMILIA">FAMILIA</option>
                                                            <option defaultValue="JUDICATURA">JUDICATURA</option>
                                                            <option defaultValue="LABORAL">LABORAL</option>
                                                            <option defaultValue="ORAL">ORAL</option>
                                                            <option defaultValue="PENAL">PENAL</option>
                                                            <option defaultValue="PEQ CAUSAS">PEQ CAUSAS</option>
                                                            <option defaultValue="PROCURADURIA">PROCURADURIA</option>
                                                            <option defaultValue="PROMISCUO">PROMISCUO</option>
                                                            <option defaultValue="SUPERSALUD">SUPERSALUD</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Tipo acción juridica</td>
                                                    <td>
                                                        <select className="form-control" id="tipo_de_accion_juridica" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != 'c' ? juridica[cols[4]]: ''}>{this.state.crud != 'c' ? juridica[cols[4]]: ''}</option>
                                                            <option defaultValue="DEMANDA">DEMANDA</option>
                                                            <option defaultValue="JURISDICCIONAL">JURISDICCIONAL</option>
                                                            <option defaultValue="TUTELA">TUTELA</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha notificación a juridico</td>
                                                    <td><input className="form-control" type="date" id="fecha_notificacion_a_juridico_1" defaultValue={this.state.crud != 'c' ? juridica[cols[5]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Año notificación a juridico</td>
                                                        <td><input className="form-control" type="text" id="año_notif" defaultValue={this.state.crud != 'c' ? juridica[cols[6]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Mes notificación a juridico</td>
                                                        <td><input className="form-control" type="text" id="mes_notif" defaultValue={this.state.crud != 'c' ? juridica[cols[7]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                <tr className="form-group" >
                                                    <td>Hora notificación a juridico</td>
                                                    <td><input className="form-control" type="text" id="hora_notificacion_a_juridico" defaultValue={this.state.crud != 'c' ? juridica[cols[8]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Nombre abogado EPS</td>
                                                    <td><input className="form-control" type="text" id="nombre_abogado_eps" defaultValue={this.state.crud != 'c' ? juridica[cols[29]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="ngp">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group">
                                                    <td>Aux. apoyo PEMEL</td>
                                                    <td><input className="form-control" type="text" id="aux_apoyo_pemel" defaultValue={this.state.crud != 'c' ? juridica[cols[3]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha solicitud apoyo PEMEL</td>
                                                    <td><input className="form-control" type="date" id="solicitud_apoyo_pemel_fecha" defaultValue={this.state.crud != 'c' ? juridica[cols[9]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Año solicitud apoyo PEMELo</td>
                                                        <td><input className="form-control" type="text" id="año_solicitud_apoyo" defaultValue={this.state.crud != 'c' ? juridica[cols[15]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Mes solicitud apoyo PEMEL</td>
                                                        <td><input className="form-control" type="text" id="mes_solicitud_apoyo" defaultValue={this.state.crud != 'c' ? juridica[cols[16]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                <tr className="form-group" >
                                                    <td>Hora solicitud apoyo PEMEL</td>
                                                    <td><input className="form-control" type="text" id="solicitud_apoyo_pemel_hora" defaultValue={this.state.crud != 'c' ? juridica[cols[10]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha vencimiento entrega apoyo PEMEL</td>
                                                    <td><input className="form-control" type="date" id="pemel_vencimiento_entrega_apoyo_fecha" defaultValue={this.state.crud != 'c' ? juridica[cols[11]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Hora vencimiento entrega apoyo PEMEL</td>
                                                    <td><input className="form-control" type="text" id="pemel_vencimiento_entrega_apoyo_hora" defaultValue={this.state.crud != 'c' ? juridica[cols[12]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Fecha entrega apoyo PEMEL</td>
                                                    <td><input className="form-control" type="date" id="entrega_apoyo_fecha" defaultValue={this.state.crud != 'c' ? juridica[cols[13]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Hora entrega apoyo PEMEL</td>
                                                    <td><input className="form-control" type="text" id="entrega_apoyo_hora" defaultValue={this.state.crud != 'c' ? juridica[cols[14]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group" >
                                                    <td>Vencimiento respuesta juridico</td>
                                                    <td><input className="form-control" type="text" id="vencimiento_respuesta_juridico" defaultValue={this.state.crud != 'c' ? juridica[cols[17]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="agp">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Días límite apoyo</td>
                                                        <td><input className="form-control" type="text" id="dias_limite_apoy" defaultValue={this.state.crud != 'c' ? juridica[cols[18]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Días tiempo respuesta apoyo</td>
                                                        <td><input className="form-control" type="text" id="dias_tiempo_respuesta_apoy" defaultValue={this.state.crud != 'c' ? juridica[cols[19]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Días cumplimiento apoyo</td>
                                                        <td><input className="form-control" type="text" id="dias_cumplimiento_apoy" defaultValue={this.state.crud != 'c' ? juridica[cols[20]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Marca oportunidad apoyo</td>
                                                        <td><input className="form-control" type="text" id="marca_oportunidad_apoy" defaultValue={this.state.crud != 'c' ? juridica[cols[21]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Clasificación días tiempo respuesta apoyo</td>
                                                        <td><input className="form-control" type="text" id="marca_opclasificacion_dias_tiempo_resp_apoyortunidad_apoy" defaultValue={this.state.crud != 'c' ? juridica[cols[22]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Cumpl. apoyo vs Venc. Resp. juridica</td>
                                                        <td><input className="form-control" type="text" id="cumpl_apoyo_vs_venc_resp_juridica" defaultValue={this.state.crud != 'c' ? juridica[cols[23]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Marca oportunidad juridico</td>
                                                        <td><input className="form-control" type="text" id="marca_oportunidad_a_juridico" defaultValue={this.state.crud != 'c' ? juridica[cols[24]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Tiempo reporte a PEMEL</td>
                                                        <td><input className="form-control" type="text" id="tiempo_reporte_a_pemel" defaultValue={this.state.crud != 'c' ? juridica[cols[25]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Clasificación días tiempo reporte PEMEL</td>
                                                        <td><input className="form-control" type="text" id="clasificacion_dias_tiempo_reporte_pemel" defaultValue={this.state.crud != 'c' ? juridica[cols[26]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Días notif. juridico vs Venc. juridico</td>
                                                        <td><input className="form-control" type="text" id="dias_de_notif_juridico_vs_vencim_juridico" defaultValue={this.state.crud != 'c' ? juridica[cols[27]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                                {this.state.crud != 'c' ?
                                                    <tr className="form-group" >
                                                        <td>Difer</td>
                                                        <td><input className="form-control" type="text" id="difer" defaultValue={this.state.crud != 'c' ? juridica[cols[28]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                :null}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="ide">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group">
                                                    <td>Nombre demandante</td>
                                                    <td><input className="form-control" type="text" id="nombre_demandante" defaultValue={this.state.crud != 'c' ? juridica[cols[30]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Nit demandante</td>
                                                    <td><input className="form-control" type="text" id="nit_demandante" defaultValue={this.state.crud != 'c' ? juridica[cols[31]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Regimen del usuario</td>
                                                    <td>
                                                        <select className="form-control" id="regimen_del_usuario" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != 'c' ? juridica[cols[37]]: ''}>{this.state.crud != 'c' ? juridica[cols[37]]: ''}</option>
                                                            <option defaultValue="CONTRIBUTIVO">CONTRIBUTIVO</option>
                                                            <option defaultValue="SUBSIDIADO">SUBSIDIADO</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Tipo cotizante demandante</td>
                                                    <td>
                                                        <select className="form-control" id="tipo_cotizante_demandante" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != 'c' ? juridica[cols[38]]: ''}>{this.state.crud != 'c' ? juridica[cols[38]]: ''}</option>
                                                            <option defaultValue="AFILIADO SUBSIDIADO">AFILIADO SUBSIDIADO</option>
                                                            <option defaultValue="AGREMIADO">AGREMIADO</option>
                                                            <option defaultValue="APORTANTE">APORTANTE</option>
                                                            <option defaultValue="BENEFICIARIO">BENEFICIARIO</option>
                                                            <option defaultValue="DEPENDIENTE">DEPENDIENTE</option>
                                                            <option defaultValue="ESTUDIANTE">ESTUDIANTE</option>
                                                            <option defaultValue="INDEPENDIENTE">INDEPENDIENTE</option>
                                                            <option defaultValue="MADRES COMUNITARIAS">MADRES COMUNITARIAS</option>
                                                            <option defaultValue="NO AFILIADO">NO AFILIADO</option>
                                                            <option defaultValue="PENSIONADO">PENSIONADO</option>
                                                            <option defaultValue="PROTECCIÓN AL CESANTE">PROTECCIÓN AL CESANTE</option>
                                                            <option defaultValue="PROTECCIÓN LABORAL">PROTECCIÓN LABORAL</option>
                                                            <option defaultValue="RETIRADO">RETIRADO</option>
                                                            <option defaultValue="SUSPENDIDO">SUSPENDIDO</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Municipio</td>
                                                    <td>
                                                        <select className="form-control" id="municipio" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != 'c' ? juridica[cols[39]]: ''}>{this.state.crud != 'c' ? juridica[cols[39]]: ''}</option>
                                                            <option defaultValue="BUENAVENTURA">BUENAVENTURA</option>
                                                            <option defaultValue="CALI">CALI</option>
                                                            <option defaultValue="JAMUNDI">JAMUNDI</option>
                                                            <option defaultValue="PALMIRA">PALMIRA</option>
                                                            <option defaultValue="YUMBO">YUMBO</option>
                                                            <option defaultValue="CALI">BOGOTA</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>IPS asignación usuario</td>
                                                    <td>
                                                        <select className="form-control" id="ips_asignacion_usuario" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.crud != 'c' ? juridica[cols[40]]: ''}>{this.state.crud != 'c' ? juridica[cols[40]]: ''}</option>
                                                            <option defaultValue="CISEMCALI">CISEMCALI</option>
                                                            <option defaultValue="CISVIDA">CISVIDA</option>
                                                            <option defaultValue="JAMUNDI">JAMUNDI</option>
                                                            <option defaultValue="MANANTIAL">MANANTIAL</option>
                                                            <option defaultValue="PADO">PADO</option>
                                                            <option defaultValue="RIO CAUCA">RIO CAUCA</option>
                                                            <option defaultValue="SERINSA">SERINSA</option>
                                                            <option defaultValue="SERINSA PALMIRA">SERINSA PALMIRA</option>
                                                            <option defaultValue="SERSALUD">SERSALUD</option>
                                                            <option defaultValue="SERVIMEDIQUIRON">SERVIMEDIQUIRON</option>
                                                            <option defaultValue="YUMBO">YUMBO</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Nombre aportante</td>
                                                    <td><input className="form-control" type="text" id="nombre_aportante" defaultValue={this.state.crud != 'c' ? juridica[cols[41]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Nit aportante</td>
                                                    <td><input className="form-control" type="text" id="nit_aportante" defaultValue={this.state.crud != 'c' ? juridica[cols[42]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Nombre usuario</td>
                                                    <td><input className="form-control" type="text" id="nombre_apellidos_usuario" defaultValue={this.state.crud != 'c' ? juridica[cols[43]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Nit usuario</td>
                                                    <td><input className="form-control" type="text" id="nit_usuario" defaultValue={this.state.crud != 'c' ? juridica[cols[44]]: ''} size="50" onChange={this.handleChange}/></td>
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

export default JuridicaTab1;
