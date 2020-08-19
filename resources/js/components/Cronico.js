import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TableCronicos from './TableCronicos.js';
import { size } from 'lodash';
import axios from 'axios';
import { countBy } from 'lodash';



class Cronico extends Component {
    constructor(props) {
        super(props);
       // console.log(props)
        this.state = {
            id: props.id,
            cronico:'',
            fp:[],
            estados: ['CERRADO', 'SEGUIMIENTO'],
            motivos: ['FALLECIDO', 'IPP', 'NUEVO', 'PENSIONADO', 'REINTEGRADO', 'RETIRADO', 'SEGUIMIENTO', 'TRAMITE DE PENSION'],
        }
        // bind
        
        this.handleChange = this.handleChange.bind(this);
        this.getCronico = this.getCronico.bind(this);
        this.calcularfp = this.calcularfp.bind(this);
        this.getCronico()
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
        this.setState({
            [target.name]: target.value
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
        console.log(cronico);
        
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
                                <a className="nav-link active" data-toggle="tab" href="#ns">Notificación SIR</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#esu">Empresa sede usuario</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#ic">Información caso</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" href="#ii">Información incapacidad</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#fp">Fechas proyectadas</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#scrh">Seguimiento CRH</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" href="#scplo">Seguimiento CPLO</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#idd">Información demanda dictámen</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#cplocierre">CPLO al cierre</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" href="#abuso">Abuso del derecho</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#cr">Cierre reintegro</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#observ">Observaciones</a>
                            </li>
                        </ul>

            
                        <div className="tab-content">
                            <div className="tab-pane container active" id="ns">
                                <div className="row mt-2">
                                    <div className="col-md-6 texto">
                                        { size(cols) > 0 ?
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                            <tr>
                                                    <td>{cols[2]}</td>
                                                    <td><input type="text" id={cols[2]} value={cronico[cols[2]]}/></td>
                                                </tr>
                                                <tr>
                                                    <td>{cols[3]}</td>
                                                    <td><input type="text" id={cols[3]} value={cronico[cols[3]]}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        : <table></table>}
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="esu">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        {size(cols) > 0 ?
                                            <table className="table table-sm table-striped table-bordered texto mt-5">
                                                <tbody>
                                                    {cols.map((col, index) =>
                                                        (index > 3 && index < 29) ?
                                                            <tr>
                                                                <td>{cols[index]}</td>
                                                                <td>{cronico[cols[index]] != '1900-01-01' ? cronico[cols[index]] : ''}</td>
                                                                {/*<td><input type="text" id={cols[index]} value={cronico[cols[index]] != '1900-01-01' ? cronico[cols[index]] : ''} size="50"/></td>*/}
                                                            </tr>
                                                            : ''
                                                    )}
                                                </tbody>
                                            </table>
                                            : <table></table>}
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="ic">
                                <div className="row mt-2">
                                    <div className="col-md-8 texto">
                                        {size(cols) > 0 ?
                                            <table className="table table-sm table-striped table-bordered texto mt-5">
                                                <tbody>
                                                    {cols.map((col, index) =>
                                                        (index > 28 && index < 36) ?
                                                            <tr>
                                                                <td>{cols[index]}</td>
                                                                { cols[index] == "estado_seguimiento" ?
                                                                    <td><select id={cols[index]}>
                                                                        <option value={cronico[cols[index]]}>{cronico[cols[index]]}</option>
                                                                        {this.state.estados.map((e) =>
                                                                            <option value={e}>{e}</option>

                                                                        )}
                                                                       
                                                                    </select></td> :
                                                                
                                                                cols[index] == "motivo_estado_seguimiento" ?
                                                                    <td><select id={cols[index]}>
                                                                        <option value={cronico[cols[index]]}>{cronico[cols[index]]}</option>
                                                                        {this.state.motivos.map((e) =>
                                                                            <option value={e}>{e}</option>

                                                                        )}
                                                                    </select></td> :
                        
                                                                 cols[index] == "motivo_estado_seguimiento" ?
                                                                    <td><select id={cols[index]}>
                                                                        <option value={cronico[cols[index]]}>{cronico[cols[index]]}</option>
                                                                        {this.state.motivos.map((e) =>
                                                                            <option value={e}>{e}</option>

                                                                        )}
                                                                    </select></td> :
                                                                 cols[index] == "contingencia_origen_inicial" ?
                                                                 <td><select id={cols[index]}>
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
                            </div>
                            <div className="tab-pane container fade" id="ii">
                                <div className="col-md-8 texto">
                                        {size(cols) > 0 ?
                                            <table className="table table-sm table-striped table-bordered texto mt-5">
                                                <tbody>
                                                    {cols.map((col, index) =>
                                                        (index > 35 && index < 40) ?
                                                            <tr>
                                                                <td>{cols[index]}</td>
                                                                <td><input type="text" id={cols[index]} value={cronico[cols[index]] != '1900-01-01' ? cronico[cols[index]] : ''} size="50" /></td>
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
                                        { size(cols) > 0 ?
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                            <tr>
                                                <td>Fecha día 120</td>
                                                <td>{ this.state.fp[0]}</td>
                                            </tr>
                                            <tr>
                                                <td>Fecha día 150</td>
                                                <td>{ this.state.fp[1]}</td>
                                            </tr>
                                            <tr>
                                                <td>Fecha día 180</td>
                                                <td>{ this.state.fp[2]}</td>
                                            </tr>
                                            <tr>
                                                <td>Fecha día 540</td>
                                                <td>{ this.state.fp[3]}</td>
                                            </tr>
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
                                                    (index > 39 && index < 56) ?
                                                        <tr>
                                                            <td>{cols[index]}</td>
                                                            { (cols[index] == "crh1") || (cols[index] == "crh2_favorable") || (cols[index] == "crh3__favorable")?
                                                                    <td><select id={cols[index]}>
                                                                        <option value={cronico[cols[index]]}>{cronico[cols[index]]}</option>
                                                                        <option value=""></option>
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                       
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
                            <div className="tab-pane container fade" id="scplo">
                                <div className="col-md-8 texto">
                                    {size(cols) > 0 ?
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                {cols.map((col, index) =>
                                                    (index > 55 && index < 75) ?
                                                        <tr>
                                                            <td>{cols[index]}</td>
                                                            {cols[index].includes("contingencia") ?
                                                                 <td><select id={cols[index]}>
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
                            <div className="tab-pane container fade" id="idd">
                                <div className="col-md-8 texto">
                                    {size(cols) > 0 ?
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                {cols.map((col, index) =>
                                                    (index >= 75  && index <= 78) ?
                                                        <tr>
                                                            <td>{cols[index]}</td>
                                                            {cols[index].includes("contingencia") ?
                                                                 <td><select id={cols[index]}>
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
                            <div className="tab-pane container fade" id="cplocierre">
                                <div className="col-md-8 texto">
                                    {size(cols) > 0 ?
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                {cols.map((col, index) =>
                                                    (index >= 79  && index <= 85) ?
                                                        <tr>
                                                            <td>{cols[index]}</td>
                                                            {cols[index].includes("contingencia") ?
                                                                 <td><select id={cols[index]}>
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
                            <div className="tab-pane container fade" id="abuso">
                                <div className="col-md-8 texto">
                                    {size(cols) > 0 ?
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                {cols.map((col, index) =>
                                                    (index >= 86  && index <= 91) ?
                                                        <tr>
                                                            <td>{cols[index]}</td>
                                                            <td><input type="text" id={cols[index]} value={cronico[cols[index]] != '1900-01-01' ? cronico[cols[index]] : ''} /></td>
                                                        </tr>
                                                        : ''
                                                )}
                                            </tbody>
                                        </table>
                                        : <table></table>}
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="cr">
                                <div className="col-md-8 texto">
                                    {size(cols) > 0 ?
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                {cols.map((col, index) =>
                                                    (index >= 92  && index <= 97) ?
                                                        <tr>
                                                            <td>{cols[index]}</td>
                                                            <td><input type="text" id={cols[index]} value={cronico[cols[index]] != '1900-01-01' ? cronico[cols[index]] : ''} size="50" /></td>
                                                        </tr>
                                                        : ''
                                                )}
                                            </tbody>
                                        </table>
                                        : <table></table>}
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="observ">
                                <div className="col-md-8 texto">
                                    {size(cols) > 0 ?
                                        <table className="table table-sm table-striped table-bordered texto mt-5">
                                            <tbody>
                                                {cols.map((col, index) =>
                                                    (index >= 98  && index <= 100) ?
                                                        <tr>
                                                            <td>{cols[index]}</td>
                                                            <td><input type="text" id={cols[index]} value={cronico[cols[index]] != '1900-01-01' ? cronico[cols[index]] : ''} size="50" /></td>
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
        );
    }

}

export default Cronico;

if (document.getElementById('cronicoContent')) {
   const cronico =document.getElementById('cronico').value;
    ReactDOM.render(<Cronico id={cronico}/>, document.getElementById('cronicoContent'));
}