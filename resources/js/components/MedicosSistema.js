import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableMedicos from './TableMedicos.js';
import Modal from "react-bootstrap/Modal";
import Buscador from "./Buscador";

import axios from 'axios';
import ReactPaginate from 'react-paginate';


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
            editarContraseña: false,
            modalOpen: false,
            nombre:'',
            especialidad:'',
            contraseña:'',
            confirmar:'',
            user_id:'',
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
            },
            fuse_options: {
                useExtendedSearch: true,
                findAllMatches: true,
                minMatchCharLength: 2,
                location: 0,
                threshold: 0.3,
                distance: 10,
                ignoreFieldNorm: true,
                keys: [
                   {
                    name: 'nombre',
                    weight: 2
                   },
                   "reg_medico",
                   {
                    name: "email",
                    weight: 2
                   },
                   {
                    name:"num_documento",
                    weight: 2
                   }
                ]
            },
            IdEditar:'00',

            data: [],
            page: [],
            perPage: 10,

            offset:0,
            currentPage: 0,
            pageCount: 0
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
        this.handleListar = this.handleListar.bind(this);
        this.handleEditPassword = this.handleEditPassword.bind(this);


        this.getData = this.getData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
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
        //console.log(this.state);
    }
    handleEdition(id,datos){
        //console.log(id)
        this.setState({
            modalOpen: true,
            IdEditar:id,
            codigoMedico: datos[0],
            tipoDocumento: datos[1],
            numeroDocumento: datos[2],
            registroMedico: datos[4],
            nombre: datos[3],
            especialidad: datos[5],
            correo: datos[6]
        });
    }

    handleEliminar(id){
        let url = `usuario/medico/${id}/eliminar`;
        axios.delete(url)
            .then(resp => {
                this.props.showToast(resp.data.data,'success')
                this.getMedicosUsers();
                        this.setState({
                            medicos: this.state.medicos,
                        });
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleCerrarModal(){
        this.setState({
            modalOpen: false,
        });

    }

    handleSubmit(e){
        e.preventDefault();
        let resp = this.validarForm()
        if (resp) {
            let url = 'usuario/medico/agregar';
            axios.post(url, {
                email:this.state.correo,
                password:this.state.contraseña,

                cod_medico:this.state.codigoMedico,
                nombre:this.state.nombre,
                tipo_documento:this.state.tipoDocumento,
                num_documento:this.state.numeroDocumento,
                reg_medico:this.state.registroMedico,
                especialidad:this.state.especialidad
            })
                .then(resp => {
                    let user = resp.data.row;
                    this.setState({
                        medicos: [...this.state.medicos, user],
                        nuevo: 'oculto'
                    });
                    this.props.showToast('Datos almacenados','success');
                    // alert("Datos almacenados")
                })
                .catch(err => {
                    console.log(err);
                    this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error');
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
        if (resp && this.state.editarContraseña){
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
        let url ='usuario/medico'
        axios.get(url)
            .then(resp => {
                this.setState({
                    page: resp.data.data,
                    data: resp.data.data
                },()=>{
                    this.getData();
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

     handleGuardar(e) {
         e.preventDefault()
        let id = this.state.IdEditar;
        let url = `usuario/medico/${id}/editar`;
        let resp = this.validarForm()
        if (resp) {
            axios.put(url, {
                password:this.state.contraseña,
                email: this.state.correo,
                cod_medico:this.state.codigoMedico,
                nombre:this.state.nombre,
                tipo_documento:this.state.tipoDocumento,
                num_documento:this.state.numeroDocumento,
                reg_medico:this.state.registroMedico,
                especialidad:this.state.especialidad
            })
                .then(resp => {
                    this.getMedicosUsers()
                    this.setState({
                        medicos: [...this.state.medicos]
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

    handleListar(arg){
        if (arg) {
            this.setState({
                page:arg
            },()=>{
                this.getData()
            });
        } else {
            this.getMedicosUsers();
        }
    }

    getData(){
        const data = this.state.page;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);

        this.setState({
            medicos: slice,
            pageCount: Math.ceil(data.length / this.state.perPage)
        })
    }

    handlePageClick(e){
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        },()=>{
            this.getData();
        });

    }


    render() {
        const { medicos, editarContraseña } = this.state;

        const textButton = () => {
            if (!editarContraseña) {
                return(
                    'Editar contraseña'
                )
            }else {
                return 'No editar contraseña'
            }
        }

        const editpassword = () =>{
            // console.log(editarContraseña);
            if(editarContraseña){
                return (
                    <article className="form-group">
                        <div className="form-group">
                            <label htmlFor="codigo">Contraseña</label>
                            <input type="password" className="form-control form-control-sm" name="contraseña" onChange={this.handleChange } required/>
                        </div>
                        <div className={this.state.errors['contraseña']}>
                            <div className={ "redf  " + ( this.state.errors['contraseña'] || "") }>{this.state.errorMensajes['contraseña']}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="codigo">Confirmar contraseña</label>
                            <input type="password" className="form-control form-control-sm" name="confirmar" onChange={this.handleChange } required/>
                        </div>
                        <div className={this.state.errors['confirmar']}>
                            <div className={ "redf  " + ( this.state.errors['confirmar'] || "") }>{this.state.errorMensajes['confirmar']}</div>
                        </div>
                    </article>
                )
            }
        }
        return (
           <div>
            <br/><br/>
            <button className="btn btn-success btn-sm" onClick={this.handleCreate}>+ Crear</button>
            <Buscador
                list={this.state.data}
                options={this.state.fuse_options}
                toRender={(arg)=>this.handleListar(arg)}
            />
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
                                                        <input type="text" className="form-control" id="codigoMedico" name="codigoMedico" onChange={this.handleChange} defaultValue={this.state.codigoMedico} required></input>
                                                        <div className={this.state.errors['codigoMedico']}>
                                                            <div className={ "redf  " + ( this.state.errors['codigoMedico'] || "") }>{this.state.errorMensajes['codigoMedico']}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label htmlFor="tipoDocumento">Tipo documento</label>
                                                        <select className="form-control" id="tipoDocumento" name="tipoDocumento" onChange={this.handleChange} defaultValue={this.state.tipoDocumento} required>
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
                                                        <label htmlFor="numeroDocumento">No. Documento</label>
                                                        <input type="text" className="form-control" id="numeroDocumento" name="numeroDocumento" onChange={this.handleChange} defaultValue={this.state.numeroDocumento} required></input>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label htmlFor="registroMedico">No. Registro</label>
                                                        <input type="text" className="form-control" id="registroMedico" name="registroMedico" onChange={this.handleChange} defaultValue={this.state.registroMedico} required></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label htmlFor="nombre">Nombre</label>
                                                        <input type="text" className="form-control" id="nombre" name="nombre" onChange={this.handleChange} defaultValue={this.state.nombreUsaurio} value={this.state.nombre} required></input>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="nombre">Correo electrónico</label>
                                                        <input type="email" className="form-control" id="correo" name="correo" onChange={this.handleChange} defaultValue={this.state.correo} required></input>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="especialidadMedica">Especialidad médica</label>
                                                        <select id="especialidad" className="form-control" name="especialidad" onChange={this.handleChange} defaultValue={this.state.especialidad} required>
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
                                                        <input type="password" className="form-control" id="contraseña" name="contraseña" onChange={this.handleChange} defaultValue={this.state.contraseña} required></input>
                                                    </div>
                                                    <div className={this.state.errors['contraseña']}>
                                                        <div className={ "redf  " + ( this.state.errors['contraseña'] || "") }>{this.state.errorMensajes['contraseña']}</div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="nombre">Confirmar Contraseña</label>
                                                        <input type="password" className="form-control" id="confirmar" name="confirmar" onChange={this.handleChange} defaultValue={this.state.confirmar} required></input>
                                                    </div>
                                                    <div className={this.state.errors['confirmar']}>
                                                        <div className={ "redf  " + ( this.state.errors['confirmar'] || "") }>{this.state.errorMensajes['confirmar']}</div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label htmlFor="rethus">Rethus</label>
                                                        <select className="form-control" id="rethus" name="rethus" onChange={this.handleChange} defaultValue={this.state.rethus}>
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
                                        <th scope="col">Correo</th>
                                        <th scope="col">Especialidad</th>
                                    </tr>
                                </thead>
                                <TableMedicos medicos={medicos} handleEdition ={this.handleEdition} handleEliminar ={this.handleEliminar}/>
                            </table>
                        </div>
                    </div>
                </div>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
            <Modal show={this.state.modalOpen}>
                    <Modal.Header>Medico</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form id="editarMedico" onSubmit={ this.handleGuardar }>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Código</label>
                                            <input type="text" className="form-control form-control-sm" name="codigoMedico" defaultValue={this.state.codigoMedico} onChange={this.handleChange } required/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tipoDocumento">Tipo Documento</label>
                                            <select className="form-control form-control-sm" name="tipoDocumento" defaultValue={this.state.tipoDocumento} onChange={this.handleChange } required>
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
                                            <input type="text" className="form-control form-control-sm" name="numeroDocumento" defaultValue={this.state.numeroDocumento} onChange={this.handleChange } required/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">No. Registro</label>
                                            <input type="text" className="form-control form-control-sm" name="registroMedico" defaultValue={this.state.registroMedico} onChange={this.handleChange } required/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Nombre</label>
                                            <input type="text" className="form-control form-control-sm" name="nombre" defaultValue={this.state.nombre} onChange={this.handleChange } required/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Correo</label>
                                            <input type="text" className="form-control form-control-sm" name="correo" defaultValue={this.state.correo} onChange={this.handleChange } required/>
                                        </div>

                                        {
                                            editpassword()
                                        }

                                        <div className="form-group">
                                            <label htmlFor="especialidadMedica">Especialidad médica</label>
                                            <select className="form-control form-control-sm" name="especialidad" defaultValue={this.state.especialidad} onChange={this.handleChange } required>
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
                    <Modal.Footer>
                        <button className="btn btn-info btn-sm" onClick={ this.handleEditPassword }>{textButton()}</button>
                        <button type="submit" form="editarMedico" className="btn btn-primary btn-sm" >Guardar</button>
                        <button className="btn btn-primary btn-sm" onClick={ this.handleCerrarModal }>Cerrar</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

export default MedicosSistema;
