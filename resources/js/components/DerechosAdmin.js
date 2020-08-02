import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.getSystemClasesa();
        this.getSystemEstadosa();
        this.getSystemDescripciones();
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