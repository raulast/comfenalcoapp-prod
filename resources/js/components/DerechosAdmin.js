import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from "react-bootstrap/Modal";
import TableClasesa from './TableClasesa.js';
import TableDescripciones from './TableDescripciones.js';
import TableEstadosa from './TableEstadosa.js';
import axios from 'axios';



class DerechosAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clasesa: '',
            estadosa:'',
            descripciones:'',
            nombreClase: '',
            nombreEstado: '',
            nombrePrograma: '',
            codigoPrograma: '',
            nuevoClase: 'oculto',
            nuevoEstado: 'oculto',
            nuevoPrograma: 'oculto',
            modalClaseOpen: false,
            modalEstadoOpen: false, 
            modalProgramaOpen: false,
            formCreate: '0',
            errors : {
                  
            },
            errorMensajes :{
                
            }
        }
        // bind
        this.getSystemClasesa = this.getSystemClasesa.bind(this);
        this.getSystemDescripciones= this.getSystemDescripciones.bind(this);
        this.getSystemEstadosa= this.getSystemEstadosa.bind(this);
       
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validarForm = this.validarForm.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleCrearClase = this.handleCrearClase.bind(this);
        this.handleCrearEstado = this.handleCrearEstado.bind(this);
        this.handleCrearPrograma = this.handleCrearPrograma.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.handleCerrarModal = this.handleCerrarModal.bind(this);
        this.getSystemClasesa();
        this.getSystemEstadosa();
        this.getSystemDescripciones();
    }

    handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
    }
    handleEdition(id,name,table,codigo){
        if(table == 'Clase'){
            this.setState({
                nombreClase: name,
                modalClaseOpen: true, 
            });
        } else if(table == 'Estado'){
            this.setState({
                nombreEstado: name,
                modalEstadoOpen: true, 
            });
        } else if(table == 'Programa'){
            this.setState({
                nombrePrograma: name,
                codigoPrograma: codigo,
                modalProgramaOpen: true, 
            });
        }             
    }

    handleCerrarModal(){
        this.setState({
            modalClaseOpen: false, 
            modalEstadoOpen: false, 
            modalProgramaOpen: false, 
        });
    }

    handleEliminar(id){
        
    }
    handleSubmit(e){          
        
    }
    validarForm() {
        
    }
    clearErrors(){
        
    }   

    handleCrearClase() {
        this.setState({
            nuevoClase:'visible'
          });
    }

    handleCrearEstado() {
        this.setState({
            nuevoEstado:'visible'
          });
    }

    handleCrearPrograma() {
        this.setState({
            nuevoPrograma:'visible'
          });
    }

    getSystemClasesa() {
        let url = 'getSystemClasesa'
        axios.get(url)
            .then(resp => {
                //console.log(resp.data.data);
                this.setState({
                    clasesa: resp.data.data,
                });

            })
            .catch(err => {
                console.log(err)
            })

    }
    getSystemEstadosa() {
        let url = 'getSystemEstadosa'
        axios.get(url)
            .then(resp => {
                //console.log(resp.data.data);
                this.setState({
                    estadosa: resp.data.data,
                });
            })
            .catch(err => {
                console.log(err)
            })

    }
    getSystemDescripciones() {
        let url = 'getSystemDescripciones'
        axios.get(url)
            .then(resp => {
                //console.log(resp.data.data);
                this.setState({
                    descripciones: resp.data.data,
                });

            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        const { clasesa } = this.state;
        const { descripciones } = this.state;
        const { estadosa } = this.state;
        return (
            <div>
                <br/>
                <button className="btn btn-success btn-sm" onClick={this.handleCrearClase}>+ Crear</button>
                <div className="row mt-2">
                    <div className={this.state.nuevoClase}>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body texto">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table className="container">
                                                <tr className="row">
                                                    <td className="col"><label>Clase <input type="text" className="form-control" id="nombre" name="causa_externa" onChange={this.handleChange}></input></label></td>
                                                    <td className="col"><label>Abbr <input type="text" className="form-control" id="nombre" name="causa_externa" onChange={this.handleChange}></input></label></td>
                                                </tr>
                                                <tr className="row">
                                                    <td className="col"><label>Estado <input type="text" className="form-control" id="nombre" name="causa_externa" onChange={this.handleChange}></input></label></td>
                                                    <td className="col align-self-center"><button type="submit" className="btn btn-success btn-sm " onClick={this.handleSubmit}>Guardar</button></td>
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
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Clases de afiliación</div>
                            <div className="card-body texto">
                                <table className="table table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Nombre Sede</th>
                                            <th scope="col">Abbr</th>
                                            <th scope="col">Estado</th>
                                        </tr>
                                    </thead>
                                    <TableClasesa clasesa={clasesa} handleEdition ={this.handleEdition} handleEliminar ={this.handleEliminar}/>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <button className="btn btn-success btn-sm" onClick={this.handleCrearEstado}>+ Crear</button>
                <div className="row mt-2">
                    <div className={this.state.nuevoEstado}>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body texto">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table className="container">
                                                <tr className="row">
                                                    <td className="col">
                                                        <label>
                                                            Activo
                                                            <select className="form-control form-control-sm" defaultValue="1" name="estado_causa" onChange={this.handleChangeC }>
                                                                <option value='1'>Activo</option>
                                                                <option value='0'>Inactivo</option>
                                                            </select>
                                                        </label>
                                                    </td>
                                                    <td className="col">
                                                        <label>
                                                            Incapacidad
                                                            <select className="form-control form-control-sm" defaultValue="1" name="estado_causa" onChange={this.handleChangeC }>
                                                                <option value='1'>Si</option>
                                                                <option value='0'>No</option>
                                                            </select>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr className="row">
                                                <td className="col"><label>Estado <input type="text" className="form-control" id="nombre" name="causa_externa" onChange={this.handleChange}></input></label></td>
                                                    <td className="col align-self-center"><button type="submit" className="btn btn-success btn-sm " onClick={this.handleSubmit}>Guardar</button></td>
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
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Estados de afiliación</div>
                            <div className="card-body texto">
                                <table className="table table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Incapacidad</th>
                                            <th scope="col">Estado</th>
                                        </tr>
                                    </thead>
                                    <TableEstadosa estadosa={estadosa} handleEdition ={this.handleEdition} handleEliminar ={this.handleEliminar}/>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <button className="btn btn-success btn-sm" onClick={this.handleCrearPrograma}>+ Crear</button>
                <div className="row mt-2">
                    <div className={this.state.nuevoPrograma}>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body texto">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table className="container">
                                                <tr className="row">
                                                    <td className="col">
                                                        <label>
                                                            Tipo afiliación
                                                            <select className="form-control form-control-sm" defaultValue="1" name="estado_causa" onChange={this.handleChangeC }>
                                                                <option value='1'>1</option>
                                                                <option value='2'>2</option>
                                                            </select>
                                                        </label>
                                                    </td>
                                                    <td className="col">
                                                        <label>
                                                            Incapacidad
                                                            <select className="form-control form-control-sm" defaultValue="1" name="estado_causa" onChange={this.handleChangeC }>
                                                                <option value='1'>Si</option>
                                                                <option value='0'>No</option>
                                                            </select>
                                                        </label>
                                                    </td>
                                                    <td className="col">
                                                        <label>
                                                            Estado
                                                            <select className="form-control form-control-sm" defaultValue="1" name="estado_causa" onChange={this.handleChangeC }>
                                                                <option value='1'>Activo</option>
                                                                <option value='0'>Inactivo</option>
                                                            </select>
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr className="row">
                                                    <td className="col"><label>Código <input type="number" className="form-control" id="nombre" name="causa_externa" onChange={this.handleChange}></input></label></td>
                                                    <td className="col"><label>Descripción <input type="text" className="form-control" id="nombre" name="causa_externa" onChange={this.handleChange}></input></label></td>
                                                    <td className="col align-self-center"><button type="submit" className="btn btn-success btn-sm " onClick={this.handleSubmit}>Guardar</button></td>
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
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Programas</div>
                            <div className="card-body texto">
                                <table className="table table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Código de programa</th>
                                            <th scope="col">Tipo de afiliación</th>
                                            <th scope="col">Descripción</th>
                                            <th scope="col">Incapacidad/Licencia</th>
                                            <th scope="col">Estado</th>
                                        </tr>
                                    </thead>
                                    <TableDescripciones descripciones={descripciones} handleEdition ={this.handleEdition} handleEliminar ={this.handleEliminar}/>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.modalClaseOpen}>
                    <Modal.Header>Clase</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Clase</label>
                                            <input type="text" className="form-control form-control-sm" name="especialidad" defaultValue={this.state.nombreClase} onChange={this.handleChangeC }/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Abbr</label>
                                            <input type="text" className="form-control form-control-sm" name="diasmax" onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Estado</label>
                                            <select className="form-control form-control-sm" defaultValue="1">
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer><button className="btn btn-primary btn-sm" onClick={ this.handleGuardar }>Guardar</button><button className="btn btn-primary btn-sm" onClick={ this.handleCerrarModal }>Cerrar</button></Modal.Footer>
                </Modal>
                <Modal show={this.state.modalEstadoOpen}>
                    <Modal.Header>Clase</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Estado</label>
                                            <input type="text" className="form-control form-control-sm" name="especialidad" defaultValue={this.state.nombreEstado} onChange={this.handleChangeC }/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Incapacidad</label>
                                            <select className="form-control form-control-sm" defaultValue="1">
                                                <option value="1">Si</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Activo</label>
                                            <select className="form-control form-control-sm" defaultValue="1">
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer><button className="btn btn-primary btn-sm" onClick={ this.handleGuardar }>Guardar</button><button className="btn btn-primary btn-sm" onClick={ this.handleCerrarModal }>Cerrar</button></Modal.Footer>
                </Modal>
                <Modal show={this.state.modalProgramaOpen}>
                    <Modal.Header>Clase</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Código</label>
                                            <input type="text" className="form-control form-control-sm" name="especialidad" defaultValue={this.state.codigoPrograma} onChange={this.handleChangeC }/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Tipo afiliación</label>
                                            <select className="form-control form-control-sm" defaultValue="1">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Descripción</label>
                                            <input type="text" className="form-control form-control-sm" name="especialidad" defaultValue={this.state.nombrePrograma} onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Incapacidad</label>
                                            <select className="form-control form-control-sm" defaultValue="1">
                                                <option value="1">Si</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Estado</label>
                                            <select className="form-control form-control-sm" defaultValue="1">
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
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

export default DerechosAdmin;
/*
if (document.getElementById('menuUsuarios')) {
    ReactDOM.render(<MenuUsuarios />, document.getElementById('menuUsuarios'));
}
*/