import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableCausas from './TableCausas.js';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from 'axios';
import { templateSettings } from 'lodash';




class CausasAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            causas: '',
            nombre: '',
            nuevo:'oculto',
            causa:'',
            modalOpen: false,
            errors : {
                nombre : 'oculto',
            },
            errorMensajes :{
                nombre : '',
            },
            IdEditar:''
        }

        // bind
        this.getSystemUsers = this.getSystemCausas.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validarForm = this.validarForm.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.handleCrear = this.handleCrear.bind(this);
        this.handleGuardar = this.handleGuardar.bind(this);
        this.handleCerrarModal = this.handleCerrarModal.bind(this);
        this.getSystemCausas();

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

    handleEdition(id,causa) {
        this.setState({
            causa:causa,
            modalOpen: true,
            IdEditar:id
        });
    }

    handleCerrarModal(){
        this.setState({

            modalOpen: false,
        });

    }

    handleEliminar(id){
        let url = `parametro/causae/${id}/eliminar`
        axios.delete(url)
            .then(resp => {
                this.getSystemCausas()
                this.props.showToast(resp,'success')
            })
            .catch(err => {
                this.props.showToast(err,'error')
            })
    }

    handleSubmit(){
        let url = 'parametro/causae/agregar'
        let causa = document.getElementsByName('causa_externa')[0].value
        axios.post(url, {causa_externa: causa, estado: 1})
            .then(resp => {
                this.props.showToast(resp,'success')
                this.setState({
                    causas: [...this.state.causas, resp.data.row],
                    nuevo:'oculto'
                });
            })
            .catch(err => {
                this.props.showToast(err,'error')
            })
    }

    validarForm() {

    }

    clearErrors(){

    }

    getSystemCausas() {
        let url = 'getSystemCausas'
        axios.get(url)
            .then(resp => {
                this.setState({
                    causas: resp.data.data,
                });

            })
            .catch(err => {
                this.props.showToast(err,'error')
            })

    }

    handleGuardar() {
        const id = this.state.IdEditar
        const url = `parametro/causae/${id}/editar`
        const causa = document.getElementsByName('causa_editada')[0].value
        const estado = document.getElementsByName('estado_causa')[0].value
        axios.put(url, {causa_externa: causa, estado: estado})
            .then(resp => {
                this.getSystemCausas()
                this.setState({
                    causas: [...this.state.causas]
                });
                this.props.showToast(resp,'success')
                this.handleCerrarModal()
            })
            .catch(err => {
                this.props.showToast(err,'error')
            })
    }

    render() {
        const { causas } = this.state;
        return (
            <div>
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
                                                <td><input type="text" className="form-control" id="nombre" name="causa_externa" onChange={this.handleChange}></input></td>
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
                            <div className="card-header bg2 titulo">Causas externas</div>
                            <div className="card-body texto">
                                <table className="table table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col"></th>

                                        </tr>
                                    </thead>
                                    <TableCausas causas={causas} handleEdition ={this.handleEdition} handleEliminar ={this.handleEliminar}/>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.modalOpen}>
                    <Modal.Header>Causa externa</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Nombre</label>
                                            <input type="text" className="form-control form-control-sm" name="causa_editada" defaultValue={this.state.causa} onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="estado_causa">Estado</label>
                                            <select className="form-control form-control-sm" name="estado_causa" onChange={this.handleChangeC }>
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

export default CausasAdmin;
/*
if (document.getElementById('menuUsuarios')) {
    ReactDOM.render(<MenuUsuarios />, document.getElementById('menuUsuarios'));
}
*/
