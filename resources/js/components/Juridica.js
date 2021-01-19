import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableCronicos from './TableCronicos.js';
import { size } from 'lodash';
import axios from 'axios';
import { countBy } from 'lodash';



class Juridica extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            id: props.id,
            enable: props.enable,
            crud: props.crud,
            juridica: '',
            juridicac: '',
            fp: [],
            estados: ['CERRADO', 'SEGUIMIENTO'],
            motivos: ['FALLECIDO', 'IPP', 'NUEVO', 'PENSIONADO', 'REINTEGRADO', 'RETIRADO', 'SEGUIMIENTO', 'TRAMITE DE PENSION'],
        }
        // bind

        this.handleChange = this.handleChange.bind(this);
        this.getJuridica = this.getJuridica.bind(this);
        //this.calcularfp = this.calcularfp.bind(this);
        this.guardarJuridica = this.guardarJuridica.bind(this);
        this.getJuridica()
    }
    guardarJuridica() {
        var url = ""
        var data = "";
        if (this.state.crud == "u") {
            url = '/updateJuridica';
            data = this.state.juridica;
        }
        if (this.state.crud == "c") {
            url = '/createJuridica';
            data = this.state.juridicac;
        }
        axios.post(url, { datos: data })
            .then(resp => {
                console.log(resp.data)
                alert(resp.data)
            })
            .catch(err => {
                console.log(err)
            })



    }
    getJuridica() {
        let url = '/getJuridica/' + this.state.id
        axios.get(url)
            .then(resp => {
                console.log(resp.data.data);
                this.setState({
                    juridica: resp.data.data,
                    juridicac: resp.data.data
                });
                // this.calcularfp()
            
                let newJuridicac = Object.assign({}, this.state.juridicac);
                // console.log(Object.entries(newState));  
                 Object.keys(newJuridicac).forEach(key => {
                     newJuridicac[key] = "";
                 });
                 this.setState({
                     juridicac : newJuridicac
                });
               


            })
            .catch(err => {
                console.log(err)
            })

    }
    handleChange({ target }) {
        //console.log(target.id);
        //console.log(target.value);
        if (this.state.crud == "u") {
            var njuridica = this.state.juridica;
            njuridica[target.id] = target.value;
            this.setState({
                juridica: njuridica,
            });
        }
        
        if (this.state.crud == "c") {
            var njuridica = this.state.juridicac;
            njuridica[target.id] = target.value;
            this.setState({
                juridicac: njuridica,
            });
        }
    }
    calcularfp() {

        let f120 = new Date(this.state.cronico["fecha_it_inicio_ciclo"]);
        f120 = new Date(f120.setTime(f120.getTime() + 119 * 86400000)).getTime();
        f120 = new Date(f120).toISOString().slice(0, 10);
        console.log(f120);

        let f150 = new Date(this.state.cronico["fecha_it_inicio_ciclo"]);
        f150 = new Date(f150.setTime(f150.getTime() + 149 * 86400000)).getTime();
        f150 = new Date(f150).toISOString().slice(0, 10);
        console.log(f150);

        let f180 = new Date(this.state.cronico["fecha_it_inicio_ciclo"]);
        f180 = new Date(f180.setTime(f180.getTime() + 179 * 86400000)).getTime();
        f180 = new Date(f180).toISOString().slice(0, 10);
        console.log(f180);

        let f540 = new Date(this.state.cronico["fecha_it_inicio_ciclo"]);
        f540 = new Date(f540.setTime(f540.getTime() + 539 * 86400000)).getTime();
        f540 = new Date(f540).toISOString().slice(0, 10);
        console.log(f540);

        let fp = [f120, f150, f180, f540]
        this.setState({
            fp: fp
        });
    }

    render() {
        const { juridica } = this.state;
        const { juridicac } = this.state;
        const { crud } = this.state;
        // console.log(cronico);

        if (typeof this.state.juridica === 'object') {
            var cols = Object.keys(this.state.juridica)
            //console.log(cols);
        }
        return (
            <div>
                <div className="row mt-2">
                    <div className="col-md-12 texto">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#datos">DATOS</a>
                            </li>
                        </ul>


                        <div className="tab-content">
                            <div className="tab-pane container active" id="datos">
                                <div className="row mt-2">
                                    <div className="col-md-6 texto">
                                        {size(cols) > 0 ?
                                            <table className="table table-sm table-striped table-bordered texto mt-5">
                                                <tbody>
                                                    {cols.map((col, index) =>
                                                        (index >= 1 && index <= 114) ?
                                                            <tr>
                                                                <td>{cols[index]}</td>
                                                                {crud == "u" ?
                                                                    <td><input type="text" id={cols[index]} value={juridica[cols[index]] != '1900-01-01' ? juridica[cols[index]] : ''} size="50" onChange={this.handleChange} /></td>
                                                                    :
                                                                    <td><input type="text" id={cols[index]} value={juridicac[cols[index]]} size="50" onChange={this.handleChange} /></td>
                                                                }
                                                            </tr>
                                                            : ''
                                                    )}
                                                </tbody>
                                            </table>
                                            : <table></table>}
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
                { this.state.enable == "1" ?
                    <div className="row mt-4">
                        <div className="col-md-6 offset-md-3 texto">
                            <button className="btn btn-success btn-block" onClick={this.guardarJuridica}>GUARDAR CAMBIOS</button>
                        </div>
                    </div>
                    : ''
                }
            </div>
        );
    }

}

export default Juridica;

if (document.getElementById('juridicaContent')) {
    const juridica = document.getElementById('juridica').value;
    const enable = document.getElementById('enable').value;
    const crud = document.getElementById('crud').value;
    ReactDOM.render(<Juridica id={juridica} enable={enable} crud={crud} />, document.getElementById('juridicaContent'));
}