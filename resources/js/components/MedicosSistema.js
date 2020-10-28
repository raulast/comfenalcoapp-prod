import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableMedicos from './TableMedicos.js';
import Modal from "react-bootstrap/Modal";

import axios from 'axios';


class MedicosSistema extends Component {
    constructor(props) {
        super(props);

        this.state = {
            medicos: '',
            codigoMedico: '',
            tipoDocumento:'',
            numeroDocumento:'',
            registroMedico:'',
            correo:'',
            nuevo: 'oculto',
            modalOpen: false,
            nombre:'',
            especialidad:'',
            contraseña:'',
            confirmar:'',
            errors : {
                codigoMedico : 'oculto',
                tipoDocumento:'oculto',
                registroMedico: 'oculto',
                correo:'oculto',
                epecialidad:'oculto',
                contraseña: 'oculto',
                confirmar:'oculto',
                
            },
            errorMensajes :{
                codigoMedico : 'Código requerido',
                tipoDocumento: 'Tipo requerido',
                registroMedico: 'Registro requerido',
                correo:'Correo requerido',
                epecialidad:'Especialidad requerida',
                contraseña: 'Contraseña requerida',
                confirmar:'Repita contraseña',
            }
        }
        // bind
        this.getMedicosUsers = this.getMedicosUsers.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.validarForm = this.validarForm.bind(this);
        this.handleCerrarModal = this.handleCerrarModal.bind(this);
        this.handleGuardar = this.handleGuardar.bind(this);
        this.getMedicosUsers();
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
        console.log(this.state);
    }
    handleEdition(id,datos){
        console.log(id)
        this.setState({
            modalOpen: true,
            IdEditar:id,
            codigoMedico: datos[0],
            tipoDocumento: datos[1],
            numeroDocumento: datos[2],
            registroMedico: datos[4],
            nombre: [3],
            especialidad:[5],
        });
    }

    handleEliminar(id){
      //  console.log(id) 
    }

    handleCerrarModal(){
        this.setState({
            modalOpen: false,
        });

    }

