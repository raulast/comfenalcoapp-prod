import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableCronicos from './TableCronicos.js';
import Modal from "react-bootstrap/Modal";


import axios from 'axios';



class CronicosPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cronicos: '',
            conductas: ['CASOS CERRAR', 'PSICOLOGÍA', 'SEGUIMIENTO', 'TRAMITE PENSIÓN NO FIRME',
                'TRAMITE PENSIÓN FIRME', 'IPP NO FIRME', 'IPP FIRME', 'CITAR CRH 150', 'CITAR NUEVO', 'PERDIDOS',
                'CRH 480', 'CRH NO FAV CPCLO', 'ICP > 540 SIN CPCLO', 'IT MEL'],
            estados: ['CERRADO', 'SEGUIMIENTO'],
            motivos: ['FALLECIDO', 'IPP', 'NUEVO', 'PENSIONADO', 'REINTEGRADO', 'RETIRADO', 'SEGUIMIENTO', 'TRAMITE DE PENSION'],
            identificacion: '',
            conducta: '',
            estado: '',
            motivo: '',
            desde: '',
            hasta: '',
            modalOpen: false,
            data: {}
        }
        // bind
        this.getCronicos = this.getCronicos.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeModal = this.handleChangeModal.bind(this);
        this.buscar = this.buscar.bind(this);
        this.handleCrear = this.handleCrear.bind(this);
        this.handleCerrarModal = this.handleCerrarModal.bind(this);
        this.handleAddCronico = this.handleAddCronico.bind(this);
        this.getCronicos()
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    getCronicos() {
        let url = 'getCronicos'
        axios.get(url)
            .then(resp => {
                console.log(resp.data.data);
                this.setState({
                    cronicos: resp.data.data,
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    exportReport(){
        window.open('exportCronicos','_blank');
    }

    handleCrear() {
        this.setState({
            modalOpen: true,
        });
        window.open('verCronico/' + 0 + "/1", '_blank');
    }

    handleCerrarModal(){
        this.setState({
            modalOpen: false,
        });
    }

    handleAddCronico(e) {
        e.preventDefault();
        let url = '/addCronico';
        axios.post(url, {datos: this.state.data})
            .then(resp)
            .catch(error)
    }

    handleChangeModal({ target }) {
        var ncronico = this.state.data;      
        ncronico[target.name]=target.value;    
        console.log('props: ', ncronico, 'cronico: ', `T:${this.state.datos}`, target);   
        this.setState({
         data: ncronico,
        });
    }

    buscar() {
        let url = 'buscarCronicos'
        axios.post(url, { datos: this.state })
            .then(resp => {
                console.log(resp.data)
                this.setState({
                    cronicos: resp.data.data,
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Búsqueda y filtros </div>
                            <div className="card-body texto">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="">Identificación del usuario</label>
                                        <input className="form-control" name="identificacion" value={this.state.identificacion} onChange={this.handleChange} />
                                    </div>
                                   {/* <div className="col-md-3">
                                        <label htmlFor="">Conducta</label>
                                        <select className="form-control" name="conducta" value={this.state.conducta} onChange={this.handleChange}>
                                            <option value=""></option>
                                            {this.state.conductas.map((c) =>
                                                <option value={c}>{c}</option>

                                            )}
                                        </select>
                                            </div>*/}
                                    <div className="col-md-3">
                                        <label htmlFor="">Estado</label>
                                        <select className="form-control" name="estado" value={this.state.estado} onChange={this.handleChange}>
                                            <option value=""></option>
                                            {this.state.estados.map((e) =>
                                                <option value={e}>{e}</option>

                                            )}
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="">Motivo</label>
                                        <select className="form-control" name="motivo" value={this.state.motivo} onChange={this.handleChange}>
                                            <option value=""></option>
                                            {this.state.motivos.map((m) =>
                                                <option value={m}>{m}</option>

                                            )}
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <br/>
                                        <button className="btn btn-success" onClick={this.buscar}>Buscar</button>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <label htmlFor="">Fecha de notificación (desde)</label>
                                        <input type="date" name="desde" className="form-control form-control-sm" onChange={this.handleChange}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Fecha de notificación (hasta)</label>
                                        <input type="date" name="hasta" className="form-control form-control-sm" onChange={this.handleChange}/>
                                    </div>
                                    <div className="col-md-4">
                                        <br/>
                                        <button className="btn btn-success" onClick={this.exportReport}>Exportar Datos</button>
                                    </div>
                                    <div className="col-md-4">
                                        <br/>
                                        <button className="btn btn-success" onClick={this.handleCrear}>Crear Cronico</button>
                                    </div>
                                </div>
                                {/*<div className="row mt-1">
                                    <button className="btn btn-success" onClick={this.buscar}>Buscar</button>
                                            </div>*/}
                            </div>
                        </div>
                    </div>
                </div>



                <Modal show={this.state.modalOpen}>
                    <Modal.Header>Cronico</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form id="crearCronico" onSubmit={ this.handleAddCronico }>
                                        <div className="form-group"><label htmlFor="">Número notificación</label><input type="number" onChange={this.handleChangeModal} required className="form-control form-control-sm" name="numero_notificacion"/></div>
                                        <div className="form-group"><label htmlFor="">Fecha notificacion</label><input type="date" onChange={this.handleChangeModal} className="form-control form-control-sm" name="fecha_notificacion"/></div>
                                        <div className="form-group"><label htmlFor="">Tipo ID usuario</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="tipo_id_usuario"/></div>
                                        <div className="form-group"><label htmlFor="">ID usuario</label><input type="number" onChange={this.handleChangeModal} className="form-control form-control-sm" name="id_usuario"/></div>
                                        <div className="form-group"><label htmlFor="">Primer nombre</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="nombre_1_usuario"/></div>
                                        <div className="form-group"><label htmlFor="">Segundo nombre</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="nombre_2_usuario"/></div>
                                        <div className="form-group"><label htmlFor="">Primer apellido</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="apellido_1_usuario"/></div>
                                        <div className="form-group"><label htmlFor="">Segundo apellido</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="apellido_2_usuario"/></div>
                                        <div className="form-group"><label htmlFor="">Tipo afiliado</label><input type="text" onChange={this.handleChangeModal} required className="form-control form-control-sm" name="tipo_afiliado"/></div>
                                        <div className="form-group"><label htmlFor="">Estado afiliado</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="estado_afiliado"/></div>
                                        <div className="form-group"><label htmlFor="">Telefono fijo usuario</label><input type="number" onChange={this.handleChangeModal} className="form-control form-control-sm" name="telefono_fijo_usuario"/></div>
                                        <div className="form-group"><label htmlFor="">Celular usuario</label><input type="number" onChange={this.handleChangeModal} className="form-control form-control-sm" name="celular_usuario"/></div>
                                        <div className="form-group"><label htmlFor="">Email usuario</label><input type="email" onChange={this.handleChangeModal} className="form-control form-control-sm" name="e mail_usuario"/></div>
                                        <div className="form-group"><label htmlFor="">Apellidos y Nombres acudiente</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="apellidos_nombres_acudiente"/></div>
                                        <div className="form-group"><label htmlFor="">Telefono fijo acudiente</label><input type="number" onChange={this.handleChangeModal} className="form-control form-control-sm" name="telefono_fijo_acudiente"/></div>
                                        <div className="form-group"><label htmlFor="">Telefono celular acudiente</label><input type="number" onChange={this.handleChangeModal} className="form-control form-control-sm" name="telefono_celular_acudiente"/></div>
                                        <div className="form-group"><label htmlFor="">Email acudiente</label><input type="email" onChange={this.handleChangeModal} className="form-control form-control-sm" name="e mail_acudiente"/></div>
                                        <div className="form-group"><label htmlFor="">Tipo ID aportante</label><input type="text" onChange={this.handleChangeModal} required className="form-control form-control-sm" name="tipo_id_aportante"/></div>
                                        <div className="form-group"><label htmlFor="">Nit aportante</label><input type="number" onChange={this.handleChangeModal} className="form-control form-control-sm" name="nit_aportante"/></div>
                                        <div className="form-group"><label htmlFor="">Nombre aportante </label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="nombre_aportante"/></div>
                                        <div className="form-group"><label htmlFor="">Codigo ARL</label><input type="number" onChange={this.handleChangeModal} className="form-control form-control-sm" name="cod_arl"/></div>
                                        <div className="form-group"><label htmlFor="">Nombre ARL</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="nombre_arl"/></div>
                                        <div className="form-group"><label htmlFor="">Codigo AFP</label><input type="number" onChange={this.handleChangeModal} className="form-control form-control-sm" name="cod_afp"/></div>
                                        <div className="form-group"><label htmlFor="">Nombre AFP</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="nombre_afp"/></div>
                                        <div className="form-group"><label htmlFor="">Municipio</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="municipio"/></div>
                                        <div className="form-group"><label htmlFor="">Codigo municipio</label><input type="text" onChange={this.handleChangeModal} required className="form-control form-control-sm" name="codigo_municipio"/></div>
                                        <div className="form-group"><label htmlFor="">Nit IPS primaria</label><input type="number" onChange={this.handleChangeModal} className="form-control form-control-sm" name="nit_ips_primaria"/></div>
                                        <div className="form-group"><label htmlFor="">Nombre IPS</label><input type="number" onChange={this.handleChangeModal} className="form-control form-control-sm" name="nombre_ips"/></div>
                                        <div className="form-group"><label htmlFor="">Nombre (MEL)</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="nombre_medico_laboral_(mel)"/></div>
                                        <div className="form-group"><label htmlFor=""># Licencia Medico laboral</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="no_licencia_medico_laboral"/></div>
                                        <div className="form-group"><label htmlFor="">Fecha primera asistencia (mel)</label><input type="date" onChange={this.handleChangeModal} className="form-control form-control-sm" name="fecha_primera_asistio_mel"/></div>
                                        <div className="form-group"><label htmlFor="">Fecha última cita (mel)</label><input type="date" onChange={this.handleChangeModal} className="form-control form-control-sm" name="fecha_ultima_cita_mel"/></div>
                                        <div className="form-group"><label htmlFor="">Fecha próxima (mel)</label><input type="date" onChange={this.handleChangeModal} className="form-control form-control-sm" name="fecha_proxima_mel"/></div>
                                        <div className="form-group"><label htmlFor="">Fecha primera asistencia (sic)</label><input type="date" onChange={this.handleChangeModal} className="form-control form-control-sm" name="fecha_primera_asistio_sic"/></div>
                                        <div className="form-group"><label htmlFor="">Fecha última cita (sic)</label><input type="date" onChange={this.handleChangeModal} className="form-control form-control-sm" name="fecha_ultima_cita_sic"/></div>
                                        <div className="form-group"><label htmlFor="">Fecha próxima (sic)</label><input type="date" onChange={this.handleChangeModal} className="form-control form-control-sm" name="fecha_proxima_sic"/></div>
                                        <div className="form-group"><label htmlFor="">Días acumulados identificacion caso</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="dias_acumulados_a_identificacion_caso"/></div>
                                        <div className="form-group"><label htmlFor="">Fecha fin IT - Días acumulados a identificacion</label><input type="date" onChange={this.handleChangeModal} className="form-control form-control-sm" name="fecha_fin_it_dias_acumulados_a_indetificacion"/></div>
                                        <div className="form-group"><label htmlFor="">Tipo seguimiento</label><input type="date" onChange={this.handleChangeModal} className="form-control form-control-sm" name="tipo_seguimiento"/></div>
                                        <div className="form-group"><label htmlFor="">Estado seguimiento</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="estado_seguimiento"/></div>
                                        <div className="form-group"><label htmlFor="">Motivo Estado seguimiento</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="motivo_estado_seguimiento"/></div>
                                        <div className="form-group"><label htmlFor="">CIE-10 Evento seguimiento</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="cie10_evento_seguimiento"/></div>
                                        <div className="form-group"><label htmlFor="">Descripción CIE-10</label><input type="text" onChange={this.handleChangeModal} className="form-control form-control-sm" name="descripcion_cie10"/></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" form="crearCronico" className="btn btn-primary btn-sm" >Guardar</button>
                        <button className="btn btn-primary btn-sm" onClick={ this.handleCerrarModal }>Cerrar</button>
                    </Modal.Footer>
                </Modal>



                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Listado de Pacientes</div>
                            <div className="card-body texto"></div>




                        </div>
                        {this.state.cronicos != '' ? (
                            <TableCronicos cronicos={this.state.cronicos} />
                        ) : (
                                <p>No hay datos</p>
                            )}
                    </div>
                </div>
            </div>
        );
    }

}

export default CronicosPanel;
if (document.getElementById('cronicosContent')) {
    ReactDOM.render(<CronicosPanel />, document.getElementById('cronicosContent'));
}