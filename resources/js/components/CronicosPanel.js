import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableCronicos from './TableCronicos.js';
import Modal from "react-bootstrap/Modal";


import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
            eliminar: false,
            modal: {
                show: false,
                id: ''
            }
        }
        // bind
        this.getCronicos = this.getCronicos.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.buscar = this.buscar.bind(this);
        this.handleCrear = this.handleCrear.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCerrarModal = this.handleCerrarModal.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.handleToast = this.handleToast.bind(this);
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
        window.open('verCronico/' + 0 + "/1", '_blank');
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

    
    handleCerrarModal(){
        this.setState({
            modal: {show: false},
            eliminar: false
        });
    }

    showModal(arg, id) {
        this.setState({modal: {show: arg, id}});
    }


    handleToast(arg,type) {
        if(type == 'success') {
            toast.success(arg, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else if(type == 'error') {
            toast.error(arg, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }   

    handleEliminar() {
        this.setState({eliminar: true});
        const id= this.state.modal;
        const baseUrl = '/deleteCronico/'
        const url = `${baseUrl}${id.id}`
        axios.delete(url)
        .then(resp => {
            this.handleToast(resp.data,'success')
            this.setState({modal: {show: false}})
        })
        .catch(err => {
            this.handleToast(err,'error')
        })
        this.getCronicos()
    }

    render() {
        return (
            <div>
                <ToastContainer/>
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


                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Listado de Pacientes</div>
                            <div className="card-body texto"></div>




                        </div>
                        {this.state.cronicos != '' ? (
                            <TableCronicos eliminar={this.state.eliminar} cronicos={this.state.cronicos} setModal={(arg, id) => this.showModal(arg, id)}/>
                        ) : (
                                <p>No hay datos</p>
                            )}
                    </div>
                </div>
                <Modal show={this.state.modal.show}>
                    <Modal.Header>Eliminar Crónico</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <h3>¿Desea eliminar el crónico #{this.state.modal.id} ?</h3>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger btn-sm" onClick={ this.handleEliminar }>Eliminar</button>
                        <button className="btn btn-primary btn-sm" onClick={ this.handleCerrarModal }>Cerrar</button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        );
    }

}

export default CronicosPanel;
if (document.getElementById('cronicosContent')) {
    ReactDOM.render(<CronicosPanel />, document.getElementById('cronicosContent'));
}
