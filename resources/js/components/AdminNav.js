import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuUsuarios from './MenuUsuarios.js';
import MenuGenerales from './MenuGenerales.js';
import axios from 'axios';


class AdminNav extends Component {

    constructor(props) {
      super(props);
        console.log(props)
       
        this.state = {
          tipo: props.tipo,
        }
        // bind
 
    }
    render() {
        return (
          <div className="row">
            <div className="col-1 "> 
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="pill" href="#generales">Generales</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#usuarios">Usuarios</a>
                  </li>
                </ul>
            </div>
            <div className="col-11"> 
                <div className="tab-content">
                <div className="tab-pane container fade" id="usuarios"><MenuUsuarios /></div>
                { this.state.tipo != 5 ? 
                <div className="tab-pane container active" id="generales"><MenuGenerales /></div>
                : ''
                }
                </div>
            </div>
          </div>
        );
    }
    
}
export default AdminNav;

if (document.getElementById('adminNav')) {
    const tipo =document.getElementById('tipo').value;
    ReactDOM.render(<AdminNav tipo={tipo} />, document.getElementById('adminNav'));
}