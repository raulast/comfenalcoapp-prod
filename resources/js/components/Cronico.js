import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CronicoTab1 from './cronicoTab1';
import CronicoTab2 from './cronicoTab2';
import CronicoTab3 from './cronicoTab3';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Cronico extends Component {
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
                      <a className="nav-link active" data-toggle="pill" href="#tab1">1</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="pill" href="#tab2">2</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="pill" href="#tab3">3</a>
                    </li>
                  </ul>
              </div>
              <div className="col-11">
                  <div className="tab-content">
                    <div className="tab-pane container active" id="tab1"><CronicoTab1 showToast={(arg,type) => this.handleToast(arg,type)} {...this.props}/></div>
                    <div className="tab-pane container fade" id="tab2"><CronicoTab2 showToast={(arg,type) => this.handleToast(arg,type)} {...this.props}/></div>
                    <div className="tab-pane container fade" id="tab3"><CronicoTab3 showToast={(arg,type) => this.handleToast(arg,type)} {...this.props}/></div>
                  </div>
              </div>
            </div>
          );
      }
}

export default Cronico;

if (document.getElementById('cronicoContent')) {
    const cronico =document.getElementById('cronico').value;
    const enable =document.getElementById('enable').value;
    ReactDOM.render(<Cronico id={cronico} enable={enable}/>, document.getElementById('cronicoContent'));
 }