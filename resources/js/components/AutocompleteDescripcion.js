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
    suggestionSelected(value,cod) {
        cod = cod.trim()
        this.setState({
            suggestions: [],
            text: value,
            codigo : cod
        });
        this.props.handleDiagnostico(value)
        this.props.handleCodigoDiagnostico(cod)
    }

    renderSuggestions() {
        const { suggestions } = this.state;
        //console.log(suggestions);
        if (suggestions.lenght === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li key={item.id} onClick={() => this.suggestionSelected(item.descripcion_diagnostico,item.codigo)}>{item.descripcion_diagnostico}</li>)}
            </ul>
        );
    }
    render() {
        const { text } = this.state;
        return (
            <div className="row">
            <div className="col-sm-10">
                <div className="form-group">

                    <label htmlFor="descripcionDiagnostico">Descripción diagnóstico</label>
                    <div className="AutoCompleteDescripcion">
                        <input value={text} onChange={this.onTextChanged} type="text" id="descripcionDiagnostico" className="form-control" />
                        {this.renderSuggestions()}
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