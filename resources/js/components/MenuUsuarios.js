import React, { Component } from 'react';
import UsuariosSistema from '../containers/Usuarios/UsuariosSistema.js';
import MedicosSistema from '../containers/Medicos/MedicosSistema.js';


class MenuUsuarios extends Component {
    constructor(props) {
        super(props);

        // bind
    }

    render() {

        const { showToast } = this.props;

        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#sistema">Sistema</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#medicos">Médicos</a>
                    </li>
                </ul>

            
                <div className="tab-content">
                    <div className="tab-pane container active" id="sistema"><UsuariosSistema showToast={showToast}/></div>
                    <div className="tab-pane container fade" id="medicos"><MedicosSistema showToast={showToast}/></div>
                    
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