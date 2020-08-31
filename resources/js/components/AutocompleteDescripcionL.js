import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { size } from 'lodash';

export default class AutocompleteDescripcionL extends Component {
    constructor(props) {
        super(props);
        this.items = [
            
        ];
        this.state = {
            suggestions: [],
            text: '',
            codigo:'',
            capitulo:'',
            diasMaximos:0,
           
        }
       
        this.handleChange = this.handleChange.bind(this);
        this.loadMenu = this.loadMenu.bind(this);
       
    }
    componentDidUpdate(prevProps) {
        if (prevProps.licencia !== this.props.licencia) {
          this.loadMenu();
        }
    }
    componentDidMount(){
        this.loadMenu();
    }
    handleChange(e){
        console.log(e.target.value)
        
        for (var i = 0; i < size(this.state.suggestions); i++) {
            var suggestion = this.state.suggestions[i];
            if (suggestion.id == e.target.value){
                this.setState({
                    text: e.target.value,
                    codigo: suggestion.codigo,
                    capitulo: suggestion.capitulo_grupo,
                    diasMaximos: suggestion.num_dias_maximo_solicitud
                },() => {
                    this.props.handleDiagnostico(this.state.text)
                    this.props.handleCodigoDiagnostico(this.state.codigo)
                    this.props.handleCapituloDiagnostico(this.state.capitulo)
                    this.props.handleMaximosCie10(this.state.diasMaximos)
                });
                
            }
        }
        

    }
    loadMenu(){
        const { licencia } = this.props;
        let suggestions = [];
        if (licencia !="0"){
            let url = 'search/diagnosticoLicencia/' + licencia;
            Axios.get(url)
                .then(resp => {
                    suggestions = resp.data.data;
                    this.setState({
                        suggestions: suggestions,
                    });
                    
                })
                .catch(err => {
                    console.log(err)
                })
            
            this.setState({
                suggestions: suggestions,
            });
        }
    }
    renderSuggestions() {
        const { suggestions } = this.state;
        //console.log(suggestions);
        if (suggestions.lenght === 0) {
            return null;
        }
        return (
            
            suggestions.map((item) => <option value={item.id} key={item.id}>{item.descripcion_diagnostico}</option>)
           
        );
    }
    render() {
        const { text } = this.state;
        const { error } = this.props;
        const { mensaje } = this.props;
        const { title} = this.props;
        return (
            <div className="row">
            <div className="col-sm-10">
                <div className="form-group">

                    <label htmlFor="descripcionDiagnostico">{ title }</label>
                    <div className="AutoCompleteDescripcion">
                        <select value={text} onChange={ this.handleChange} id="descripcionDiagnostico" className="form-control">
                        <option value=""></option>
                        {this.renderSuggestions()}
                        </select>
                        <div className={error}>
                            <div className={ "redf  " + ( error || "") }>{ mensaje}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-2">
                <div className="form-group">
                    <label htmlFor="codigoDiagnostico">Código</label>
                    <input type="text" id="codigoDiagnostico" className="form-control" value={ this.state.codigo } readOnly/>
                </div>
            </div>
            </div>
            
        )
    }

}