    handleSubmit(e){         
        e.preventDefault();
        let resp = this.validarForm()
        console.log(resp)
        if (resp) {
            let url = 'saveMedico'
            console.log(this.state);
            axios.post(url, { datos: this.state })
                .then(resp => {
                    console.log(resp);
                    this.props.showToast('Datos almacenados','success')
                    let medico = resp.data.data;
                    if (medico == 0){
                        
                        this.getMedicosUsers();
                        this.setState({
                            medicos: this.state.medicos, 
                        });  
                        
                    }
                    else{
                        this.setState({
                            medicos: [...this.state.medicos, medico]
                        });  
                    }
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
        /*
        Object.entries(this.state).map(([key, value]) => {
            if (value == ''){
                newState.errors[key] = "visible";
                //newState.errorMensajes[key] = key + " requerido"; 
                resp = false;
            }
        });
        */
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
           // newState2.errorMensajes[key] = '';
        });
        //console.log(newState);
        this.setState(newState2);
    }  
    getMedicosUsers(){
        let url ='getMedicosUsers'
        axios.get(url)
            .then(resp => {
                //console.log(resp.data.data);
                this.setState({
                    medicos:resp.data.data,   
                });
               
            })
            .catch(err =>{
                console.log(err)
            })
       
    }
    renderUsers(){
        const { medicos } = this.state;
        
        return (
            <tbody> 
                 {Object.keys(medicos).map((key)=>(
                    <tr key={key}>
                    
                    <td>{ medicos[key]['cod_medico']}</td>
                    <td>{ medicos[key]['tipo_documento']}</td>
                    <td>{ medicos[key]['num_documento']}</td>
                    <td>{ medicos[key]['nombre']}</td>
                    <td>{ medicos[key]['reg_medico']}</td>
                    <td>{ medicos[key]['especialidad']}</td>
                    <td><button className="btn btn-warning btn-sm">Editar</button></td>
                    <td><button className="btn btn-danger btn-sm">Eliminar</button></td>
                </tr>
                ))}
            </tbody>

        );
     }

     handleGuardar() {
        this.handleCerrarModal()
    }
    
    render() {
        const { medicos } = this.state;
        return (
           <div>
            <br/><br/>
            <button className="btn btn-success btn-sm" onClick={this.handleCreate}>+ Crear</button>
            <div className="row mt-5">
                <div className={this.state.nuevo}>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Médicos </div>
                                <div className="card-body texto">
                                    <form onSubmit={this.handleSubmit}> 
                                        <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label htmlFor="codigoMedico">Código</label>
                                                        <input type="text" className="form-control" id="codigoMedico" name="codigoMedico" onChange={this.handleChange} value={this.state.codigoMedico}></input>
                                                        <div className={this.state.errors['codigoMedico']}>
                                                            <div className={ "redf  " + ( this.state.errors['codigoMedico'] || "") }>{this.state.errorMensajes['codigoMedico']}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label htmlFor="tipoDocumento">Tipo documento</label>
                                                        <select className="form-control" id="tipoDocumento" name="tipoDocumento" onChange={this.handleChange} value={this.state.tipoDocumento}>
                                                            <option value=""></option>
                                                            <option value="CC">CC</option>
                                                            <option value="NIT">NIT</option>
                                                            <option value="TI">TI</option>
                                                            <option value="CE">CE</option>
                                                            <option value="PA">PA</option>
                                                            <option value="RC">RC</option>
                                                            <option value="NUIP">NUIP</option>
                                                            <option value="MS">MS</option>
                                                            <option value="CN">CN</option>
                    
                                                        </select>
                                                        <div className={this.state.errors['tipoDocumento']}>
                                                            <div className={ "redf  " + ( this.state.errors['tipoDocumento'] || "") }>{this.state.errorMensajes['tipoDocumento']}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label htmlFor="codigoMedico">No. Documento</label>
                                                        <input type="text" className="form-control" id="numeroDocumento" name="numeroDocumento" onChange={this.handleChange} value={this.state.numeroDocumento}></input>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label htmlFor="registroMedico">No. Registro</label>
                                                        <input type="text" className="form-control" id="registroMedico" name="registroMedico" onChange={this.handleChange} value={this.state.registroMedico}></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label htmlFor="nombre">Nombre</label>
                                                        <input type="text" className="form-control" id="nombre" name="nombre" onChange={this.handleChange} value={this.state.nombreUsaurio} value={this.state.nombre}></input>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="nombre">Correo electrónico</label>
                                                        <input type="email" className="form-control" id="correo" name="correo" onChange={this.handleChange} value={this.state.correo}></input>
                                                    </div> 
                                                    <div className="col-md-4">
                                                        <label htmlFor="especialidadMedica">Especialidad médica</label>
                                                        <select id="especialidad" className="form-control" name="especialidad" onChange={this.handleChange} value={this.state.especialidad}>
                                                            <option value=""></option>
                                                            <option value="1">Médico general</option>
                                                            <option value="2">Médico especialista</option>
                                                            <option value="5">Médico laboral</option>
                                                            <option value="3">Odontólogo general</option>
                                                            <option value="4">Odontólogo especialista</option>
                                                            
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label htmlFor="nombre">Contraseña</label>
                                                        <input type="password" className="form-control" id="contraseña" name="contraseña" onChange={this.handleChange} value={this.state.contraseña}></input>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="nombre">Confirmar Contraseña</label>
                                                        <input type="password" className="form-control" id="confirmar" name="confirmar" onChange={this.handleChange} value={this.state.confirmar}></input>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label htmlFor="rethus">Rethus</label>
                                                        <select className="form-control" id="rethus" name="rethus" onChange={this.handleChange} value={this.state.rethus}>
                                                            <option value=""></option>
                                                            <option value="Si">Si</option>
                                                            <option value="No">No</option>
                                                        </select>
                                                    
                                                    </div>
                                                    <div className="col-md-2">
                                                        <br />
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
                        <div className="card-header bg2 titulo">Medicos registrados</div>
                        <div className="card-body texto">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Código</th>
                                        <th scope="col">Tipo Doc</th>
                                        <th scope="col">No</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Registro</th>
                                        <th scope="col">Especialidad</th>
                                    </tr>
                                </thead>
                                <TableMedicos medicos={medicos} handleEdition ={this.handleEdition} handleEliminar ={this.handleEliminar}/>
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
                                            <label htmlFor="codigo">Código</label>
                                            <input type="text" className="form-control form-control-sm" name="codigoMedico" defaultValue={this.state.codigoMedico} onChange={this.handleChange }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tipoDocumento">Tipo Documento</label>
                                            <select className="form-control form-control-sm" name="tipoDocumento" defaultValue={this.state.tipoDocumento} onChange={this.handleChange }>
                                            <option value=""></option>
                                                <option value="CC">CC</option>
                                                <option value="NIT">NIT</option>
                                                <option value="TI">TI</option>
                                                <option value="CE">CE</option>
                                                <option value="PA">PA</option>
                                                <option value="RC">RC</option>
                                                <option value="NUIP">NUIP</option>
                                                <option value="MS">MS</option>
                                                <option value="CN">CN</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">No. Documento</label>
                                            <input type="text" className="form-control form-control-sm" name="numeroDocumento" defaultValue={this.state.numeroDocumento} onChange={this.handleChange }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">No. Registro</label>
                                            <input type="text" className="form-control form-control-sm" name="registroMedico" defaultValue={this.state.registroMedico} onChange={this.handleChange }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Nombre</label>
                                            <input type="text" className="form-control form-control-sm" name="nombre" defaultValue={this.state.nombre} onChange={this.handleChange }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Correo</label>
                                            <input type="text" className="form-control form-control-sm" name="correo" onChange={this.handleChange }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Contraseña</label>
                                            <input type="password" className="form-control form-control-sm" name="contraseña" onChange={this.handleChange }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Confirmar contraseña</label>
                                            <input type="password" className="form-control form-control-sm" name="confirmar" onChange={this.handleChange }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="especialidadMedica">Especialidad médica</label>
                                            <select className="form-control form-control-sm" name="especialidad" defaultValue={this.state.especialidad} onChange={this.handleChange }>
                                            <option value=""></option>
                                                <option value="1">Médico general</option>
                                                <option value="2">Médico especialista</option>
                                                <option value="5">Médico laboral</option>
                                                <option value="3">Odontólogo general</option>
                                                <option value="4">Odontólogo especialista</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="estado_causa">Rethus</label>
                                            <select className="form-control form-control-sm" name="rethus" onChange={this.handleChange }>
                                            <option value=""></option>
                                                <option value="Si">Si</option>
                                                <option value="No">No</option>                                           
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

export default MedicosSistema;
/*
if (document.getElementById('menuUsuarios')) {
    ReactDOM.render(<MenuUsuarios />, document.getElementById('menuUsuarios'));
}
*/