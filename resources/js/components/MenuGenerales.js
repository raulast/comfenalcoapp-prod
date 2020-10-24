import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CausasAdmin from './CausasAdmin.js';
import Cie10Admin from './Cie10Admin.js';
import EstadosAdmin from './EstadosAdmin';
import DiasmaxAdmin from './DiasmaxAdmin';
import IpsAdmin from './IpsAdmin';
import DerechosAdmin from './DerechosAdmin';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MenuGenerales extends Component {
    constructor(props) {
        super(props);

        // bind
        this.handleToast = this.handleToast.bind(this);

    }

    handleToast(arg,type) {
        console.log('Menu generales');
        if(type == 'success') {
            toast.success(arg.data.data, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else if(type == 'error') {
            toast.error(arg, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    render() {

        return (
            <div>
                <ToastContainer/>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#ce">Causa externa</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#cie10">Cie10</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#diase">Días especialidades</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#estados">Estados</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#ips">Ips</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#validacion">Validación derechos</a>
                    </li>
                </ul>


                <div className="tab-content">
                    <div className="tab-pane container active" id="ce"><CausasAdmin showToast={(arg,type) => this.handleToast(arg,type)}/></div>
                    <div className="tab-pane container fade" id="cie10"><Cie10Admin /></div>
                    <div className="tab-pane container fade" id="diase"><DiasmaxAdmin showToast={(arg,type) => this.handleToast(arg,type)}/></div>
                    <div className="tab-pane container fade" id="estados"><EstadosAdmin showToast={(arg,type) => this.handleToast(arg,type)}/></div>
                    <div className="tab-pane container fade" id="ips"><IpsAdmin showToast={(arg,type) => this.handleToast(arg,type)}/></div>
                    <div className="tab-pane container fade" id="validacion"><DerechosAdmin showToast={(arg,type) => this.handleToast(arg,type)}/></div>

                </div>
            </div>
        );
    }

}

export default MenuGenerales;

