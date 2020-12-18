import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuUsuarios from './MenuUsuarios.js';
import MenuGenerales from './MenuGenerales.js';
import AuditsForm from './AuditsForm.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AdminNav extends Component {

    constructor(props) {
      super(props);
       
        this.state = {
          tipo: props.tipo,
        }
        // bind

      this.handleToast = this.handleToast.bind(this);
 
    }

    handleToast(arg,type) {
      console.log(arg, type);
      if(type == 'success') {
          toast.success(arg, {
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
          <div className="row">
            <ToastContainer/>
            <div className="col-1 "> 
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="pill" href="#generales">Generales</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#usuarios">Usuarios</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#audits">Auditoría</a>
                  </li>
                </ul>
            </div>
            <div className="col-11">
                <div className="tab-content">
                  <div className="tab-pane container fade" id="usuarios"><MenuUsuarios showToast={(arg,type) => this.handleToast(arg,type)}/></div>
                  { this.state.tipo != 5 ? 
                  <div className="tab-pane container active" id="generales"><MenuGenerales showToast={(arg,type) => this.handleToast(arg,type)}/></div>
                  : ''
                  }
                  <div className="tab-pane container fade" id="audits"><AuditsForm showToast={(arg,type) => this.handleToast(arg,type)}/></div>
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