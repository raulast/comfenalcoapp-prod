import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableEstados from './TableEstados.js';
import Modal from "react-bootstrap/Modal";


import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EstadosAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            estados: '',
            nombre: '',
            nuevo: 'oculto',
            modalOpen: false,
            nombreEstado: '',
            errors : {
                nombre : 'oculto',
            },
            errorMensajes :{
                nombre : '',
            },
            IdEditar:''
        }
        // bind
        this.getSystemEstados = this.getSystemEstados.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validarForm = this.validarForm.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.handleCrear = this.handleCrear.bind(this);
        this.handleGuardar = this.handleGuardar.bind(this);
        this.handleChangeSelector = this.handleChangeSelector.bind(this);
        this.handleCerrarModal = this.handleCerrarModal.bind(this);
        this.getSystemEstados();
    }
    handleCrear(){
        this.setState({
            nuevo:'visible'
          });
    }

    handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
    }

    handleEdition(id, name){
        this.setState({
            modalOpen: true,
            nombreEstado: name,
            IdEditar:id
        });
    }

    handleCerrarModal(){
        this.setState({
            modalOpen: false,
        });

    }

    handleEliminar(id){

    }
    handleSubmit(e){
        let url = 'parametro/estadosi/agregar'
        let estadoi = document.getElementsByName('estados_incapacidad')[0].value
        axios.post(url, {estado: estadoi, activo: 1})
            .then(resp => {
                toast.success(resp.data.data, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.setState({
                    estados: [...this.state.estados, resp.data.row],
                    nuevo: 'oculto'
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleGuardar(){
        let id = this.state.IdEditar
        let url = `parametro/estadosi/${id}/editar`
        let estadoi = document.getElementsByName('editar_estados_incapacidad')[0].value
        let activo = document.getElementsByName('editar_estados_activo')[0].value
        axios.put(url, {estado: estadoi, activo: activo})
            .then(resp => {
                toast.success(resp.data.data, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.getSystemEstados()
                this.setState({
                    estados: [...this.state.estados]
                });
                this.handleCerrarModal()
            })
            .catch(err => {
                console.log(err)
            })
    }

    validarForm() {

    }

    clearErrors(){

    }

    handleChangeSelector() {

    }

    getSystemEstados() {
        let url = 'getSystemEstados'
        axios.get(url)
            .then(resp => {
                //console.log(resp.data.data);
                this.setState({
                    estados: resp.data.data,
                });

            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        const { estados } = this.state;
        return (
            <div>
                <ToastContainer/>
                <br/><br/>
                <button className="btn btn-success btn-sm" onClick={this.handleCrear}>+ Crear</button>
                <div className="row mt-2">
                    <div className={this.state.nuevo}>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body texto">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table>
                                            <tr>
                                                <td>Nombre</td>
                                                <td><input type="text" className="form-control" id="nombre" name="estados_incapacidad" onChange={this.handleChange} defaultValue={this.state.nombre}></input></td>
                                                <td><button type="submit" className="btn btn-success btn-sm" onClick={this.handleSubmit}>Guardar</button></td>
                                            </tr>
                                        </table>

                                        <div className={this.state.errors['nombre']}>
                                            <div className={"redf  " + (this.state.errors['nombre'] || "")}>{this.state.errorMensajes['nombre']}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Estados en la generación</div>
                            <div className="card-body texto">
                                <table className="table table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <TableEstados estados={estados} handleEdition ={this.handleEdition} handleEliminar ={this.handleEliminar}/>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.modalOpen}>
                    <Modal.Header>Estado</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Nombre</label>
                                            <input type="text" className="form-control form-control-sm" name="editar_estados_incapacidad" defaultValue={this.state.nombreEstado} onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="estado_causa">Estado</label>
                                            <select className="form-control form-control-sm" name="editar_estados_activo" onChange={this.handleChangeC }>
                                                <option value='1'>Activa</option>
                                                <option value='0'>Inactiva</option>
                                            </select>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer><button className="btn btn-primary btn-sm" onClick={ this.handleGuardar }>Guardar</button><button className="btn btn-primary btn-sm" onClick={ this.handleCerrarModal }>Cerrar</button></Modal.Footer>
                </Modal>
            </div>
        );
    }

}

export default EstadosAdmin;
/*
if (document.getElementById('menuUsuarios')) {
    ReactDOM.render(<MenuUsuarios />, document.getElementById('menuUsuarios'));
}
*/
