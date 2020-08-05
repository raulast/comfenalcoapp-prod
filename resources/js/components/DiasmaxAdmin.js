import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableDiasmax from './TableDiasmax.js';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';



class DiasmaxAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            esp: '',
            esped:'',
            diasmax:'',
            modalOpen:false,
            nombre: '',
            errors : {
                nombre : 'oculto',      
            },
            errorMensajes :{
                nombre : '',
            }
        }
        // bind
        this.getSystemDiasmax = this.getSystemDiasmax.bind(this);
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validarForm = this.validarForm.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.handleCerrarModal = this.handleCerrarModal.bind(this);
        this.getSystemDiasmax();
    }
    handleEdition(id,esped){

        this.setState({
            esped:esped,
            modalOpen: true,
            
        });
    }
    handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
    }
    handleCerrarModal(){
        this.setState({
           
            modalOpen: false,
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
    getSystemDiasmax() {
        let url = 'getSystemDiasmax'
        axios.get(url)
            .then(resp => {
                //console.log(resp.data.data);
                this.setState({
                    esp: resp.data.data,
                });

            })
            .catch(err => {
                console.log(err)
            })

    }
    
    render() {
        const { esp } = this.state;
        return (
            <div>
                
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Días máximos por especialidad</div>
                            <div className="card-body texto">
                                <table className="table table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Especialidad</th>
                                            <th scope="col">Días máximos</th>
                                            <th scope="col"></th>
                                            
                                        </tr>
                                    </thead>
                                    <TableDiasmax esp={esp} handleEdition ={this.handleEdition} handleEliminar ={this.handleEliminar}/>
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.modalOpen}>
                    <Modal.Header>Días máximos</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Especialidad</label>
                                            <input type="text" className="form-control form-control-sm" name="especialidad" value={this.state.esped} onChange={this.handleChangeC }/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="capitulo_grupo">Días máximos</label>
                                            <input type="text" className="form-control form-control-sm" name="diasmax" value={this.state.diasmax} onChange={this.handleChangeC }/>
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

export default DiasmaxAdmin;
/*
if (document.getElementById('menuUsuarios')) {
    ReactDOM.render(<MenuUsuarios />, document.getElementById('menuUsuarios'));
}
*/