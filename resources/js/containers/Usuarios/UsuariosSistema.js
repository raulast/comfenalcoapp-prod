import React, { Component } from 'react';
import TableUsers from './TableUsers.js';
import Modal from "react-bootstrap/Modal";
import Buscador from "../../components/Buscador";
import Selector from "../../components/Selector";

import axios from 'axios';
import ReactPaginate from 'react-paginate';

import './UsuariosSistema.scss';

class UsuariosSistema extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: '',
            nombre: '',
            correo: '',
            nuevo: 'oculto',
            modalOpen: false,
            contraseña: '',
            editarContraseña: false,
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
                    name: 'name',
                    weight: 2
                   },
                   {
                    name: "email",
                    weight: 2
                   }
                ]
            },
            IdEditar:'00',

            buscador: [],
            selector: [],
            tabla: [],
            perPage: 10,

            selector_auto:false,

            offset:0,
            currentPage: 0,
            pageCount: 0
        }
        // bind
        this.getSystemUsers = this.getSystemUsers.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validarForm = this.validarForm.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.handleCerrarModal = this.handleCerrarModal.bind(this);
        this.handleGuardar = this.handleGuardar.bind(this);
        this.handleEditPassword = this.handleEditPassword.bind(this);
        this.handleListar=this.handleListar.bind(this);

        this.getData = this.getData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.getSystemUsers();
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
        // console.log(this.state)
    }

    handleEdition(id,usuario,correo,tipo){
        this.setState({
            nombre: usuario,
            correo: correo,
            tipo: tipo,
            modalOpen: true,
            IdEditar:id
        });
        // console.log('Edit: ', this.state)
    }
    handleListar(arg, tipo){
        if (arg && !tipo) {
            this.setState({
                selector: arg,
                selector_auto:true
            });
        }else if (arg && tipo) {
            this.setState({
                tabla: arg,
                selector_auto:false
            },()=>{
                this.getData()
            });
        }else{
            this.setState({
                tabla: [],
                selector_auto:false
            },()=>{
                this.getData()
            });
        }
    }

    handleCerrarModal(){
        this.setState({
            nombre:'',
            correo: '',
            tipo: '',
            modalOpen: false,
        });

    }

    handleEliminar(id){
        let url = `usuario/user/${id}/eliminar`;
        axios.delete(url)
            .then(resp => {
                this.props.showToast(resp.data.data,'success')
                this.getSystemUsers();
                        this.setState({
                            tabla: this.state.tabla,
                        },()=>{
                            this.getData();
                        });
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleSubmit(e){
        e.preventDefault();
        let resp = this.validarForm();
        let url = 'usuario/user/agregar';
        if (resp) {
            axios.post(url, {
                name:this.state.nombre,
                email:this.state.correo,
                password:this.state.contraseña,
                tipo:this.state.tipo
            })
                .then(resp => {
                    let user = resp.data.row;
                    this.setState({
                        tabla: [...this.state.tabla, user],
                        nuevo: 'oculto'
                    },()=>{
                        this.getData();
                    });
                    this.props.showToast('Datos almacenados','success');
                    // alert("Datos almacenados")
                })
                .catch(err => {
                    this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error');
                })
        }
    }

    validarForm() {
        this.clearErrors()
        const { editarContraseña } = this.state;
        let resp = true;
        let newState = Object.assign({}, this.state);
        Object.entries(this.state).map(([key, value]) => {
            if (value == '' && key != 'modalOpen' && editarContraseña && value != 0){
                newState.errors[key] = "visible";
                console.log(key)
                newState.errorMensajes[key] = key + " requerido";
                resp = false;
            }
        });

        if (resp && editarContraseña){
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
                this.setState({
                    buscador: resp.data.data,
                    selector: resp.data.data,
                    tabla: resp.data.data
                },()=>{
                    this.getData();
                });

            })
            .catch(err => {
                console.log(err)
            })
    }

    handleGuardar(e) {
        e.preventDefault();
        let id = this.state.IdEditar;
        let url = `usuario/user/${id}/editar`;
        let resp = this.validarForm()
        console.log('EDITAR: -> ', this.state.contraseña);
        console.log('RESP: ->', resp);
        if (resp) {
            axios.put(url, {
                name:this.state.nombre,
                email:this.state.correo,
                password:this.state.contraseña,
                tipo:this.state.tipo
            })
                .then(resp => {
                    this.getSystemUsers()
                    this.setState({
                        tabla: [...this.state.tabla]
                    },()=>{
                        this.getData();
                    });
                    this.handleCerrarModal()
                    this.props.showToast('Datos Actualizados','success');
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

    getData(){
        const tabla = this.state.tabla
        const slice = tabla.slice(this.state.offset, this.state.offset + this.state.perPage);

        this.setState({
            users: slice,
            pageCount: Math.ceil(tabla.length / this.state.perPage)
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
        const { users, editarContraseña} = this.state;

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
            if(editarContraseña){
                return (
                    <article className="form-group">
                        <div className="form-group">
                            <label htmlFor="codigo">Contraseña</label>
                            <input 
                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$"
                                title="al menos una mayuscula,
                                        al menos una minuscula,
                                        al menos un número,
                                        al menos un caracter especial,
                                        sin espacios"
                                type="password" 
                                className="form-control" 
                                id="contraseña" 
                                name="contraseña" 
                                onChange={this.handleChange} 
                                required>   
                            </input> 
                       </div>
                        <div className={this.state.errors['contraseña']}>
                            <div className={ "redf  " + ( this.state.errors['contraseña'] || "") }>{this.state.errorMensajes['contraseña']}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="codigo">Confirmar contraseña</label>
                            <input 
                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$"
                                title="al menos una mayuscula,
                                        al menos una minuscula,
                                        al menos un número,
                                        al menos un caracter especial,
                                        sin espacios"
                                type="password" 
                                className="form-control" 
                                id="confirmar" 
                                name="confirmar" 
                                onChange={this.handleChange} 
                                required>   
                            </input>                        
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
                <br/>
                <button className="btn btn-success btn-sm" onClick={this.handleCreate}>+ Crear</button>
                <article className="row mt-5">
                    <div className={this.state.nuevo}>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg2 titulo">Usuarios </div>
                                <div className="card-body texto">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label htmlFor="nombre">Nombre</label>
                                                    <input type="text" className="form-control" id="nombre" name="nombre" onChange={this.handleChange} value={this.state.nombre} required></input>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="nombre">Correo electrónico</label>
                                                    <input type="email" className="form-control" id="correo" name="correo" onChange={this.handleChange} value={this.state.correo} required></input>
                                                </div>
                                                <div className="col-md-2">
                                                    <label htmlFor="nombre">Tipo</label>
                                                    <select className="form-control" id="tipo" name="tipo" onChange={this.handleChange} value={this.state.tipo} required>
                                                        <option value=""></option>
                                                        <option value="0">Admin</option>
                                                        <option value="1">Médico</option>
                                                        <option value="2">Auxiliar Pemel</option>
                                                        <option value="3">Admin Pemel</option>
                                                        <option value="4">Admin IPS</option>
                                                        <option value="5">Usuarios Admin</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label htmlFor="nombre">Contraseña</label>
                                                    <input 
                                                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$"
                                                        title="al menos una mayuscula,
                                                        al menos una minuscula,
                                                        al menos un número,
                                                        al menos un caracter especial,
                                                        sin espacios"
                                                        type="password" 
                                                        className="form-control" 
                                                        id="contraseña" 
                                                        name="contraseña" 
                                                        onChange={this.handleChange} 
                                                        required>   
                                                    </input>
                                                </div>
                                                <div className={this.state.errors['contraseña']}>
                                                    <div className={ "redf  " + ( this.state.errors['contraseña'] || "") }>{this.state.errorMensajes['contraseña']}</div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="nombre">Confirmar Contraseña</label>
                                                    <input 
                                                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$"
                                                        title="al menos una mayuscula,
                                                        al menos una minuscula,
                                                        al menos un número,
                                                        al menos un caracter especial,
                                                        sin espacios"
                                                        type="password" 
                                                        className="form-control" 
                                                        id="confirmar" 
                                                        name="confirmar" 
                                                        onChange={this.handleChange} 
                                                        required>   
                                                    </input>                                                </div>
                                                <div className={this.state.errors['confirmar']}>
                                                    <div className={ "redf  " + ( this.state.errors['confirmar'] || "") }>{this.state.errorMensajes['confirmar']}</div>
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
                            <br/>
                        </div>
                    </div>
                    <article className="container">
                        <section className="row justify-content-between">
                            <Buscador
                                list={this.state.buscador}
                                options={this.state.fuse_options}
                                toRender={(arg)=>this.handleListar(arg, false)}
                            />
                            <Selector
                                list={this.state.selector}
                                keyx='tipo'
                                auto={this.state.selector_auto}
                                toRender={(arg)=>this.handleListar(arg, true)}
                                tag='user'
                            >
                                <option value="*">Todos</option>
                                <option value="0">Admin</option>
                                <option value="1">Médico</option>
                                <option value="2">Auxiliar Pemel</option>
                                <option value="3">Admin Pemel</option>
                                <option value="4">Admin IPS</option>
                                <option value="5">Usuarios Admin</option>
                            </Selector>
                        </section>
                    </article>
                </article>
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
                    <Modal.Header>Usuario</Modal.Header>
                    <Modal.Body>
                        <form className="container" id="editarUsuario" onSubmit={this.handleGuardar}>
                            <div className="row">
                                <div className="col-12">
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="codigo">Nombre</label>
                                            <input type="text" className="form-control form-control-sm" name="nombre" defaultValue={this.state.nombre} onChange={this.handleChange } required/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="codigo">Correo</label>
                                            <input type="email" className="form-control form-control-sm" name="correo" defaultValue={this.state.correo} onChange={this.handleChange} required/>
                                        </div>

                                        {
                                            editpassword()
                                        }

                                        <div className="form-group">
                                            <label htmlFor="estado_causa">Tipo</label>
                                            <select className="form-control form-control-sm" name="tipo" defaultValue={this.state.tipo} onChange={this.handleChange } required>
                                            <option value=""></option>
                                                        <option value="0">Admin</option>
                                                        <option value="1">Médico</option>
                                                        <option value="2">Auxiliar Pemel</option>
                                                        <option value="3">Admin Pemel</option>
                                                        <option value="4">Admin IPS</option>
                                                        <option value="5">Usuarios Admin</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-info btn-sm" onClick={ this.handleEditPassword }>{textButton()}</button>
                        <button type="submit" form="editarUsuario" className="btn btn-primary btn-sm" >Guardar</button>
                        <button className="btn btn-primary btn-sm" onClick={ this.handleCerrarModal }>Cerrar</button>
                    </Modal.Footer>
                </Modal>
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
