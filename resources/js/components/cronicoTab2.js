import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableCronicos from './TableCronicos.js';
import { size } from 'lodash';
import axios from 'axios';
import { countBy } from 'lodash';



class CronicoTab2 extends Component {
    constructor(props) {
        super(props);
       // console.log(props)
        this.state = {
            id: props.id,
            enable:props.enable,
            cronico:'',
            fp:[],
            estados: ['CERRADO', 'SEGUIMIENTO'],
            motivos: ['FALLECIDO', 'IPP', 'NUEVO', 'PENSIONADO', 'REINTEGRADO', 'RETIRADO', 'SEGUIMIENTO', 'TRAMITE DE PENSION'],
        }
        // bind
        
        this.handleChange = this.handleChange.bind(this);
        this.getCronico = this.getCronico.bind(this);
        this.calcularfp = this.calcularfp.bind(this);
        this.guardarCronico = this.guardarCronico.bind(this);
        this.getCronico()
    }
    guardarCronico(){
        let url = '/updateCronico'
        axios.post(url, { datos: this.state.cronico })
            .then(resp => {
                console.log(resp.data)
                alert(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    getCronico() {
        let url = '/getCronico/'+this.state.id
        axios.get(url)
            .then(resp => {
                console.log(resp.data.data);
                this.setState({
                    cronico: resp.data.data,
                });
                this.calcularfp()
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleChange({ target }) {
       var ncronico = this.state.cronico;      
       ncronico[target.id]=target.value;    
       this.setState({
        cronico: ncronico,
    });
    }
    calcularfp(){
        
        let f120 = new Date(this.state.cronico["fecha_it_inicio_ciclo"]);
        f120 = new Date(f120.setTime( f120.getTime() + 119 * 86400000 )).getTime();
        f120=new Date(f120).toISOString().slice(0,10);
        console.log(f120);

        let f150 = new Date(this.state.cronico["fecha_it_inicio_ciclo"]);
        f150 = new Date(f150.setTime( f150.getTime() + 149 * 86400000 )).getTime();
        f150=new Date(f150).toISOString().slice(0,10);
        console.log(f150);

        let f180 = new Date(this.state.cronico["fecha_it_inicio_ciclo"]);
        f180 = new Date(f180.setTime( f180.getTime() + 179 * 86400000 )).getTime();
        f180=new Date(f180).toISOString().slice(0,10);
        console.log(f180);

        let f540 = new Date(this.state.cronico["fecha_it_inicio_ciclo"]);
        f540 = new Date(f540.setTime( f540.getTime() + 539 * 86400000 )).getTime();
        f540=new Date(f540).toISOString().slice(0,10);
        console.log(f540);
        
        let fp = [f120,f150,f180,f540]
        this.setState({
           fp : fp
        });
    }

    render() {
        const { cronico } = this.state;
       // console.log(cronico);
        
        if (typeof this.state.cronico === 'object'){
            var cols=Object.keys(this.state.cronico)
            //console.log(cols);
        }
        return (
            <div>
                <div className="row mt-2">
                    <div className="col-md-12 texto">
                        <ul className="nav nav-tabs">                            
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#ii">INFORMACIÓN INCAPACIDADES (SISPOS)</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#fp">FECHAS PROYECTADAS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#scrh">GESTION CRHs (SIR)</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" href="#cplo1">1 INSTANCIA DE CPCLO </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" href="#cplo2">2 INSTANCIA DE CPCLO </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" href="#cplo3">3 INSTANCIA DE CPCLO </a>
                            </li>
                        </ul>

            
                        <div className="tab-content">
                            <div className="tab-pane container active" id="ii">
                                <div className="col-md-8 texto">
                                        {size(cols) > 0 ?
                                            <table className="table table-sm table-striped table-bordered texto mt-5">
                                                <tbody>
                                                    {cols.map((col, index) =>
                                                        (index >= 51 && index <= 58) ?
                                                            <tr>
                                                                <td>{cols[index]}</td>
                                                                <td><input type="text" id={cols[index]} value={cronico[cols[index]] != '1900-01-01' ? cronico[cols[index]] : ''} size="50" onChange={this.handleChange}/></td>
                                                            </tr>
                                                            : ''
                                                    )}
                                                </tbody>
                                            </table>
                                            : <table></table>}
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="fp">
                            <div className="row mt-2">
                                <div className="col-md-6 texto">
                                {size(cols) > 0 ?
                                            <table className="table table-sm table-striped table-bordered texto mt-5">
                                                <tbody>
                                                    {cols.map((col, index) =>
                                                        (index >= 59 && index <= 62) ?
                                                            <tr>
                                                                <td>{cols[index]}</td>
                                                                <td><input type="text" id={cols[index]} value={cronico[cols[index]] != '1900-01-01' ? cronico[cols[index]] : ''} size="50" onChange={this.handleChange}/></td>
                                                            </tr>
                                                            : ''
                                                    )}
                                                </tbody>
                                            </table>
                                            : <table></table>}
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="scrh">
                                <div className="col-md-8 texto">
                                    {size(cols) > 0 ?
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                {cols.map((col, index) =>
                                                    (index >= 63 && index <= 82) ?
                                                        <tr>
                                                            <td>{cols[index]}</td>
                                                            { (cols[index] == "crh1") || (cols[index] == "crh2_favorable") || (cols[index] == "crh3__favorable")?
                                                                    <td><select id={cols[index]} onChange={this.handleChange}>
                                                                        <option value={cronico[cols[index]]}>{cronico[cols[index]]}</option>
                                                                        <option value=""></option>
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                       
                                                                    </select></td> :
                                                            <td><input type="text" id={cols[index]} value={cronico[cols[index]] != '1900-01-01' ? cronico[cols[index]] : ''} size="50" onChange={this.handleChange}/></td>
                                                            }
                                                        </tr>
                                                        : ''
                                                )}
                                            </tbody>
                                        </table>
                                        : <table></table>}
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="cplo1">
                                <div className="col-md-8 texto">
                                    {size(cols) > 0 ?
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                {cols.map((col, index) =>
                                                    (index >= 83 && index <= 90) ?
                                                        <tr>
                                                            <td>{cols[index]}</td>
                                                            {
                                                            cols[index].includes("entidad_califica") ?
                                                            <td><select id={cols[index]} onChange={this.handleChange}>
                                                                <option value={cronico[cols[index]]}>{cronico[cols[index]]}</option>
                                                                <option value="AFP">AFP</option>
                                                                <option value="ARL">ARL</option>
                                                                <option value="EPS">EPS</option>
                                                            </select></td> :
                                                            
                                                            cols[index].includes("quien_manifiesta") ?
                                                            <td><select id={cols[index]} onChange={this.handleChange}>
                                                                <option value={cronico[cols[index]]}>{cronico[cols[index]]}</option>
                                                                <option value="AFP">AFP</option>
                                                                <option value="ARL">ARL</option>
                                                                <option value="EPS">EPS</option>
                                                                <option value="USUARIO">USUARIO</option>
                                                                <option value="EMPRESA">EMPRESA</option>
                                                            </select></td> :


                                                            cols[index].includes("contingencia") ?
                                                                 <td><select id={cols[index]} onChange={this.handleChange}>
                                                                     <option value={cronico[cols[index]]}>{cronico[cols[index]]}</option>
                                                                     <option value="EG">EG</option>
                                                                     <option value="AT">AT</option>
                                                                     <option value="EL">EL</option>
                                                                 </select></td> :
                                                                <td><input type="text" id={cols[index]} value={cronico[cols[index]] != '1900-01-01' ? cronico[cols[index]] : ''} size="50" onChange={this.handleChange}/></td>
                                                            }
                                                            
                                                        </tr>
                                                        : ''
                                                )}
                                            </tbody>
                                        </table>
                                        : <table></table>}
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="cplo2">
                                <div className="col-md-8 texto">
                                    {size(cols) > 0 ?
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                {cols.map((col, index) =>
                                                    (index >= 91 && index <= 97) ?
                                                        <tr>
                                                            <td>{cols[index]}</td>
                                                            {
                                                            cols[index].includes("entidad_califica") ?
                                                            <td><select id={cols[index]} onChange={this.handleChange}>
                                                                <option value={cronico[cols[index]]}>{cronico[cols[index]]}</option>
                                                                <option value="AFP">AFP</option>
                                                                <option value="ARL">ARL</option>
                                                                <option value="EPS">EPS</option>
                                                            </select></td> :
                                                            
                                                            cols[index].includes("quien_manifiesta") ?
                                                            <td><select id={cols[index]} onChange={this.handleChange}>
                                                                <option value={cronico[cols[index]]}>{cronico[cols[index]]}</option>
                                                                <option value="AFP">AFP</option>
                                                                <option value="ARL">ARL</option>
                                                                <option value="EPS">EPS</option>
                                                                <option value="USUARIO">USUARIO</option>
                                                                <option value="EMPRESA">EMPRESA</option>
                                                            </select></td> :


                                                            cols[index].includes("contingencia") ?
                                                                 <td><select id={cols[index]} onChange={this.handleChange}>
                                                                     <option value={cronico[cols[index]]}>{cronico[cols[index]]}</option>
                                                                     <option value="EG">EG</option>
                                                                     <option value="AT">AT</option>
                                                                     <option value="EL">EL</option>
                                                                 </select></td> :
                                                                <td><input type="text" id={cols[index]} value={cronico[cols[index]] != '1900-01-01' ? cronico[cols[index]] : ''} size="50" /></td>
                                                            }
                                                            
                                                        </tr>
                                                        : ''
                                                )}
                                            </tbody>
                                        </table>
                                        : <table></table>}
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="cplo3">
                                <div className="col-md-8 texto">
                                    {size(cols) > 0 ?
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                {cols.map((col, index) =>
                                                    (index >= 98 && index <= 101) ?
                                                        <tr>
                                                            <td>{cols[index]}</td>
                                                            {
                                                            cols[index].includes("contingencia") ?
                                                                 <td><select id={cols[index]} onChange={this.handleChange}>
                                                                     <option value={cronico[cols[index]]}>{cronico[cols[index]]}</option>
                                                                     <option value="EG">EG</option>
                                                                     <option value="AT">AT</option>
                                                                     <option value="EL">EL</option>
                                                                 </select></td> :
                                                                <td><input type="text" id={cols[index]} value={cronico[cols[index]] != '1900-01-01' ? cronico[cols[index]] : ''} size="50" onChange={this.handleChange}/></td>
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
                { this.state.enable == "1" ?
                <div className="row mt-4">
                    <div className="col-md-6 offset-md-3 texto">
                        <button className="btn btn-success btn-block" onClick={this.guardarCronico}>GUARDAR CAMBIOS</button>
                    </div>                                            
                </div>
                : ''
                }
            </div>
        );
    }

}

export default CronicoTab2;

