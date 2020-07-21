import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios'

export default class AutocompleteDescripcion extends Component {
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
        this.onTextChanged = this.onTextChanged.bind(this);
        this.suggestionSelected = this.suggestionSelected.bind(this);
        
    }
    onTextChanged(e) {
        const value = e.target.value;

        let suggestions = [];
        if (value.length > 4) {
            /*
            const regex = new RegExp(`^${value}`,'i');
            suggestions = this.items.sort().filter(v => regex.test(v));   
            */
            let url = 'search/diagnostico/' + value;
            //console.log(url);
            Axios.get(url)
                .then(resp => {
                    // console.log(resp.data.data);

                    suggestions = resp.data.data;
                    // suggestions = [1,2,3];
                    //console.log(suggestions);
                    this.setState({
                        suggestions: suggestions,

                    });
                    //suggestions.map((item) => console.log(<li key={item.id} onClick={() => this.suggestionSelected(item.descripcion_diagnostico)}>{item.descripcion_diagnostico}</li>));
                })
                .catch(err => {
                    console.log(err)
                })
        }
        this.setState({
            suggestions: suggestions,
            text: value,
        });
        //this.setState(() => ({ suggestions,text:value}));


    }
    suggestionSelected(value,cod,capitulo,diasMaximos) {
        cod = cod.trim()
        this.setState({
            suggestions: [],
            text: value,
            codigo : cod,
            capitulo:capitulo,
            diasMaximos: diasMaximos,
        });
        this.props.handleDiagnostico(value)
        this.props.handleCodigoDiagnostico(cod)
        this.props.handleCapituloDiagnostico(capitulo)
        this.props.handleMaximosCie10(diasMaximos)
    }

    renderSuggestions() {
        const { suggestions } = this.state;
        //console.log(suggestions);
        if (suggestions.lenght === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li key={item.id} onClick={() => this.suggestionSelected(item.descripcion_diagnostico,item.codigo,item.capitulo_grupo,item.num_dias_maximo_solicitud)}>{item.descripcion_diagnostico}</li>)}
            </ul>
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
                        <input value={text} onChange={this.onTextChanged} type="text" id="descripcionDiagnostico" className="form-control" />
                        {this.renderSuggestions()}
                        <div className={error}>
                            <div className={ "invalid-feedback  " + ( error || "") }>{ mensaje}</div>
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