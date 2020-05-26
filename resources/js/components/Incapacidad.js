import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Mensaje from './Mensaje';
import Comboips from './Comboips.js';
import Combocausae from './Combocausae.js';
import Medico from './Medico.js';
import AutocompleteDescripcion from './AutocompleteDescripcion.js';
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
            fechaInicioIncapacidad : today,
            diasSolicitados : 0,
            fechaFinIncapacidad : today,
            diasReconocidos : 0,
            causae : '0',
            contingencia : '0',
            tipoDocAportante:'',
            numDocAportante: '',
            nombreAportante:'',
            observacion:'',
            diagnostico: '',
            codigoDiagnostico: '',
            id : '00001',
            prorrogaId : 0,
            tipoPrestador: '',
            ips_id: 0
            
        };
        // bind
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTipo = this.handleTipo.bind(this);
        this.handleNumero = this.handleNumero.bind(this);
        this.handleFechaInicioIncapacidad = this.handleFechaInicioIncapacidad.bind(this);
        this.handleFechaFin = this.handleFechaFin.bind(this);
        this.handleDiasSolicitados = this.handleDiasSolicitados.bind(this);
        this.getBusinessDatesCount = this.getBusinessDatesCount.bind(this);
        this.handleCausa = this.handleCausa.bind(this);
        this.handleContingencia = this.handleContingencia.bind(this);
        this.guardarIncapacidad = this.guardarIncapacidad.bind(this);
        this.handleObservacion = this.handleObservacion.bind(this);
        this.handleDiagnostico = this.handleDiagnostico.bind(this);
        this.handleCodigoDiagnostico = this.handleCodigoDiagnostico.bind(this);
        this.handlePrestador = this.handlePrestador.bind(this);
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
                
                //datos aportante
                let tipoDocAportante = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[1]['TipoDocEmpresa'];
                let numDocAportante = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[1]['IDEmpresa'];
                let nombreAportante = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado[1]['NombreEmpresa'];
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
                    tipoDocAportante: tipoDocAportante,
                    numDocAportante: numDocAportante,
                    nombreAportante:nombreAportante,
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
    handleDiagnostico(dato){
    
        this.setState(
            {diagnostico: dato}
        )
    }
    handleCodigoDiagnostico(dato){
    
        this.setState(
            {codigoDiagnostico: dato}
        )
    }
    handleFechaInicioIncapacidad(e){
        //var todayDate = new Date().toISOString().slice(0,10);
        let fi =new Date(e.target.value).getTime();

        let l1 = new Date(this.state.fechaAtencion);
        let l2 = new Date(this.state.fechaAtencion);
       
        l1 = new Date(l1.setTime( l1.getTime() + 3 * 86400000 )).getTime()
        l2 = new Date(l2.setTime( l2.getTime() - 3 * 86400000 )).getTime()

        this.setState({
            fechaInicioIncapacidad:new Date(e.target.value).toISOString().slice(0,10),
        });
        
        if (fi>l1){
            alert("La fecha de inicio no puede ser mayor a 3 días desde la fecha de atención")
            this.setState({
                fechaInicioIncapacidad:new Date().toISOString().slice(0,10),
            });
        }
        if (fi<l2){
            alert("La fecha de inicio no puede ser menor a 3 días desde la fecha de atención")
            this.setState({
                fechaInicioIncapacidad:new Date().toISOString().slice(0,10),
            });
        }
       
    }
    handleDiasSolicitados(e){
        this.setState({
            diasSolicitados: e.target.value,
        })
    }
    handleFechaFin(e){
        let l1 = new Date(this.state.fechaInicioIncapacidad);
        let dias = this.state.diasSolicitados -1;
        l1 = new Date(l1.setTime( l1.getTime() + dias * 86400000 )).getTime()
        this.setState({
            fechaFinIncapacidad:new Date(l1).toISOString().slice(0,10),
        });
        this.getBusinessDatesCount(new Date(this.state.fechaInicioIncapacidad),new Date(l1))


    }
    handleCausa(e){
        //console.log(e.target.value);
        this.setState({
            causae : e.target.value,
        });
    }
    handleObservacion(e){
        this.setState({
            observacion : e.target.value,
        });
    }
    handlePrestador(dato){
        this.setState(
            {tipoPrestador: dato}
        )
        
    }
    handleContingencia(e){
        console.log(e.target.value);
        this.setState({
            contingencia : e.target.value,
        });
        var contingencia = e.target.value;
        var causae = this.state.causae
        if ((contingencia == 2 || contingencia == 3) && (causae != 1 && causae != 14)){
            alert("la causa externa solo puede ser Accidente de trabajo o Enfermedad laboral")
            this.setState({
                causae : '',
            });
        }
    }
    getBusinessDatesCount(startDate, endDate) {
        //var startDate = new Date(startDate);
        //var endDate = new Date(endDate);   
        //console.log(endDate.toISOString().slice(0,10))    
        var count = 0;
        var countf = 0;
        var festivos = ["2020-05-01","2020-05-25"]
        var curDate = startDate;
        while (curDate <= endDate) {
            var dayOfWeek = curDate.getDay();
            //console.log(curDate.toISOString().slice(0,10) + " " + dayOfWeek);
            if(dayOfWeek <6)
               count++;
            //console.log(count + " "+ countf)
            if(festivos.includes(curDate.toISOString().slice(0,10)))
                countf++;
    
            curDate.setDate(curDate.getDate() + 1);
        }
        console.log(count);
        console.log(countf);
        var reconocidos = count-countf;
        this.setState({
            diasReconocidos : reconocidos
        });
    }
    guardarIncapacidad(){
        console.log(this.state)
        let url ='saveIncapacidad'
        
        axios.post(url, { datos: this.state})
            .then(resp => {
               console.log(resp.data)
            })
            .catch(err =>{
                console.log(err)
            })
    
      
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
        
                                <Comboips handleIpsChange={this.handleIpsChange} handlePrestador={this.handlePrestador}/>
                                <Medico /> 
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
                                            <input type="text" id="numeroIncapacidad" className="form-control" value={this.state.id + "-" + this.state.prorrogaId}  readOnly  />
                                            
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
                                             <Combocausae handler = {this.handleCausa} value= { this.state.causae} />
                                        </div>
                                    </div>
                        
                                    <div className="col-sm-9">
                                        <AutocompleteDescripcion handleDiagnostico ={this.handleDiagnostico} handleCodigoDiagnostico ={this.handleCodigoDiagnostico}/>
                                    </div>
                                    
                                </div>  
                                <div className="row">
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="lateralidad">Lateralidad</label>
                                            <select id="lateralidad" className="form-control">
                                                <option value=""></option>
                                                <option value="1">Derecha</option>
                                                <option value="2">Izquierda</option>
                                                <option value="3">Bilateral</option>
                                                <option value="4">No aplica</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="fechaInicioIncapacidad">Fecha inicio Incapacidad</label>
                                            <input type="date" id="fechaInicioIncapacidad" className="form-control" value={this.state.fechaInicioIncapacidad} onChange={this.handleFechaInicioIncapacidad} />
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="diasSolicitados">Dias Solicitados</label>
                                            <input type="number" id="diasSolicitados" className="form-control" onChange={this.handleDiasSolicitados} value={this.state.diasSolicitados}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="diasReconocidos">Dias Reconocidos</label>
                                            <input type="number" id="diasReconocidos" className="form-control" value={this.state.diasReconocidos} readOnly/>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="fechaFinIncapacidad">Fecha fin incapacidad</label>
                                            <input type="date" id="fechaFinIncapacidad" className="form-control" value={this.state.fechaFinIncapacidad} onSelect ={this.handleFechaFin} readOnly/>
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
                                            <select id="contingenciaOrigen" className="form-control" onChange={this.handleContingencia}>
                                                <option value=""></option> 
                                                <option value="1">Enfermedad general</option>
                                                <option value="2">Enfermedad laboral</option>
                                                <option value="3">Accidente de trabajo</option>
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
                                            <textarea rows="10" className="form-control" id="observacionMedica" onChange={this.handleObservacion}>

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
                                            <input type="text" id="tipoDocAportante" className="form-control" value={ this.state.tipoDocAportante}  readOnly />
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="numeroIdentificacionAportante">Número de identificacion</label>
                                            <input type="text" id="numDocAportante" className="form-control" value={this.state.numDocAportante}  readOnly  />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="tipoAportante">Tipo aportante</label>
                                            <input type="text" id="tipoAportante" className="form-control"   readOnly  />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="nombreAportante">Nombre aportante</label>
                                            <input type="text" id="nombreAportante" className="form-control" value={this.state.nombreAportante}  readOnly  />
                                        </div>
                                    </div>
                                </div>  
                                  
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <button className="btn btn-block btn-success" onClick={this.guardarIncapacidad}>GUARDAR INCAPACIDAD</button>
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