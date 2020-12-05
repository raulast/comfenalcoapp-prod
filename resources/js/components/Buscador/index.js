import React, { Component, Fragment } from 'react';
import Fuse from 'fuse.js';

class index extends Component {

    constructor(props){
        super(props)
        this.handleBuscar=this.handleBuscar.bind(this);
    }

    handleBuscar({target}){
        if (target.value != '') {
            const fuse = new Fuse(this.props.list, this.props.options);
            const filtro = ('\''+target.value).replace(' ',' \'');
            const result = fuse.search(filtro);
            let tmp = '';
            Object.keys(result).map((key)=>(
                tmp = [...tmp, result[key].item]
                ));
            this.props.toRender(tmp);
        } else {
            this.props.toRender(this.props.list);
        }
    }
    render() {
        return (
            <Fragment>
                <input type="text" className="form-control col-8" id="buscador_medicos" name="buscador_medicos" placeholder="Buscar..." onChange={this.handleBuscar}></input>
            </Fragment>
        );
    }
}

export default index;
