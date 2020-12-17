import React, { Component } from 'react';
import Select from 'react-select'

import axios from 'axios';
import { method } from 'lodash';

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
        axios.get(url, 
            {   usuario: this.state.usuariosFetch,
                modelo: this.state.modelos,
                desde: inicial,
                hasta: final
            }        
        ).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            console.log(url);
            // window.open(response.data, '_blank')
         })
        .catch(err => {
            this.props.showToast('¡Ups! Ha ocurrido un Error, por favor verifica los datos e intenta nuevamente','error');
        })
        
    }
 
    render() {
        return (
            <div>
                <br/>
                <article className="row mt-5">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Audits</div>
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
                                                <label htmlFor="modelo">Modelo</label>
                                                <Select 
                                                    isMulti  
                                                    options={options}
                                                    closeMenuOnSelect={false}
                                                    onChange={this.handleChangeModelo}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="desde">Desde</label>
                                                <input type="date" name="datepicker"></input>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="hasta">Hasta</label>
                                                <input type="date" name="datepicker"></input>
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