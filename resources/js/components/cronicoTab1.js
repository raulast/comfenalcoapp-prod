import React, { Component } from 'react';
import { AutoCompleteFunction, AutoCompleteHandler } from './AutoCompleteFunction';
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
            estados: ['CERRADO', 'SEGUIMIENTO', 'REVISION'],
            motivos: ['FALLECIDO', 'IPP', 'NUEVO', 'PENSIONADO', 'REINTEGRADO', 'PERDIDO', 'RETIRADO', 'SEGUIMIENTO', 'TRAMITE DE PENSION'],
            municipio: [
                { nombre: 'ALCALA', codigo: 76020 }, { nombre: 'ANDALUCIA', codigo: 76036 }, { nombre: 'ANSERMANUEVO', codigo: 76041 }, { nombre: 'ARGELIA', codigo: 76054 }, { nombre: 'BOLIVAR', codigo: 76100 }, { nombre: 'BUENAVENTURA', codigo: 76109 },
                { nombre: 'BUGALAGRANDE', codigo: 76113 }, { nombre: 'CAICEDONIA', codigo: 76122 }, { nombre: 'CALIMA', codigo: 76126 }, { nombre: 'CANDELARIA', codigo: 76130 }, { nombre: 'CARTAGO', codigo: 76147 }, { nombre: 'DAGUA', codigo: 76233 }, { nombre: 'EL AGUILA', codigo: 76243 },
                { nombre: 'EL CAIRO', codigo: 76246 }, { nombre: 'EL CERRITO', codigo: 76248 }, { nombre: 'EL DOVIO', codigo: 76250 }, { nombre: 'FLORIDA', codigo: 76275 }, { nombre: 'GINEBRA', codigo: 76306 }, { nombre: 'GUACARI', codigo: 76318 }, { nombre: 'GUADALAJARA DE BUGA', codigo: 76111 },
                { nombre: 'JAMUNDI', codigo: 76364 }, { nombre: 'LA CUMBRE', codigo: 76377 }, { nombre: 'LA UNION', codigo: 76400 }, { nombre: 'LA VICTORIA', codigo: 76403 }, { nombre: 'OBANDO', codigo: 76497 }, { nombre: 'PALMIRA', codigo: 76520 }, { nombre: 'PRADERA', codigo: 76563 },
                { nombre: 'RESTREPO', codigo: 76606 }, { nombre: 'RIOFRIO', codigo: 76616 }, { nombre: 'ROLDANILLO', codigo: 76622 }, { nombre: 'SAN PEDRO', codigo: 76670 }, { nombre: 'SEVILLA', codigo: 76736 }, { nombre: 'TORO', codigo: 76823 }, { nombre: 'TRUJILLO', codigo: 76828 }, { nombre: 'TULUA', codigo: 76834 },
                { nombre: 'ULLOA', codigo: 76845 }, { nombre: 'VERSALLES', codigo: 76863 }, { nombre: 'CALI', codigo: 76001 }, { nombre: 'VIJES', codigo: 76869 }, { nombre: 'YOTOCO', codigo: 76890 }, { nombre: 'YUMBO', codigo: 76892 }, { nombre: 'ZARZAL', codigo: 76895 }, { nombre: 'BUGA', codigo: 76888 }, { nombre: 'DARIEN', codigo: 76898 },
            ],
            ARL: [
                { nombre: 'Riesgos laborales Colmena', codigo: '14-25' }, { nombre: 'SURA - Cia. Suramericana de seguros de vida', codigo: '14-28' },
                { nombre: 'Seguros de vida La Equidad Organismo C.', codigo: '14-29' }, { nombre: 'Mapfre Colombia vida seguros S.A', codigo: '14-30' },
                { nombre: 'Seguros de vida Colpatria S.A', codigo: '14-4' }, { nombre: 'Compañía de Seguros Bolivar S.A', codigo: '14-7' },
                { nombre: 'Liberty Seguros de vida', codigo: '14-18' }, { nombre: 'Positiva Compañía de Seguros S.A', codigo: '14-23' },
                { nombre: 'Seguros de vida Aurora S.A', codigo: '14-8' }, { nombre: 'Seguros de vida Alfa S.A', codigo: '14-17' },
                { nombre: 'Sin ARL', codigo: 'Sin ARL' },
            ],
            AFP: [
                { nombre: 'Administradora de Fondos de Pensiones y Cesantía Protección S.A.', codigo: 230201 }, { nombre: 'Sociedad Administradora de Fondos de Pensiones y Cesantías Porvenir S.A.', codigo: 230301 },
                { nombre: 'Bbva Horizonte Sociedad Administradora de Fondos de Pensiones y de Cesantías S.A', codigo: 230501 }, { nombre: 'Old Mutual Fondo Alternativo de Pensiones', codigo: 230904 },
                { nombre: 'Old Mutual Fondo de Pensiones Obligatorias', codigo: 230901 }, { nombre: 'Compañía Colombiana Administradora de Fondos de Pensiones y Cesantías S.A. COLFONDOS', codigo: 231001 },
                { nombre: 'Pensiones de Antioquia', codigo: '25-7' }, { nombre: 'Instituto de Seguros Sociales I.S.S. Pensiones - Colpénsiones', codigo: '25-14' },
                { nombre: 'Caja de Auxilios y Prestaciones de la Asociación Colombiana de Aviadores Civiles Acdac', codigo: '25-2' }, { nombre: 'Fondo de Previsión Social del Congreso de la República Fonprecon', codigo: '25-3' },
                { nombre: 'Sin AFP', codigo: 'Sin AFP' },
            ],
            IPS: [
                { nombre: 'ATENCION PLANES COMPLEMENTARIOS - CIS VIDA', codigo: 1026 }, { nombre: 'CIS EMCALI', codigo: 2024 },
                { nombre: 'IPS MANANTIAL DE VIDA S.A.S', codigo: 17060 }, { nombre: 'MODELO DE ATENCION DE SALUD GRUPOPADO', codigo: 18001 },
                { nombre: 'SERINSA - NORORIENTE', codigo: 13010 }, { nombre: 'SERINSA - PALMIRA', codigo: 9009 },
                { nombre: 'SERSALUD S.A - SEDE NORTE', codigo: 12007 }, { nombre: 'SERSALUD S.A - SEDE YUMBO', codigo: 16007 },
                { nombre: 'SERVIMEDIC QUIRON S.A.S. - JAMUNDI', codigo: 8005 }, { nombre: 'SERVIMEDIC QUIRON S.A.S. - RIO CAUCA', codigo: 19008 },
                { nombre: 'SERVIMEDIC QUIRON S.A.S. - SUR', codigo: 14029 },
            ],
            MEL: [
                { nombre: 'ANA MARIA PEREZ PEREZ', codigo: '067/18' }, { nombre: 'BARBARA ISABEL PEREA', codigo: '7359/16' },
                { nombre: 'IVETT MILENA CEDENO OLIVO', codigo: '70-224' }, { nombre: 'RICARDO CHAVARRO POLANCO', codigo: '1548/14' },
            ],
        }
        // bind
        
        this.handleChange = this.handleChange.bind(this);
        this.getCronico = this.getCronico.bind(this);
        this.calcularfp = this.calcularfp.bind(this);
        this.guardarCronico = this.guardarCronico.bind(this);
        this.handleAutoSelect = this.handleAutoSelect.bind(this);
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
            this.state.id == 0 ? window.history.back() : null; 
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

    handleAutoSelect(codigo, value, arr, ncronico) {
        let newTarget = document.getElementById(codigo);
        const newValue = AutoCompleteHandler(value, arr);
        newTarget.value = newValue;
        ncronico[codigo] = newValue;
        this.props.dataToSend(ncronico, 1);
    }

    handleChange({target}) {
        let ncronico = this.state.cronico; 
        if (target.id == 'cie10_evento_seguimiento') {
            let newValue = []
            // const newTarget = document.getElementById('descripcion_cie10');
            try {
                console.log('target 2', AutoCompleteFunction(target.value));
            } catch (error) {
                console.error(error);
            }
            
            // newValue = newValue.descripcion_diagnostico;
            // newTarget.value = newValue;
        } else if (target.id == 'municipio') {
            this.handleAutoSelect('codigo_municipio',target.value,this.state.municipio, ncronico);
        } else if (target.id == 'nombre_arl') {
            this.handleAutoSelect('cod_arl',target.value,this.state.ARL, ncronico);
        } else if (target.id == 'nombre_afp') {
            this.handleAutoSelect('cod_afp',target.value,this.state.AFP, ncronico);
        } else if (target.id == 'nombre_ips') {
            this.handleAutoSelect('nit_ips_primaria',target.value,this.state.IPS, ncronico);
        } else if (target.id == 'nombre_medico_laboral_(mel)') {
            this.handleAutoSelect('no_licencia_medico_laboral',target.value,this.state.MEL, ncronico);
        }
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
            cronico.length != 0 ? console.log('cronico:', cronico ): null;
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
                                                    <tr className="form-group"><td>CC repetidos</td><td><input disabled className="form-control" type="text" id="cc_repetidos"  defaultValue={this.state.id != 0 ? cronico[cols[7]] : ''} size="50" onChange={this.handleChange}/></td></tr>
                                                : null}
                                                {this.state.id != 0 ?
                                                    <tr className="form-group"><td>Cantidad de ciclos</td><td><input disabled className="form-control" type="text" id="cant_ciclos"  defaultValue={this.state.id != 0 ? cronico[cols[8]]: ''} size="50" onChange={this.handleChange}/></td></tr>
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
                                                <tr className="form-group">
                                                    <td>Nombre ARL</td>
                                                    <td>
                                                        <select className="form-control" id="nombre_arl" onChange={this.handleChange}>
                                                            <option value={this.state.id != 0 ? cronico[cols[28]]: ''}>{this.state.id != 0 ? cronico[cols[28]]: ''}</option>
                                                            {this.state.ARL.map((e) =>
                                                                <option defaultValue={e.nombre}>{e.nombre}</option>
                                                            )}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group"><td>Código ARL</td><td><input disabled className="form-control" type="text" id="cod_arl"  defaultValue={this.state.id != 0 ? cronico[cols[27]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group">
                                                    <td>Nombre AFP</td>
                                                    <td>
                                                        <select className="form-control" id="nombre_afp" onChange={this.handleChange}>
                                                            <option value={this.state.id != 0 ? cronico[cols[30]]: ''}>{this.state.id != 0 ? cronico[cols[30]]: ''}</option>
                                                            {this.state.AFP.map((e) =>
                                                                <option defaultValue={e.nombre}>{e.nombre}</option>
                                                            )}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group"><td>Código AFP</td><td><input disabled className="form-control" type="text" id="cod_afp"  defaultValue={this.state.id != 0 ? cronico[cols[29]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group">
                                                    <td>Municipio</td>
                                                    <td>
                                                        <select className="form-control" id="municipio" onChange={this.handleChange}>
                                                            <option value={this.state.id != 0 ? cronico[cols[31]]: ''}>{this.state.id != 0 ? cronico[cols[31]]: ''}</option>
                                                            {this.state.municipio.map((e) =>
                                                                <option defaultValue={e.nombre}>{e.nombre}</option>
                                                            )}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group"><td>Código municipio</td><td><input disabled className="form-control" type="text" id="codigo_municipio"  defaultValue={this.state.id != 0 ? cronico[cols[32]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group">
                                                    <td>Nombre IPS</td>
                                                    <td>
                                                        <select className="form-control" id="nombre_ips" onChange={this.handleChange}>
                                                            <option value={this.state.id != 0 ? cronico[cols[34]]: ''}>{this.state.id != 0 ? cronico[cols[34]]: ''}</option>
                                                            {this.state.IPS.map((e) =>
                                                                <option defaultValue={e.nombre}>{e.nombre}</option>
                                                            )}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group"><td>Código IPS primaria</td><td><input disabled className="form-control" type="text" id="nit_ips_primaria"  defaultValue={this.state.id != 0 ? cronico[cols[33]]: ''} size="50" onChange={this.handleChange}/></td></tr>
                                                <tr className="form-group">
                                                    <td>Nombre Medico Laboral (MEL)</td>
                                                    <td>
                                                        <select className="form-control" id="nombre_medico_laboral_(mel)" onChange={this.handleChange}>
                                                            <option value={this.state.id != 0 ? cronico[cols[35]]: ''}>{this.state.id != 0 ? cronico[cols[35]]: ''}</option>
                                                            {this.state.MEL.map((e) =>
                                                                <option defaultValue={e.nombre}>{e.nombre}</option>
                                                            )}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="form-group"><td>Número licencia (MEL)</td><td><input disabled className="form-control" type="text" id="no_licencia_medico_laboral"  defaultValue={this.state.id != 0 ? cronico[cols[36]]: ''} size="50" onChange={this.handleChange}/></td></tr>
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
                                                    <td><input maxLength="4" minLength="4" title="ingresa un código entre A000 y Z999" pattern="^[A-Z]{1}[0-9]{3}$" className="form-control" type="text" id="cie10_evento_seguimiento" defaultValue={this.state.id != 0 ? cronico[cols[48]]: ''} size="50" onChange={this.handleChange}/></td>
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
