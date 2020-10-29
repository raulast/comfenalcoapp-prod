import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableUsers from './TableUsers.js';
import Modal from "react-bootstrap/Modal";


import axios from 'axios';



class UsuariosSistema extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: '',
            nombre: '',
            correo: '',
            nuevo: 'oculto',
            modalOpen: false,
            contraseña: '',
            editarContraseña: false,
            tipo: '',
            confirmar:'',
            errors : {
                nombre : 'oculto',
                correo:'oculto',
                tipo: 'oculto',
                contraseña:'oculto',
                confirmar:'oculto',

            },
            errorMensajes :{
                nombre : '',
                correo:'',
                tipo: '',
                contraseña:'',
                confirmar:'',
            },
            IdEditar:'00'
        }
        // bind
        this.getSystemUsers = this.getSystemUsers.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validarForm = this.validarForm.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.handleCerrarModal = this.handleCerrarModal.bind(this);
        this.handleGuardar = this.handleGuardar.bind(this);
        this.handleEditPassword = this.handleEditPassword.bind(this);
        this.getSystemUsers();
    }

    handleCreate() {
        this.setState({
            nuevo:'visible'
          });
    }

    handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
        console.log(this.state)
    }

    handleEdition(id,usuario,correo,tipo){
        this.setState({
            nombre: usuario,
            correo: correo,
            tipo: tipo,
            modalOpen: true,
            IdEditar:id
        });
        console.log('Edit: ', this.state)
    }

    handleCerrarModal(){
        this.setState({
            nombre:'',
            correo: '',
            tipo: '',
            modalOpen: false,
        });

    }

    handleEliminar(id){
        let url = `usuario/user/${id}/eliminar`;
        axios.delete(url)
            .then(resp => {
                this.props.showToast(resp.data.data,'success')
                this.getSystemUsers();
                        this.setState({
                            users: this.state.users,
                        });
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleSubmit(e){
        e.preventDefault();
        let resp = this.validarForm();
        let url = 'usuario/user/agregar';
        if (resp) {
            axios.post(url, {
                name:this.state.nombre,
                email:this.state.correo,
                password:this.state.contraseña,
                tipo:this.state.tipo
            })
                .then(resp => {
                    let user = resp.data.row;
                    this.setState({
                        users: [...this.state.users, user],
                        nuevo: 'oculto'
                    });
                    this.props.showToast('Datos almacenados','success');
                    // alert("Datos almacenados")
                })
                .catch(err => {
                    this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error');
                })
        } 
    }

    validarForm() {

        this.clearErrors()
        const { editarContraseña } = this.state;
        let resp = true;
        let newState = Object.assign({}, this.state);
        Object.entries(this.state).map(([key, value]) => {
            if (value == '' && key != 'modalOpen' && editarContraseña){
                newState.errors[key] = "visible";
                console.log(key)
                newState.errorMensajes[key] = key + " requerido";
                resp = false;
            }
        });

        if (resp && editarContraseña){
            if (newState.contraseña != newState.confirmar){
                newState.errors.contraseña = "visible";
                newState.errorMensajes.contraseña = "Contraseñas no coinciden";
                resp = false;
            }
        }

        this.setState(newState);
        return resp;

    }

    clearErrors(){
        let newState = Object.assign({}, this.state);
       // console.log(Object.entries(newState));
        Object.keys(newState.errors).forEach(key => {
            newState.errors[key] = "oculto";
        });
        this.setState(newState);
        let newState2 = Object.assign({}, this.state);
        Object.keys(newState2.errorMensajes).forEach(key => {
            newState2.errorMensajes[key] = '';
        });
        //console.log(newState);
        this.setState(newState2);
    }

    getSystemUsers() {
        let url = 'getSystemUsers'
        axios.get(url)
            .then(resp => {
                //console.log(resp.data.data);
                this.setState({
                    users: resp.data.data,
                });

            })
            .catch(err => {
                console.log(err)
            })
    }

    handleGuardar() {
        let id = this.state.IdEditar;
        let url = `usuario/user/${id}/editar`;
        let resp = this.validarForm()
        if (resp) {
            axios.put(url, {
                name:this.state.nombre,
                email:this.state.correo,
                password:this.state.contraseña,
                tipo:this.state.tipo
            })
                .then(resp => {
                    this.getSystemUsers()
                    this.setState({
                        users: [...this.state.users]
                    });
                    this.handleCerrarModal()
                    this.props.showToast('Datos Actualizados','success');
                    // alert("Datos almacenados")
                })
                .catch(err => {
                    this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error');
                })
        }
    }

    handleEditPassword() {
        if(!this.state.editarContraseña) {
            this.setState({
                editarContraseña: true, 
            })
        }else {
            this.setState({
                editarContraseña: false, 
            })
        }
    }

    render() {
        const { users, editarContraseña} = this.state;

        const editpassword = () =>{
            console.log(editarContraseña);
            if(editarContraseña){
                return (
                    <article className="form-group">
                        <div className="form-group">
                            <label htmlFor="codigo">Contraseña</label>
                            <input type="password" className="form-control form-control-sm" name="contraseña" onChange={this.handleChange }/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="codigo">Confirmar contraseña</label>
                            <input type="password" className="form-control form-control-sm" name="confirmar" onChange={this.handleChange }/>
                        </div>
                    </article>
                )
            }
        }

        return (
            <div>
                <br/><br/>
                <button className="btn btn-success btn-sm" onClick={this.handleCreate}>+ Crear</button>
                <div className="row mt-5">
                    <div className={this.state.nuevo}>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg2 titulo">Usuarios </div>
                                <div className="card-body texto">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label htmlFor="nombre">Nombre</label>
                                                    <input type="text" className="form-control" id="nombre" name="nombre" onChange={this.handleChange} value={this.state.nombre}></input>
                                                    <div className={this.state.errors['nombre']}>
                                                        <div className={ "redf  " + ( this.state.errors['nombre'] || "") }>{this.state.errorMensajes['nombre']}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="nombre">Correo electrónico</label>
                                                    <input type="email" className="form-control" id="correo" name="correo" onChange={this.handleChange} value={this.state.correo}></input>
                                                    <div className={this.state.errors['correo']}>
                                                        <div className={ "redf  " + ( this.state.errors['correo'] || "") }>{this.state.errorMensajes['correo']}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <label htmlFor="nombre">Tipo</label>
                                                    <select className="form-control" id="tipo" name="tipo" onChange={this.handleChange} value={this.state.tipo}>
                                                        <option value=""></option>
                                                        <option value="0">Admin</option>
                                                        <option value="1">Médico</option>
                                                        <option value="2">Auxiliar Pemel</option>
                                                        <option value="3">Admin Pemel</option>
                                                        <option value="4">Admin IPS</option>
                                                        <option value="5">Usuarios Admin</option>
                                                    </select>
                                                    <div className={this.state.errors['tipo']}>
                                                        <div className={ "redf  " + ( this.state.errors['tipo'] || "") }>{this.state.errorMensajes['tipo']}</div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label htmlFor="nombre">Contraseña</label>
                                                    <input type="password" className="form-control" id="contraseña" name="contraseña" onChange={this.handleChange}></input>
                                                    <div className={this.state.errors['contraseña']}>
                                                        <div className={ "redf  " + ( this.state.errors['contraseña'] || "") }>{this.state.errorMensajes['contraseña']}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="nombre">Confirmar Contraseña</label>
                                                    <input type="password" className="form-control" id="confirmar" name="confirmar" onChange={this.handleChange}></input>
                                                    <div className={this.state.errors['confirmar']}>
                                                        <div className={ "redf  " + ( this.state.errors['confirmar'] || "") }>{this.state.errorMensajes['confirmar']}</div>
                                                    </div>
                                                </div>
                                           <div className="col-md-2">
                                                    <br /><br />
                                                    <button type="submit" className="btn btn-success btn-sm">Guardar</button>
                                                </div>     
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Usuarios registrados</div>
                            <div className="card-body texto">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Correo</th>
                                            <th scope="col">Tipo</th>
                                        </tr>
                                    </thead>
                                    <TableUsers users={users} handleEdition ={this.handleEdition} handleEliminar ={this.handleEliminar}/>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.modalOpen}>
                    <Modal.Header>Usuario</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Nombre</label>
                                            <input type="text" className="form-control form-control-sm" name="nombre" defaultValue={this.state.nombre} onChange={this.handleChange }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Correo</label>
                                            <input type="text" className="form-control form-control-sm" name="correo" defaultValue={this.state.correo} onChange={this.handleChange}/>
                                        </div>

                                        { 
                                            editpassword()
                                        }

                                        <div className="form-group">
                                            <label htmlFor="estado_causa">Tipo</label>
                                            <select className="form-control form-control-sm" name="tipo" defaultValue={this.state.tipo} onChange={this.handleChange }>
                                            <option value=""></option>
                                                        <option value="0">Admin</option>
                                                        <option value="1">Médico</option>
                                                        <option value="2">Auxiliar Pemel</option>
                                                        <option value="3">Admin Pemel</option>
                                                        <option value="4">Admin IPS</option>
                                                        <option value="5">Usuarios Admin</option>
                                            </select>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary btn-sm" onClick={ this.handleEditPassword }>Editar Contraseña</button>
                        <button className="btn btn-primary btn-sm" onClick={ this.handleGuardar }>Guardar</button>
                        <button className="btn btn-primary btn-sm" onClick={ this.handleCerrarModal }>Cerrar</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

export default UsuariosSistema;
/*
if (document.getElementById('menuUsuarios')) {
    ReactDOM.render(<MenuUsuarios />, document.getElementById('menuUsuarios'));
}
*/
