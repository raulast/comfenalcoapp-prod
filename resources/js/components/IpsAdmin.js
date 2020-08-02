import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableIps from './TableIps.js';

import axios from 'axios';



class IpsAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ips: '',
        
            errors : {
                  
            },
            errorMensajes :{
                
            }
        }
        // bind
        this.getSystemIps = this.getSystemIps.bind(this);
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validarForm = this.validarForm.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.getSystemIps();
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
    getSystemIps() {
        let url = 'getSystemIps'
        axios.get(url)
            .then(resp => {
               // console.log(resp.data.data);
                this.setState({
                    ips: resp.data.data,
                });

            })
            .catch(err => {
                console.log(err)
            })

    }
    
    render() {
        const { ips } = this.state;
        return (
            <div>
                
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo"></div>
                            <div className="card-body texto">
                                <table className="table table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Código Sede</th>
                                            <th scope="col">Nombre Sede</th>
                                            <th scope="col">Cod. Habilitación</th>
                                            <th scope="col">Dirección</th>
                                            <th scope="col">Teléfono</th>
                                            <th scope="col">Razón Social</th>
                                            <th scope="col">Nit</th>
                                        </tr>
                                    </thead>
                                    <TableIps ips={ips} handleEdition ={this.handleEdition} handleEliminar ={this.handleEliminar}/>
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default IpsAdmin;
/*
if (document.getElementById('menuUsuarios')) {
    ReactDOM.render(<MenuUsuarios />, document.getElementById('menuUsuarios'));
}
*/