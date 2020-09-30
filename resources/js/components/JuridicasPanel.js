import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableJuridicas from './TableJuridicas.js';

import axios from 'axios';



class JuridicasPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            juridicas: '',
            conductas: ['CASOS CERRAR', 'PSICOLOGÍA', 'SEGUIMIENTO', 'TRAMITE PENSIÓN NO FIRME',
                'TRAMITE PENSIÓN FIRME', 'IPP NO FIRME', 'IPP FIRME', 'CITAR CRH 150', 'CITAR NUEVO', 'PERDIDOS',
                'CRH 480', 'CRH NO FAV CPCLO', 'ICP > 540 SIN CPCLO', 'IT MEL'],
            estados: ['CERRADO', 'SEGUIMIENTO'],
            motivos: ['FALLECIDO', 'IPP', 'NUEVO', 'PENSIONADO', 'REINTEGRADO', 'RETIRADO', 'SEGUIMIENTO', 'TRAMITE DE PENSION'],
            identificacion: '',
            conducta: '',
            estado: '',
            motivo: '',
            desde: '',
            hasta: ''
        }
        // bind
        this.getJuridicas = this.getJuridicas.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.buscar = this.buscar.bind(this);
        this.crearRegistro = this.crearRegistro.bind(this);
        this.getJuridicas()
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    getJuridicas() {
        let url = 'getJuridicas'
        axios.get(url)
            .then(resp => {
                console.log(resp.data.data);
                this.setState({
                    juridicas: resp.data.data,
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
    componentDidMount() {

    }
    exportReport(){
        window.open('exportJuridicas','_blank');
    }
    buscar() {
        let url = 'buscarJuridicas'
        axios.post(url, { datos: this.state })
            .then(resp => {
                console.log(resp.data)
                this.setState({
                    juridicas: resp.data.data,
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
    crearRegistro(){
        window.open('verJuridica/1/1/c','_blank');
    }
    render() {
        return (
            <div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Búsqueda y filtros </div>
                            <div className="card-body texto">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="">Identificación del usuario</label>
                                        <input className="form-control" name="identificacion" value={this.state.identificacion} onChange={this.handleChange} />
                                    </div>
                                   {/* <div className="col-md-3">
                                        <label htmlFor="">Conducta</label>
                                        <select className="form-control" name="conducta" value={this.state.conducta} onChange={this.handleChange}>
                                            <option value=""></option>
                                            {this.state.conductas.map((c) =>
                                                <option value={c}>{c}</option>

                                            )}
                                        </select>
                                            </div>
                                    <div className="col-md-3">
                                        <label htmlFor="">Estado</label>
                                        <select className="form-control" name="estado" value={this.state.estado} onChange={this.handleChange}>
                                            <option value=""></option>
                                            {this.state.estados.map((e) =>
                                                <option value={e}>{e}</option>

                                            )}
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="">Motivo</label>
                                        <select className="form-control" name="motivo" value={this.state.motivo} onChange={this.handleChange}>
                                            <option value=""></option>
                                            {this.state.motivos.map((m) =>
                                                <option value={m}>{m}</option>

                                            )}
                                        </select>
                                    </div>*/}
                                    <div className="col-md-6">
                                        <br/>
                                        <button className="btn btn-success" onClick={this.buscar}>Buscar</button>&nbsp;
                                        <button className="btn btn-success" onClick={this.exportReport}>Exportar Datos</button>&nbsp;
                                        <button className="btn btn-success" onClick={this.crearRegistro}>Crear registro</button>
                                   
                                    </div>
                                </div>
                                {/*
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <label htmlFor="">Fecha de notificación (desde)</label>
                                        <input type="date" name="desde" className="form-control form-control-sm" onChange={this.handleChange}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Fecha de notificación (hasta)</label>
                                        <input type="date" name="hasta" className="form-control form-control-sm" onChange={this.handleChange}/>
                                    </div>
                                    <div className="col-md-4">
                                        <br/>
                                        <button className="btn btn-success" onClick={this.exportReport}>Exportar Datos</button>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <button className="btn btn-success" onClick={this.buscar}>Buscar</button>
                                            </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg2 titulo">Listado de Pacientes</div>
                            <div className="card-body texto"></div>




                        </div>
                        {this.state.juridicas != '' ? (
                            <TableJuridicas juridicas={this.state.juridicas} />
                        ) : (
                                <p>No hay datos</p>
                            )}
                    </div>
                </div>
            </div>
        );
    }

}

export default JuridicasPanel;
if (document.getElementById('juridicasContent')) {
    ReactDOM.render(<JuridicasPanel />, document.getElementById('juridicasContent'));
}