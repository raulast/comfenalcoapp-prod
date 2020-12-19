import React, { Component } from 'react';
import Select from 'react-select'
import moment from 'moment';

import axios from 'axios';

// import './AudtisForm.scss';

const options = [
    { value: '0', label: 'Causa Externa' },
    { value: '1', label: 'Clases Afiliacion' },
    { value: '2', label: 'Descripciones Programa' },
    { value: '3', label: 'Dias Maximos' },
    { value: '4', label: 'Estados Afiliacion' },
    { value: '5', label: 'Estados Generacion' },
    { value: '6', label: 'Ips' },
    { value: '7', label: 'Medico' },
    { value: '8', label: 'Usuarios' },
    { value: '9', label: 'Cie10' },
    { value: '*', label: 'Todos' },
];

class AuditsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuarios: [],
            modelos: [],
            usuariosFetch: []
        }

        // bind

        this.getSystemUsers = this.getSystemUsers.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUser=this.handleChangeUser.bind(this);
        this.handleChangeModelo=this.handleChangeModelo.bind(this);
        this.handleGuardar = this.handleGuardar.bind(this);
    }

    componentDidMount() {
        this.getSystemUsers();
    }

    getSystemUsers() {
        let url = 'usuario/user'
        axios.get(url)
            .then(resp => {
                const users = resp.data.data.filter( (obj) => { return (obj.tipo === '0' )});
                const arr = [];
                users.map(key => {
                    arr.push({
                        value: key.id,
                        label: key.name
                    })
                })
                this.setState({
                    usuarios: arr
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChangeUser(e) {
        const arr = [];
        e.map(key => {
            arr.push(key.value);
        })
        this.setState({usuariosFetch: arr});
    }

    handleChangeModelo(e) {
        const arr = [];
        e.map(key => {
            arr.push(key.value);
        })
        this.setState({modelos: arr});
    }

    handleGuardar(e) {
        e.preventDefault();
    }

    handleSubmit(e){
        e.preventDefault();
        const Dates =  document.getElementsByName('datepicker');
        const inicial = Dates[0].value + ' 00:00:00';
        const final = Dates[1].value + ' 23:59:59';
        let url = 'exportAudits';
        const datos = {
            usuario: encodeURI(`[${this.state.usuariosFetch.join(',')}]`),
            modelo: encodeURI(`[${this.state.modelos.join(',')}]`)
        }
        url = `${url}?usuario=${datos.usuario}&modelo=${datos.modelo}&desde=${encodeURI(inicial)}&hasta=${encodeURI(final)}`;
        window.open(url, '_blank');
    }
 
    render() {
        return (
            <div>
                <br/>
                <article className="row mt-5">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Auditoría</div>
                            <div className="card-body texto">
                                <form onSubmit={this.handleSubmit} target="_blank">
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="usuario">Usuario</label>
                                                {this.state.usuarios.length > 0 ?
                                                    <Select 
                                                    isMulti  
                                                    options={this.state.usuarios}
                                                    closeMenuOnSelect={false}
                                                    onChange={this.handleChangeUser}
                                                    />
                                                    : false
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="modelo">Elemento</label>
                                                <Select 
                                                    isMulti  
                                                    options={options}
                                                    closeMenuOnSelect={false}
                                                    onChange={this.handleChangeModelo}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div class="form-group col">
                                                <label class="col-md-6 col-form-label px-0">Desde</label>
                                                <div class="col-12 px-0">
                                                    <input id="desde" class="form-control" type="date" value={moment().format('YYYY-MM-DD')} name="datepicker"/>
                                                </div>
                                            </div>
                                            <div class="form-group col">
                                                <label class="col-md-6 col-form-label px-0">Hasta</label>
                                                <div class="col-12 px-0">
                                                    <input id="hasta" class="form-control" type="date" value={moment().format('YYYY-MM-DD')} name="datepicker"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <br /><br />
                                                <button type="submit" className="btn btn-success btn-sm">Consultar</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br/>
                    </div>
                </article>
            </div>
        );
    }

}

export default AuditsForm;
/*
if (document.getElementById('menuUsuarios')) {
    ReactDOM.render(<MenuUsuarios />, document.getElementById('menuUsuarios'));
}
*/