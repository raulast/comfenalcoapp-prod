import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableCie10 from './TableCie10.js';

import axios from 'axios';



class Cie10Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cies: '',
        
            errors : {
                  
            },
            errorMensajes :{
                
            }
        }
        // bind
        this.getSystemCie10 = this.getSystemCie10.bind(this);
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validarForm = this.validarForm.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.getSystemCie10();
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
    getSystemCie10() {
        let url = 'getSystemCie10'
        axios.get(url)
            .then(resp => {
                console.log(resp.data.data);
                this.setState({
                    cies: resp.data.data,
                });

            })
            .catch(err => {
                console.log(err)
            })

    }
    
    render() {
        const { cies } = this.state;
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
                                            <th scope="col">Código</th>
                                            <th scope="col">Descripción</th>
                                            <th scope="col">Max. días</th>
                                            <th scope="col">Capítulo</th>
                                            <th scope="col">Categoría</th>
                                        </tr>
                                    </thead>
                                    <TableCie10 cies={cies} handleEdition ={this.handleEdition} handleEliminar ={this.handleEliminar}/>
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Cie10Admin;
/*
if (document.getElementById('menuUsuarios')) {
    ReactDOM.render(<MenuUsuarios />, document.getElementById('menuUsuarios'));
}
*/