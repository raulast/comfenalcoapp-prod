import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import JuridicaTab1 from './JuridicaTab1';
import JuridicaTab2 from './JuridicaTab2';
import JuridicaTab3 from './JuridicaTab3';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data } from 'jquery';



class Juridica extends Component {
    constructor(props) {
        super(props);
         
          this.state = {
            tipo: props.tipo,
            data: {},
            data1: {},
            data2: {},
            data3: {}
          }
          // bind
  
        this.handleToast = this.handleToast.bind(this);
        this.handleData = this.handleData.bind(this);
      }
  
      handleToast(arg,type) {
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

    handleData(arg, index) {
      const { data1, data2, data3 } =  this.state;
      if(index == 1) {
        this.setState({data1: arg});
      }else if(index == 2) {
        this.setState({data2: arg});
      }else if(index == 3) {
        this.setState({data3: arg});
      }
      this.setState({data: {...data1, ...data2, ...data3}})
    };

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
                    <div className="tab-pane container active" id="tab1">
                      <JuridicaTab1 
                        dataToSend={(arg, index)=>{this.handleData(arg, index)}} 
                        showToast={(arg,type) => this.handleToast(arg,type)}
                        data={this.state.data}
                        {...this.props}
                      />
                    </div>
                    <div className="tab-pane container fade" id="tab2">
                      <JuridicaTab2 
                        dataToSend={(arg, index)=>{this.handleData(arg, index)}}
                        showToast={(arg,type) => this.handleToast(arg,type)}
                        data={this.state.data}
                        {...this.props}
                      />
                    </div>
                    <div className="tab-pane container fade" id="tab3">
                      <JuridicaTab3 
                        dataToSend={(arg, index)=>{this.handleData(arg, index)}}
                        showToast={(arg,type) => this.handleToast(arg,type)}
                        data={this.state.data}
                        {...this.props}
                      />
                    </div>
                  </div>
              </div>
            </div>
          );
      }
}

export default Juridica;

if (document.getElementById('juridicaContent')) {
    const juridica = document.getElementById('juridica').value;
    const enable = document.getElementById('enable').value;
    const crud = document.getElementById('crud').value;
    ReactDOM.render(<Juridica id={juridica} enable={enable} crud={crud} />, document.getElementById('juridicaContent'));
}