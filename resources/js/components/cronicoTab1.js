import React, { Component } from 'react';
import { size } from 'lodash';
import axios from 'axios';



class CronicoTab1 extends Component {
    constructor(props) {
        super(props);
       // console.log(props)
        this.state = {
            id: props.id,
            enable:props.enable,
            cronico:{},
            fp:[],
            estados: ['CERRADO', 'SEGUIMIENTO'],
            motivos: ['FALLECIDO', 'IPP', 'NUEVO', 'PENSIONADO', 'REINTEGRADO', 'RETIRADO', 'SEGUIMIENTO', 'TRAMITE DE PENSION', 'REVISION'],
        }
        // bind
        
        this.handleChange = this.handleChange.bind(this);
        this.getCronico = this.getCronico.bind(this);
        this.calcularfp = this.calcularfp.bind(this);
        this.guardarCronico = this.guardarCronico.bind(this);
        this.getCronico()
    }
    guardarCronico({target}){
        target.disabled = true;
        let url = '';
        if(this.state.id != 0) {
            url = '/updateCronico';
        } else {
            url = '/addCronico';
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
    getCronico() {
        if(this.state.id != 0) {
            let url = '/getCronico/'+this.state.id
            axios.get(url)
                .then(resp => {
                    console.log(resp.data.data);
                    this.setState({
                        cronico: resp.data.data,
                    });
                    this.calcularfp()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    handleChange({target}) {
        var ncronico = this.state.cronico;
        ncronico[target.id]=target.value; 
        this.props.dataToSend(ncronico, 1);
    }
    calcularfp(){
        
        let f120 = new Date(this.state.cronico["fecha_it_inicio_ciclo"]);
        f120 = new Date(f120.setTime( f120.getTime() + 119 * 86400000 )).getTime();
        f120=new Date(f120).toISOString().slice(0,10);
        console.log(f120);

        let f150 = new Date(this.state.cronico["fecha_it_inicio_ciclo"]);
        f150 = new Date(f150.setTime( f150.getTime() + 149 * 86400000 )).getTime();
        f150=new Date(f150).toISOString().slice(0,10);
        console.log(f150);

        let f180 = new Date(this.state.cronico["fecha_it_inicio_ciclo"]);
        f180 = new Date(f180.setTime( f180.getTime() + 179 * 86400000 )).getTime();
        f180=new Date(f180).toISOString().slice(0,10);
        console.log(f180);

        let f540 = new Date(this.state.cronico["fecha_it_inicio_ciclo"]);
        f540 = new Date(f540.setTime( f540.getTime() + 539 * 86400000 )).getTime();
        f540=new Date(f540).toISOString().slice(0,10);
        console.log(f540);
        
        let fp = [f120,f150,f180,f540]
        this.setState({
           fp : fp
        });
    }

    render() {
        const { cronico } = this.state;        
        if (typeof this.state.cronico === 'object'){
            var cols=Object.keys(this.state.cronico)
            //console.log(cols);            
            cronico.length != 0 ? console.log('cronico:', cronico): null;
        }

        return (
            <div>
                <div className="row mt-2">
                    <div className="col-md-12 texto">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#ns">NOTIFICACIÓN (SIR)</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#esu">INFORMACION DEMOGRAFICA USUARIO Y EMPRESA (REGISTRO CLIENTE)</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#mel">MEL CITAS AGENDA</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#sico">SICOLOGIA CITAS AGENDA</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#ic">GESTION DEL CASO MEL (SIR)</a>
                            </li>
                        </ul>

            
                        <div className="tab-content">
                            <div className="tab-pane container active" id="ns">
                                <div className="row mt-2">
                                    <div className="col-md-6 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group" >
                                                    <td>Número notificación</td>
                                                    <td><input className="form-control" type="text" id="numero_notificacion" defaultValue={this.state.id != 0 ? cronico[cols[2]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Fecha notificación</td>
                                                    <td><input className="form-control" type="date" id="fecha_notificacion" defaultValue={this.state.id != 0 ? cronico[cols[3]]: ''} onChange={this.handleChange}/></td>
                                                </tr>
                                                { this.state.id != 0 ?
                                                    <tr className="form-group">
                                                        <td>Año notificación</td>
                                                        <td><input className="form-control" disabled type="text" id="ano_notificacion" defaultValue={this.state.id != 0 ? cronico[cols[4]]: ''} onChange={this.handleChange}/></td>
                                                    </tr>
                                                    : null
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="esu">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group"><td>Tipo ID usuario</td><td><input className="form-control" type="text" id="tipo_id_usuario"  defaultValue={this.state.id != 0 ? cronico[cols[5]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>ID usuario</td><td><input className="form-control" type="text" id="id_usuario"  defaultValue={this.state.id != 0 ? cronico[cols[6]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                {this.state.id != 0 ?
                                                    <tr className="form-group"><td>CC repetidos</td><td><input className="form-control" type="text" id="cc_repetidos"  defaultValue={this.state.id != 0 ? cronico[cols[7]] : ''} size="50" onChange={this.handleChange}/></td></tr>
                                                : null}
                                                {this.state.id != 0 ?
                                                    <tr className="form-group"><td>Cantidad de ciclos</td><td><input className="form-control" type="text" id="cant_ciclos"  defaultValue={this.state.id != 0 ? cronico[cols[8]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                :null}
                                                <tr className="form-group"><td>Primer nombre</td><td><input className="form-control" type="text" id="nombre_1_usuario"  defaultValue={this.state.id != 0 ? cronico[cols[9]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Segundo nombre</td><td><input className="form-control" type="text" id="nombre_2_usuario"  defaultValue={this.state.id != 0 ? cronico[cols[10]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Primer apellido</td><td><input className="form-control" type="text" id="apellido_1_usuario"  defaultValue={this.state.id != 0 ? cronico[cols[11]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Segundo apellido</td><td><input className="form-control" type="text" id="apellido_2_usuario"  defaultValue={this.state.id != 0 ? cronico[cols[12]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Tipo afiliado</td><td><input className="form-control" type="text" id="tipo_afiliado"  defaultValue={this.state.id != 0 ? cronico[cols[13]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Estado afiliado</td><td><input className="form-control" type="text" id="estado_afiliado"  defaultValue={this.state.id != 0 ? cronico[cols[14]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Tipo afiliado población</td><td><input className="form-control" type="text" id="tipo_afiliado_poblacion_mayo2020"  defaultValue={this.state.id != 0 ? cronico[cols[15]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Estado afiliado población</td><td><input className="form-control" type="text" id="estado_afiliado_poblacion_mayo2020"  defaultValue={this.state.id != 0 ? cronico[cols[16]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Telefono fijo usuario</td><td><input className="form-control" type="text" id="telefono_fijo_usuario"  defaultValue={this.state.id != 0 ? cronico[cols[17]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Celular usuario</td><td><input className="form-control" type="text" id="celular_usuario"  defaultValue={this.state.id != 0 ? cronico[cols[18]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Email usuario</td><td><input className="form-control" type="email" id="e mail_usuario"  defaultValue={this.state.id != 0 ? cronico[cols[19]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Apellidos y Nombres acudiente</td><td><input className="form-control" type="text" id="apellidos_nombres_acudiente"  defaultValue={this.state.id != 0 ? cronico[cols[20]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Telefono fijo acudiente</td><td><input className="form-control" type="text" id="telefono_fijo_acudiente"  defaultValue={this.state.id != 0 ? cronico[cols[21]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Celular acudiente</td><td><input className="form-control" type="text" id="telefono_celular_acudiente"  defaultValue={this.state.id != 0 ? cronico[cols[22]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Email acudiente</td><td><input className="form-control" type="email" id="e mail_acudiente"  defaultValue={this.state.id != 0 ? cronico[cols[23]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Tipo ID aportante</td><td><input className="form-control" type="text" id="tipo_id_aportante"  defaultValue={this.state.id != 0 ? cronico[cols[24]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Nit aportante</td><td><input className="form-control" type="text" id="nit_aportante"  defaultValue={this.state.id != 0 ? cronico[cols[25]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Nombre aportante</td><td><input className="form-control" type="text" id="nombre_aportante"  defaultValue={this.state.id != 0 ? cronico[cols[26]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Código ARL</td><td><input className="form-control" type="text" id="cod_arl"  defaultValue={this.state.id != 0 ? cronico[cols[27]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group">
                                                    <td>Nombre ARL</td>
                                                    <td>
                                                        <select className="form-control" id="nombre_arl" onChange={this.handleChange}>
                                                            <option value={this.state.id != 0 ? cronico[cols[28]]: ''}>{this.state.id != 0 ? cronico[cols[28]]: ''}</option>
                                                            <option value="SURA">SURA</option>
                                                            <option value="COLMENA">COLMENA</option>
                                                            <option value="ALFA">ALFA</option>
                                                            <option value="COLPATRIA">COLPATRIA</option>
                                                            <option value="LIBERTY">LIBERTY</option>
                                                            <option value="EQUIDAD">EQUIDAD</option>
                                                            <option value="MAPFRE">MAPFRE</option>
                                                            <option value="BOLIVAR">BOLIVAR</option>
                                                            <option value="POSITIVA">POSITIVA</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group"><td>Código AFP</td><td><input className="form-control" type="text" id="cod_afp"  defaultValue={this.state.id != 0 ? cronico[cols[29]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group">
                                                    <td>Nombre AFP</td>
                                                    <td>
                                                        <select className="form-control" id="nombre_afp" onChange={this.handleChange}>
                                                            <option value={this.state.id != 0 ? cronico[cols[30]]: ''}>{this.state.id != 0 ? cronico[cols[30]]: ''}</option>
                                                            <option value="COLFONDOSCOLPENSIONES">COLFONDOSCOLPENSIONES</option>
                                                            <option value="COLPENSIONES">COLPENSIONES</option>
                                                            <option value="COLPENSIONES/PROTECCION">COLPENSIONES/PROTECCION</option>
                                                            <option value="NO TIENE">NO TIENE</option>
                                                            <option value="OLD MUTUAL">OLD MUTUAL</option>
                                                            <option value="PORVENIR">PORVENIR</option>
                                                            <option value="PROTECCION">PROTECCION</option>
                                                            <option value="SKANDIA">SKANDIA</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group"><td>Municipio</td><td><input className="form-control" type="text" id="municipio"  defaultValue={this.state.id != 0 ? cronico[cols[31]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Código municipio</td><td><input className="form-control" type="text" id="codigo_municipio"  defaultValue={this.state.id != 0 ? cronico[cols[32]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>NIT IPS primaria</td><td><input className="form-control" type="text" id="nit_ips_primaria"  defaultValue={this.state.id != 0 ? cronico[cols[33]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Nombre IPS</td><td><input className="form-control" type="text" id="nombre_ips"  defaultValue={this.state.id != 0 ? cronico[cols[34]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Nombre Medico Laboral (MEL)</td><td><input className="form-control" type="text" id="nombre_medico_laboral_(mel)"  defaultValue={this.state.id != 0 ? cronico[cols[35]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group"><td>Número licencia (MEL)</td><td><input className="form-control" type="text" id="no_licencia_medico_laboral"  defaultValue={this.state.id != 0 ? cronico[cols[36]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="mel">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group">
                                                    <td>Fecha primera asistio mel</td>
                                                    <td><input className="form-control" type="date" id="fecha_primera_asistio_mel" defaultValue={this.state.id != 0 ? cronico[cols[37]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Fecha ultima cita mel</td>
                                                    <td><input className="form-control" type="date" id="fecha_ultima_cita_mel" defaultValue={this.state.id != 0 ? cronico[cols[38]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Fecha próxima mel</td>
                                                    <td><input className="form-control" type="date" id="fecha_proxima_mel" defaultValue={this.state.id != 0 ? cronico[cols[39]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="sico">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group">
                                                    <td>Fecha primera asistio sic</td>
                                                    <td><input className="form-control" type="date" id="fecha_primera_asistio_sic" defaultValue={this.state.id != 0 ? cronico[cols[40]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Fecha ultima cita sic</td>
                                                    <td><input className="form-control" type="date" id="fecha_ultima_cita_sic" defaultValue={this.state.id != 0 ? cronico[cols[41]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Fecha próxima sic</td>
                                                    <td><input className="form-control" type="date" id="fecha_proxima_sic" defaultValue={this.state.id != 0 ? cronico[cols[42]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="ic">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                <tr className="form-group">
                                                    <td>Días acumulados a identificación caso</td>
                                                    <td><input className="form-control" type="text" id="dias_acumulados_a_identificacion_caso" defaultValue={this.state.id != 0 ? cronico[cols[43]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Fecha fin IT días acumulados a identificación</td>
                                                    <td><input className="form-control" type="date" id="fecha_fin_it_dias_acumulados_a_indetificacion" defaultValue={this.state.id != 0 ? cronico[cols[44]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Tipo seguimiento</td>
                                                    <td>
                                                        <select className="form-control" id="tipo_seguimiento" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.id != 0 ? cronico[cols[45]]: ''}>{this.state.id != 0 ? cronico[cols[45]]: ''}</option>
                                                            <option defaultValue="CPCLO">CPCLO</option>
                                                            <option defaultValue="ICP">ICP</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Estado seguimiento</td>
                                                    <td>
                                                        <select className="form-control" id="estado_seguimiento" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.id != 0 ? cronico[cols[46]]: ''}>{this.state.id != 0 ? cronico[cols[46]]: ''}</option>
                                                            {this.state.estados.map((e) =>
                                                                <option defaultValue={e}>{e}</option>
                                                            )}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Motivo estado seguimiento</td>
                                                    <td>
                                                        <select className="form-control" id="motivo_estado_seguimiento" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.id != 0 ? cronico[cols[47]]: ''}>{this.state.id != 0 ? cronico[cols[47]]: ''}</option>
                                                            {this.state.motivos.map((e) =>
                                                                <option defaultValue={e}>{e}</option>
                                                            )}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Cie10 evento seguimiento</td>
                                                    <td><input className="form-control" type="text" id="cie10_evento_seguimiento" defaultValue={this.state.id != 0 ? cronico[cols[48]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Descripcion Cie10</td>
                                                    <td><input className="form-control" type="text" id="descripcion_cie10" defaultValue={this.state.id != 0 ? cronico[cols[49]]: ''} size="50" onChange={this.handleChange}/></td>
                                                </tr>
                                                <tr className="form-group">
                                                    <td>Contingencia origen inicial</td>
                                                    <td>
                                                        <select className="form-control" id="contingencia_origen_inicial" onChange={this.handleChange}>
                                                            <option defaultValue={this.state.id != 0 ? cronico[cols[50]]: ''}>{this.state.id != 0 ? cronico[cols[50]]: ''}</option>
                                                            <option value="EG">EG</option>
                                                            <option value="AT">AT</option>
                                                            <option value="EL">EL</option>
                                                        </select>
                                                    </td>
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
                        <button className="btn btn-success btn-block" onClick={this.guardarCronico}>GUARDAR CAMBIOS</button>
                    </div>                                            
                </div>
                : ''
                }
            </div>
        );
    }

}

export default CronicoTab1;
