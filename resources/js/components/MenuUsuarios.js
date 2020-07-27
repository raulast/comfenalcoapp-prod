import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UsuariosSistema from './UsuariosSistema.js';
import MedicosSistema from './MedicosSistema.js';
import axios from 'axios';


class MenuUsuarios extends Component {
    constructor(props) {
        super(props);

        // bind

    }
    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="pill" href="#sistema">Sistema</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#medicos">Médicos</a>
                    </li>
                </ul>

            
                <div className="tab-content">
                    <div className="tab-pane container active" id="sistema"><UsuariosSistema /></div>
                    <div className="tab-pane container fade" id="medicos"><MedicosSistema /></div>
                    
                </div>
            </div>
        );
    }

}

export default MenuUsuarios;
/*
if (document.getElementById('menuUsuarios')) {
    ReactDOM.render(<MenuUsuarios />, document.getElementById('menuUsuarios'));
}
*/