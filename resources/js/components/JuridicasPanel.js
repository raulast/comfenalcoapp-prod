import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableJuridicas from './TableJuridicas.js';
import Modal from "react-bootstrap/Modal";

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class JuridicasPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            juridicas: '',
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
            modal: {
                show: false,
                id: ''
            }
        }
        // bind
        this.getJuridicas = this.getJuridicas.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.buscar = this.buscar.bind(this);
        this.crearRegistro = this.crearRegistro.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCerrarModal = this.handleCerrarModal.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.getJuridicas()
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    getJuridicas() {
        let url = 'getJuridicas'
        axios.get(url)
            .then(resp => {
                console.log(resp.data.data);
                this.setState({
                    juridicas: resp.data.data,
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
    exportReport(){
        window.open('exportJuridicas','_blank');
    }
    buscar() {
        let url = 'buscarJuridicas'
        axios.post(url, { datos: this.state })
            .then(resp => {
                console.log(resp.data)
                this.setState({
                    juridicas: resp.data.data,
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
    crearRegistro(){
        window.open('verJuridica/1/1/c','_blank');
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

    handleCerrarModal(){
        this.setState({
            modal: {show: false},
            eliminar: false
        });
    }

    showModal(arg, id) {
        this.setState({modal: {show: arg, id}});
    }

    handleEliminar() {
        const id= this.state.modal;
        const url ="/deleteJuridica"
        console.log('target eliminar', id);
        axios.post(url, { datos: id.id })
        .then(resp => {
            this.handleToast(resp.data,'success')
            this.setState({modal: {show: false}})
        })
        .catch(err => {
            this.handleToast(err,'error')

        })
        this.getJuridicas()
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
                                    <div className="col-md-6">
                                        <br/>
                                        <button className="btn btn-success" onClick={this.buscar}>Buscar</button>&nbsp;
                                        <button className="btn btn-success" onClick={this.exportReport}>Exportar Datos</button>&nbsp;
                                        <button className="btn btn-success" onClick={this.crearRegistro}>Crear registro</button>
                                    </div>
                                </div>
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
                        {this.state.juridicas != '' ? (
                            <TableJuridicas juridicas={this.state.juridicas} setModal={(arg, id) => this.showModal(arg, id)}/>
                        ) : (
                                <p>No hay datos</p>
                            )}
                    </div>
                </div>
                <Modal show={this.state.modal.show}>
                    <Modal.Header>Eliminar registro juridico</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <h3>¿Desea eliminar el registro juridico #{this.state.modal.id} ?</h3>
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

export default JuridicasPanel;
if (document.getElementById('juridicasContent')) {
    ReactDOM.render(<JuridicasPanel />, document.getElementById('juridicasContent'));
}