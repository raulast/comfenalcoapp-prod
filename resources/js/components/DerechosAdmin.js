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

            },
            IdEditar:''
        }
        // bind
        this.getSystemClasesa = this.getSystemClasesa.bind(this);
        this.getSystemDescripciones= this.getSystemDescripciones.bind(this);
        this.getSystemEstadosa= this.getSystemEstadosa.bind(this);


        this.handleSubmitClase = this.handleSubmitClase.bind(this);
        this.handleSubmitEstado = this.handleSubmitEstado.bind(this);
        this.handleSubmitPrograma = this.handleSubmitPrograma.bind(this);
        this.handleGuardarClase = this.handleGuardarClase.bind(this);
        this.handleGuardarEstado = this.handleGuardarEstado.bind(this);
        this.handleGuardarPrograma = this.handleGuardarPrograma.bind(this);
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
                IdEditar: id
            });
        } else if(table == 'Estado'){
            this.setState({
                nombreEstado: name,
                modalEstadoOpen: true,
                IdEditar: id
            });
        } else if(table == 'Programa'){
            this.setState({
                nombrePrograma: name,
                codigoPrograma: codigo,
                modalProgramaOpen: true,
                IdEditar: id
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

    handleSubmitClase(e){
        let url = 'parametro/clasesa/agregar'
        let clase = document.getElementsByName('crear_clase')[0].value
        let abbr = document.getElementsByName('crear_abbr')[0].value
        axios.post(url, {clase: clase, abbr: abbr, activo: 1})
            .then(resp => {
                this.props.showToast(resp,'success')
                this.setState({
                    clasesa: [...this.state.clasesa, resp.data.row],
                    nuevoClase: 'oculto'
                });
            })
            .catch(err => {
                this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error')
            })
    }

    handleSubmitEstado(e){
        let url = 'parametro/estadosa/agregar'
        let estado = document.getElementsByName('crear_estadoa')[0].value
        let incapacidad = document.getElementsByName('crear_incapacidad')[0].value
        axios.post(url, {estado: estado, incapacidad: incapacidad, licencia: incapacidad, activo: 1})
            .then(resp => {
                this.props.showToast(resp,'success')
                this.setState({
                    estadosa: [...this.state.estadosa, resp.data.row],
                    nuevoEstado: 'oculto'
                });
            })
            .catch(err => {
                this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error')
            })
    }

    handleSubmitPrograma(e){
        let url = 'parametro/descripcionesp/agregar'
        let clase = document.getElementsByName('programa_clasea')[0].value
        let descripcion = document.getElementsByName('programa_descripcion')[0].value
        let codigo = document.getElementsByName('programa_codigo')[0].value
        let incapacidad = document.getElementsByName('programa_incapacidad')[0].value
        axios.post(url, {clases_afiliacion_id:clase,descripcion:descripcion,codigo:codigo,incapacidad:incapacidad,licencia:incapacidad,activo:1})
            .then(resp => {
                this.props.showToast(resp,'success')
                this.setState({
                    descripciones: [...this.state.descripciones, resp.data.row],
                    nuevoPrograma: 'oculto'
                });
            })
            .catch(err => {
                this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error')
            })
    }

    handleGuardarClase(e){
        let id = this.state.IdEditar
        let url = `parametro/clasesa/${id}/editar`
        let clase = document.getElementsByName('editar_clase')[0].value
        let abbr = document.getElementsByName('editar_abbr')[0].value
        let activo = document.getElementsByName('editar_clase_activo')[0].value
        axios.put(url, {clase: clase, abbr: abbr, activo: activo})
            .then(resp => {
                this.props.showToast(resp,'success')
                this.getSystemClasesa()
                this.setState({
                    clasesa: [...this.state.clasesa]
                });
                this.handleCerrarModal()
            })
            .catch(err => {
                this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error')
            })
    }

    handleGuardarEstado(e){
        let id = this.state.IdEditar
        let url = `parametro/estadosa/${id}/editar`
        let estado = document.getElementsByName('editar_estadoa')[0].value
        let incapacidad = document.getElementsByName('editar_incapacidad')[0].value
        let activo = document.getElementsByName('editar_estadoa_activo')[0].value
        axios.put(url, {estado: estado, incapacidad: incapacidad, licencia: incapacidad, activo: activo})
            .then(resp => {
                this.props.showToast(resp,'success')
                this.getSystemEstadosa()
                this.setState({
                    estadosa: [...this.state.estadosa]
                });
                this.handleCerrarModal()
            })
            .catch(err => {
                this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error')
            })
    }

    handleGuardarPrograma(e){
        console.log('hola funcion');
        let id = this.state.IdEditar
        let url = `parametro/descripcionesp/${id}/editar`
        let codigo = document.getElementsByName('editar_programa_codigo')[0].value
        let clase = document.getElementsByName('editar_programa_clasea')[0].value
        let descripcion = document.getElementsByName('editar_programa_descripcion')[0].value
        let incapacidad = document.getElementsByName('editar_programa_incapacidad')[0].value
        let activo = document.getElementsByName('editar_programa_activo')[0].value
        axios.put(url, {clases_afiliacion_id:clase,descripcion:descripcion,codigo:codigo,incapacidad:incapacidad,licencia:incapacidad,activo:activo})
            .then(resp => {
                this.props.showToast(resp,'success')
                this.getSystemDescripciones()
                this.setState({
                    descripciones: [...this.state.descripciones]
                });
                this.handleCerrarModal()
            })
            .catch(err => {
                this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error')
            })
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
                this.setState({
                    clasesa: resp.data.data,
                });

            })
            .catch(err => {
                this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error')
            })

    }
    getSystemEstadosa() {
        let url = 'getSystemEstadosa'
        axios.get(url)
            .then(resp => {
                this.setState({
                    estadosa: resp.data.data,
                });
            })
            .catch(err => {
                this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error')
            })

    }
    getSystemDescripciones() {
        let url = 'getSystemDescripciones'
        axios.get(url)
            .then(resp => {
                this.setState({
                    descripciones: resp.data.data,
                });

            })
            .catch(err => {
                this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error')
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
                                                    <td className="col"><label>Clase <input type="text" className="form-control" id="nombre" name="crear_clase" onChange={this.handleChange}></input></label></td>
                                                    <td className="col"><label>Abbr <input type="text" className="form-control" id="nombre" name="crear_abbr" onChange={this.handleChange}></input></label></td>
                                                </tr>
                                                <tr className="row">
                                                    <td className="col align-self-center"><button type="submit" className="btn btn-success btn-sm " onClick={this.handleSubmitClase}>Guardar</button></td>
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
                                                    <td className="col"><label>Estado <input type="text" className="form-control" id="nombre" name="crear_estadoa" onChange={this.handleChange}></input></label></td>
                                                </tr>
                                                <tr className="row">
                                                    <td className="col">
                                                        <label>
                                                            Incapacidad
                                                            <select className="form-control form-control-sm" defaultValue="1" name="crear_incapacidad" onChange={this.handleChangeC }>
                                                                <option value='1'>Si</option>
                                                                <option value='0'>No</option>
                                                            </select>
                                                        </label>
                                                    </td>
                                                    <td className="col align-self-center"><button type="submit" className="btn btn-success btn-sm " onClick={this.handleSubmitEstado}>Guardar</button></td>
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
                                                    <td className="col"><label>Código <input type="number" className="form-control" id="nombre" name="programa_codigo" onChange={this.handleChange}></input></label></td>
                                                    <td className="col"><label>Descripción <input type="text" className="form-control" id="nombre" name="programa_descripcion" onChange={this.handleChange}></input></label></td>
                                                </tr>
                                                <tr className="row">
                                                    <td className="col">
                                                        <label>
                                                            Tipo afiliación
                                                            <select className="form-control form-control-sm" defaultValue="1" name="programa_clasea" onChange={this.handleChangeC }>
                                                                {Object.keys(clasesa).map((key) => (
                                                                    <option key={key} id={key} value={clasesa[key]['id']}>{clasesa[key]['clase']}</option>
                                                                ))}
                                                            </select>
                                                        </label>
                                                    </td>
                                                    <td className="col">
                                                        <label>
                                                            Incapacidad
                                                            <select className="form-control form-control-sm" defaultValue="1" name="programa_incapacidad" onChange={this.handleChangeC }>
                                                                <option value='1'>Si</option>
                                                                <option value='0'>No</option>
                                                            </select>
                                                        </label>
                                                    </td>
                                                    <td className="col align-self-center"><button type="submit" className="btn btn-success btn-sm " onClick={this.handleSubmitPrograma}>Guardar</button></td>
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
                                            <input type="text" className="form-control form-control-sm" name="editar_clase" defaultValue={this.state.nombreClase} onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Abbr</label>
                                            <input type="text" className="form-control form-control-sm" name="editar_abbr" onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Estado</label>
                                            <select className="form-control form-control-sm" defaultValue="1" name="editar_clase_activo">
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer><button className="btn btn-primary btn-sm" onClick={ this.handleGuardarClase }>Guardar</button><button className="btn btn-primary btn-sm" onClick={ this.handleCerrarModal }>Cerrar</button></Modal.Footer>
                </Modal>
                <Modal show={this.state.modalEstadoOpen}>
                    <Modal.Header>Estado</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Estado</label>
                                            <input type="text" className="form-control form-control-sm" name="editar_estadoa" defaultValue={this.state.nombreEstado} onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Incapacidad</label>
                                            <select className="form-control form-control-sm" defaultValue="1" name="editar_incapacidad">
                                                <option value="1">Si</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Activo</label>
                                            <select className="form-control form-control-sm" defaultValue="1" name="editar_estadoa_activo">
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer><button className="btn btn-primary btn-sm" onClick={ this.handleGuardarEstado }>Guardar</button><button className="btn btn-primary btn-sm" onClick={ this.handleCerrarModal }>Cerrar</button></Modal.Footer>
                </Modal>
                <Modal show={this.state.modalProgramaOpen}>
                    <Modal.Header>Programa</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Código</label>
                                            <input type="text" className="form-control form-control-sm" name="editar_programa_codigo" defaultValue={this.state.codigoPrograma} onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Tipo afiliación</label>
                                            <select className="form-control form-control-sm" defaultValue="1" name="editar_programa_clasea">
                                            {Object.keys(clasesa).map((key) => (
                                                <option key={key} id={key} value={clasesa[key]['id']}>{clasesa[key]['clase']}</option>
                                            ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Descripción</label>
                                            <input type="text" className="form-control form-control-sm" name="editar_programa_descripcion" defaultValue={this.state.nombrePrograma} onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Incapacidad</label>
                                            <select className="form-control form-control-sm" defaultValue="1" name="editar_programa_incapacidad">
                                                <option value="1">Si</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Estado</label>
                                            <select className="form-control form-control-sm" defaultValue="1" name="editar_programa_activo">
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer><button className="btn btn-primary btn-sm" onClick={ this.handleGuardarPrograma }>Guardar</button><button className="btn btn-primary btn-sm" onClick={ this.handleCerrarModal }>Cerrar</button></Modal.Footer>
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
