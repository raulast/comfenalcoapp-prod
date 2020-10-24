import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableIps from './TableIps.js';
import Modal from "react-bootstrap/Modal";


import axios from 'axios';



class IpsAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ips: '',
            modalOpen: false,
            nuevo:'oculto',
            name: {},
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
        this.handleChange = this.handleChange.bind(this);
        this.handleCrear = this.handleCrear.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.handleCerrarModal = this.handleCerrarModal.bind(this);

        this.getSystemIps();
    }
    
    handleCrear() {
        this.setState({
            nuevo:'visible'
          });
    }

    handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
    }

    handleEdition(id,name){
        this.setState({
            modalOpen: true,
            name: name
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
                <br/>
                <button className="btn btn-success btn-sm" onClick={this.handleCrear}>+ Crear</button>
                <div className="row mt-2">
                    <div className={this.state.nuevo}>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body texto">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table className="container">
                                                <tr className="row">
                                                    <td className="col"><label>Código Sede <input type="text" className="form-control" id="nombre" name="crear_clase" onChange={this.handleChange}></input></label></td>
                                                    <td className="col"><label>Nombre Sede <input type="text" className="form-control" id="nombre" name="crear_abbr" onChange={this.handleChange}></input></label></td>
                                                </tr>
                                                <tr className="row">
                                                    <td className="col"><label>Cód. Habilitación <input type="text" className="form-control" id="nombre" name="crear_abbr" onChange={this.handleChange}></input></label></td>
                                                    <td className="col"><label>Dirección <input type="text" className="form-control" id="nombre" name="crear_abbr" onChange={this.handleChange}></input></label></td>
                                                </tr>
                                                <tr className="row">
                                                    <td className="col"><label>Teléfono <input type="text" className="form-control" id="nombre" name="crear_abbr" onChange={this.handleChange}></input></label></td>
                                                    <td className="col"><label>Razón Social <input type="text" className="form-control" id="nombre" name="crear_abbr" onChange={this.handleChange}></input></label></td>
                                                </tr>
                                                <tr className="row">
                                                    <td className="col"><label>Nit <input type="text" className="form-control" id="nombre" name="crear_abbr" onChange={this.handleChange}></input></label></td>
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
                <Modal show={this.state.modalOpen}>
                    <Modal.Header>IPS</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Código sede</label>
                                            <input type="text" className="form-control form-control-sm" name="causa_editada" defaultValue={this.state.name[0]} onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Nombre sede</label>
                                            <input type="text" className="form-control form-control-sm" name="causa_editada" defaultValue={this.state.name[1]} onChange={this.handleChangeC }/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="codigo">Cod. Habilitación</label>
                                            <input type="text" className="form-control form-control-sm" name="causa_editada" defaultValue={this.state.name[2]} onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Dirección</label>
                                            <input type="text" className="form-control form-control-sm" name="causa_editada" defaultValue={this.state.name[3]} onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Teléfono</label>
                                            <input type="text" className="form-control form-control-sm" name="causa_editada" defaultValue={this.state.name[4]} onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Razón social</label>
                                            <input type="text" className="form-control form-control-sm" name="causa_editada" defaultValue={this.state.name[5]} onChange={this.handleChangeC }/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Nit</label>
                                            <input type="text" className="form-control form-control-sm" name="causa_editada" defaultValue={this.state.name[6]} onChange={this.handleChangeC }/>
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

export default IpsAdmin;
/*
if (document.getElementById('menuUsuarios')) {
    ReactDOM.render(<MenuUsuarios />, document.getElementById('menuUsuarios'));
}
*/