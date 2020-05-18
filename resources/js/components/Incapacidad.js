import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Mensaje from './Mensaje';
import Comboips from './Comboips.js';
import axios from 'axios';


class IncapacidadFront extends Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; 
        const yyyy = today.getFullYear();
        if(dd<10) {
            dd=`0${dd}`;
        } 
        if(mm<10) {
            mm=`0${mm}`;
        } 
        today = `${yyyy}-${mm}-${dd}`;
        this.state = {
            tipoDocumento: '',
            numeroIdentificacion: '',
            nombreCompleto: '',
            tipoDocAfiliado:'',
            IDTrabajador:'',
            historiaClinica:'',
            genero: '',
            estado: '',
            tipoCotizante : '',
            mensaje : '',
            tipo : 'success',
            loading : false,
            fechaAtencion : today,
            
        };
        // bind
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTipo = this.handleTipo.bind(this);
        this.handleNumero = this.handleNumero.bind(this);
        this.handleIpsChange = this.handleIpsChange.bind(this);
        this.showMessage = this.showMessage(this)
       
    }
    handleSubmit(e) {
        e.preventDefault();
        //console.log([this.state.tipoDocumento,this.state.numeroDocumento])
        let tipoDocumento=this.state.tipoDocumento;
        let numeroIdentificacion= this.state.numeroIdentificacion;
        let url = '/validacionDerechos/'+tipoDocumento+"/"+numeroIdentificacion;
        axios
            .get(url, {
                tipoDocumento: this.state.tipoDocumento,
                numeroIdentificacion: this.state.numeroIdentificacion
            })
            .then(response => {
                // console
                console.log(response);
                
                let mensaje = response.data.responseMessageOut.body.response.validadorResponse.Derechos['MENSAJE'];
                let derecho = response.data.responseMessageOut.body.response.validadorResponse.Derechos['DerechoPrestacion']
                
                if (derecho =="SI"){
                
                //console.log(response.data.responseMessageOut.body.response.validadorResponse);
                let nombre = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[0]['Nombre'];
                let primerApellido = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[0]['PrimerApellido']; 
                let segundoApellido = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[0]['SegundoApellido'];
                let nombreCompleto = `${nombre} ${primerApellido} ${segundoApellido}`;

                let tipoDocAfiliado = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[0]['TipoDocAfiliado'];
                let IDTrabajador = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[1]['IDTrabajador'];
                
                let historiaClinica = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[1]['IdHistoria12'];
                let genero = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[1]['Sexo'];
                let estado = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[1]['EstadoDescripcion'];
                let tipoCotizante = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[1]['ClaseAfiliacion'];
                // set state
               
                this.setState({
                    nombreCompleto: nombreCompleto,
                    tipoDocAfiliado : tipoDocAfiliado,
                    IDTrabajador : IDTrabajador,
                    historiaClinica : historiaClinica,
                    mensaje : mensaje,
                    genero : genero,
                    estado : estado,
                    tipoCotizante: tipoCotizante,
                    loading:true
                });

                }
            });
           
       
    }
    handleTipo(e) {
        this.setState({
            tipoDocumento: e.target.value
        });
    }
    handleNumero(e) {
        this.setState({
            numeroIdentificacion: e.target.value
        });
    }
    handleIpsChange(e){
        console.log(e.target.value)
    }
    showMessage(m){
        return (<div className="alert alert-success" role="alert">{ m }</div>);
    }
    render() {
        let mensaje=<div></div>;
        if (this.state.loading ){ 
            if (this.state.tipo == 'success'){
             mensaje = (<div className="alert alert-success" role="alert">
                 { this.state.mensaje }
                 </div>);
            }
        }
              
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
            
               
            { mensaje }
                                
        
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">Datos del afiliado</div>
        
                        <div className="card-body">
                                <div className="row">
            
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="tipoDocumento">Tipo Documento</label>
                                            <input type="text" id="tipoDocumento" className="form-control" value={this.state.tipoDocAfiliado}  readOnly />
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="numeroIdentificacion">Número de identificacion</label>
                                            <input type="text" id="numeroIdentificacion" className="form-control" value={this.state.IDTrabajador}  readOnly  />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="nombreAfiliado">Nombre Completo</label>
                                            <input type="text" id="nombreAfiliado" className="form-control" value={this.state.nombreCompleto}  readOnly/>
                                        </div>
                                    </div>
                                </div>  
                                <div className="row">
            
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="historiaClinica">Numero de historia clínica</label>
                                            <input type="text" id="historiaClinica" className="form-control" value={this.state.historiaClinica}  readOnly />
                                        </div>
                                    </div>

                                    <div className="col-sm-1">
                                        <div className="form-group">
                                            <label htmlFor="genero">Género</label>
                                            <input type="text" id="numeroIdentificacion" className="form-control" value={this.state.genero}  readOnly  />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="estado">Estado</label>
                                            <input type="text" id="estado" className="form-control" value={this.state.estado}  readOnly/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="tipoCotizante">Tipo de Cotizante</label>
                                            <input type="text" id="tipoCotizante" className="form-control" value={this.state.tipoCotizante}  readOnly/>
                                        </div>
                                    </div>
                                </div>  
                        </div>
                    </div>
                </div>
            </div>
            <br/>
              
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">Datos de la IPS / Médico</div>
        
                        <div className="card-body">
                                <div className="row">
            
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="tipoPrestador">Tipo de prestador</label>
                                            <select id="tipoPrestador" className="form-control">
                                                <option value=""></option>
                                                <option value="IPS">IPS</option>
                                                <option value="Consultorio">Consultorio</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="tipoPrestador">IPS</label>
                                            <Comboips handleIpsChange={this.handleIpsChange}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="nitIPS">Nit IPS</label>
                                            <input type="text" id="nitIPS" className="form-control" value="" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="codigoHabilitacion">Código Habilitación IPS</label>
                                            <input type="text" id="codigoHabilitacion" className="form-control" value="" />
                                        </div>
                                    </div>
                                </div>  
                                <div className="row">
            
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="tipoDocumentoMedico">Tipo Documento</label>
                                            <input type="text" id="tipoDocumentoMedico" className="form-control" value="" />
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="numeroIdentificacionMedico">Número de identificacion</label>
                                            <input type="text" id="numeroIdentificacionMedico" className="form-control" value=""/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="nombreMedico">Nombre Completo</label>
                                            <input type="text" id="nombreMedico" className="form-control" value=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
            
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="noRegistroMedico">Número de registro médico</label>
                                            <input type="text" id="noRegistroMedico" className="form-control" value=""  />
                                        </div>
                                    </div>

                                   
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="especialidadMedica">Especialidad Médica</label>
                                            <input type="text" id="especialidadMedica" className="form-control" value=""/>
                                        </div>
                                    </div>
                                    
                                </div>  
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">Información de la incapacidad</div>
        
                        <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <button className="btn btn-primary" >Histórico Incapacidades</button>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="numeroIncapacidad">Número de incapacidad</label>
                                            <input type="text" id="numeroIncapacidad" className="form-control" value=""  readOnly  />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="nombreAfiliado">Fecha de atención</label>
                                         
                                            <input type="date" id="fechaAtencion" className="form-control"  value={this.state.fechaAtencion}/>
                                        </div>
                                    </div>
                                </div>  
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="causaExterna">Causa Externa</label>
                                            <select id="causaExterna" className="form-control">
                                                <option value=""></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="form-group">
                                            
                                            <label htmlFor="descripcionDiagnostico">Descripción diagnóstico</label>
                                            <input type="text" id="descripcionDiagnostico" className="form-control"  />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="codigoDiagnostico">Código de diagnóstico</label>
                                            <input type="text" id="codigoDiagnostico" className="form-control"  />
                                        </div>
                                    </div>
                                </div>  
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="lateralidad">Lateralidad</label>
                                            <select id="lateralidad" className="form-control">
                                                <option value=""></option>
                                                <option value="Derecha">Derecha</option>
                                                <option value="Izquierda">Izquierda</option>
                                                <option value="Bilateral">Bilateral</option>
                                                <option value="No aplica">No aplica</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="fechaInicioIncapacidad">Fecha inicio Incapacidad</label>
                                            <input type="date" id="fechaInicioIncapacidad" className="form-control"  />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="diasSolicitados">Dias Solicitados</label>
                                            <input type="number" id="diasSolicitados" className="form-control"  />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="fechaFinIncapacidad">Fecha fin incapacidad</label>
                                            <input type="date" id="fechaFinIncapacidad" className="form-control"  />
                                        </div>
                                    </div>
                                </div>  
                                <div className="row">
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="prorroga">Prórroga</label>
                                            <select id="prorroga" className="form-control">
                                                <option value=""></option>
                                                <option value="Si">Si</option>
                                                <option value="No">No</option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="diasAcumuladosPrevios">Dias Acumulados Previos</label>
                                            <input type="number" id="diasAcumuladosPrevios" className="form-control"  />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="contingenciaOrigen">Contingencia Origen</label>
                                            <select id="contingenciaOrigen" className="form-control">
                                                <option value=""></option>
                
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="diasAcumuladosUltimaIncpacidad">Días acumulados última incapacidad</label>
                                            <input type="number" id="diasAcumuladosUltimaIncapacidad" className="form-control"  />
                                        </div>
                                    </div>
                                </div>  
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="observacionMedica">Resumen observacion médico</label>
                                            <textarea rows="10" className="form-control" id="observacionMedica">

                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>

            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">Datos del aportante</div>
        
                        <div className="card-body">
                                <div className="row">
            
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="tipoIdentificacionAportante">Tipo Identificación</label>
                                            <input type="text" id="tipoIdentificacionAportante" className="form-control"   readOnly />
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="numeroIdentificacionAportante">Número de identificacion</label>
                                            <input type="text" id="numeroIdentificacionAportante" className="form-control" value={this.state.IDTrabajador}  readOnly  />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="tipoAportante">Tipo aportante</label>
                                            <input type="text" id="tipoAportante" className="form-control" value={this.state.IDTrabajador}  readOnly  />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="nombreAportante">Nombre aportante</label>
                                            <input type="text" id="nombreAportante" className="form-control" value={this.state.nombreCompleto}  readOnly/>
                                        </div>
                                    </div>
                                </div>  
                                  
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