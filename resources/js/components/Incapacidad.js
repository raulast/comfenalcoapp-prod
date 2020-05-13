import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class IncapacidadFront extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoDocumento: '',
            numeroDocumento: '',
            nombreCompleto: '',
            tipoDocAfiliado:'',
            IDTrabajador:''
            
        };
        // bind
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTipo = this.handleTipo.bind(this);
        this.handleNumero = this.handleNumero.bind(this);
       
    }
    handleSubmit(e) {
        e.preventDefault();
        //console.log([this.state.tipoDocumento,this.state.numeroDocumento])
        axios
            .get('/validacionDerechos', {
                tipoDocumento: this.state.tipoDocumento,
                numeroDocumento: this.state.numeroDocumento
            })
            .then(response => {
                // console
                
                console.log(response.data.responseMessageOut.body.response.validadorResponse);
                let nombre = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[0]['Nombre'];
                let primerApellido = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[0]['PrimerApellido']; 
                let segundoApellido = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[0]['SegundoApellido'];
                let nombreCompleto = `${nombre} ${primerApellido} ${segundoApellido}`;

                let tipoDocAfiliado = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[0]['TipoDocAfiliado'];
                let IDTrabajador = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[1]['IDTrabajador'];
                // set state
                
                this.setState({
                    nombreCompleto: nombreCompleto,
                    tipoDocAfiliado : tipoDocAfiliado,
                    IDTrabajador : IDTrabajador
                });
            });
       
    }
    handleTipo(e) {
        this.setState({
            tipoDocumento: e.target.value
        });
    }
    handleNumero(e) {
        this.setState({
            numeroDocumento: e.target.value
        });
    }

    render() {
        return (
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">Incapacidades</div>
        
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <select className="form-control" id="tipoDocumento" onChange={this.handleTipo}>
                                            <option value=""></option>
                                            <option value="CC">CC</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4">
                                        <input type="text" id="numeroIdentificacion" className="form-control" onChange={this.handleNumero}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <input type="submit" className="btn btn-primary" value="Buscar"/>
                                    </div>
                                </div>  
                                
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">Datos del afiliado</div>
        
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <input type="text" id="tipoDocumento" className="form-control" value={this.state.tipoDocAfiliado}  readOnly />
                                    </div>
                                    <div className="col-sm-3">
                                        <input type="text" id="numeroIdentificacion" className="form-control" value={this.state.IDTrabajador}  readOnly  />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" id="nombreAfiliado" className="form-control" value={this.state.nombreCompleto}  readOnly/>
                                    </div>
                                </div>  
                                
                            </form> 
                        </div>
                    </div>
                </div>
            </div>


        </div>
        );
    }
}
export default IncapacidadFront;

if (document.getElementById('root')) {
    ReactDOM.render(<IncapacidadFront />, document.getElementById('root'));
}