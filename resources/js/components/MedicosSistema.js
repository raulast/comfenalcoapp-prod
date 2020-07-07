import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableMedicos from './TableMedicos.js';

import axios from 'axios';


class MedicosSistema extends Component {
    constructor(props) {
        super(props);

        this.state = {
            medicos: '',
        }
        // bind
        this.getMedicosUsers = this.getMedicosUsers.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMedicosUsers();
    }
    handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
    }
    handleEdition(id){
        console.log(id)
    }
    handleEliminar(id){
        console.log(id) 
    }
    handleSubmit(e){         
        e.preventDefault();
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
    render() {
        const { medicos } = this.state;
        return (
           <div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header bg2 titulo">Médicos </div>
                            <div className="card-body texto">
                                <form onSubmit={this.handleSubmit}> 
                                    <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label htmlFor="codigoMedico">Código</label>
                                                    <input type="text" className="form-control" id="codigoMedico" onChange={this.handleChange}></input>
                                                </div>
                                                <div className="col-md-3">
                                                    <label htmlFor="tipoDocumento">Tipo documento</label>
                                                    <select className="form-control" id="tipoDocumento" onChange={this.handleTipo} value={this.state.tipoDocumento}>
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
                                                <div className="col-md-3">
                                                    <label htmlFor="codigoMedico">No. Documento</label>
                                                    <input type="text" className="form-control" id="numeroDocumento"></input>
                                                </div>
                                                <div className="col-md-3">
                                                    <label htmlFor="registroMedico">No. Registro</label>
                                                    <input type="text" className="form-control" id="registroMedico"></input>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label htmlFor="nombre">Nombre</label>
                                                    <input type="text" className="form-control" id="nombreUsuario"></input>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="nombre">Correo electrónico</label>
                                                    <input type="email" className="form-control" id="correo"></input>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="especialidadMedica">Especialidad médica</label>
                                                    <select id="especialidadMedica" className="form-control" >
                                                        <option value="0"></option>
                                                        <option value="1">Médico general</option>
                                                        <option value="2">Médico especialista</option>
                                                        <option value="3">Odontólogo general</option>
                                                        <option value="4">Odontólogo especialista</option>
                                                    </select>
                                                </div>
                                                
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label htmlFor="nombre">Contraseña</label>
                                                    <input type="text" className="form-control" id="password"></input>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="nombre">Confirmar Contraseña</label>
                                                    <input type="text" className="form-control" id="passwordConfirmar"></input>
                                                </div>
                                                <div className="col-md-2">
                                                    <br />
                                                    <button className="btn btn-success btn-sm">Guardar</button>
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