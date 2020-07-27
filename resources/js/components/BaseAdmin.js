import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableCausas from './TableCausas.js';

import axios from 'axios';



class CausasAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            causas: '',
            nombre: '',
            errors : {
                nombre : 'oculto',      
            },
            errorMensajes :{
                nombre : '',
            }
        }
        // bind
        this.getSystemUsers = this.getSystemCausas.bind(this);
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validarForm = this.validarForm.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.getSystemCausas();
    }
    
    handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
    }
    handleEdition(id){
        
    }
    handleEliminar(id){
        
    }
    handleSubmit(e){          
        
    }
    validarForm() {
        
    }
    clearErrors(){
        
    }   
    getSystemCausas() {
        let url = 'getSystemCausas'
        axios.get(url)
            .then(resp => {
                console.log(resp.data.data);
                this.setState({
                    causas: resp.data.data,
                });

            })
            .catch(err => {
                console.log(err)
            })

    }
    
    render() {
        const { causas } = this.state;
        return (
            <div>
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Causas</div>
                            <div className="card-body texto">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label htmlFor="nombre">Nombre</label>
                                                <input type="text" className="form-control" id="nombre" name="nombre" onChange={this.handleChange} value={this.state.nombre}></input>
                                                <div className={this.state.errors['nombre']}>
                                                    <div className={ "invalid-feedback  " + ( this.state.errors['nombre'] || "") }>{this.state.errorMensajes['nombre']}</div>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        <div className="row">
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
                            <div className="card-header bg2 titulo">Causas externas</div>
                            <div className="card-body texto">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <TableCausas causas={causas} handleEdition ={this.handleEdition} handleEliminar ={this.handleEliminar}/>
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
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