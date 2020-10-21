import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableUsers from './TableUsers.js';

import axios from 'axios';



class UsuariosSistema extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: '',
            nombre: '',
            correo: '',
            contraseña: '',
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
            }
        }
        // bind
        this.getSystemUsers = this.getSystemUsers.bind(this);
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validarForm = this.validarForm.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.getSystemUsers();
    }
    
    handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
    }
    handleEdition(id){
        console.log(id)
        let url = 'getUser'
        axios.post(url, { userId: id })
            .then(resp => {
                console.log(resp.data.data[0].name);
                this.setState({
                    nombre: resp.data.data[0].name,
                    correo: resp.data.data[0].email,
                    tipo : resp.data.data[0].tipo
                });

            })
            .catch(err => {
                console.log(err)
            })
    }
    handleEliminar(id){
        console.log(id)
        let url = 'deleteUser'
        axios.post(url, { userId: id })
            .then(resp => {
                alert(resp.data)
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
        let resp = this.validarForm()
        
        if (resp) {
            let url = 'saveUser'
           // console.log(this.state);
            axios.post(url, { datos: this.state })
                .then(resp => {
                    console.log(resp);
                    //location.reload();
                    
                    let user = resp.data.data;
                    if (user == 0){
                        this.getSystemUsers();
                        this.setState({
                            users: this.state.users, 
                        });  
                        
                    }
                    else{
                        this.setState({
                            users: [...this.state.users, user]
                        });  
                    }
                    alert("Datos almacenados")
                })
                .catch(err => {
                    console.log(err)
                })
            
        }
        
    }
    validarForm() {
        
        this.clearErrors()
        
        let resp = true;
        let newState = Object.assign({}, this.state);
        Object.entries(this.state).map(([key, value]) => {
            if (value == ''){
                newState.errors[key] = "visible";
                newState.errorMensajes[key] = key + " requerido"; 
                resp = false;
            }
        });
       
        if (resp){
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
    
    render() {
        const { users } = this.state;
        return (
            <div>
                <div className="row mt-5">
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