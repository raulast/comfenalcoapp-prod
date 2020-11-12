import React, { Component, Fragment } from 'react'
import Fuse from 'fuse.js';


class index extends Component {

    constructor(props){
        super(props);
        this.state = {
            options: {
                useExtendedSearch: true,
                findAllMatches: true,
                minMatchCharLength: 1,
                threshold: 0,
                keys: [
                    this.props.keyx,
                ]
            },
        }
        this.handleBuscar=this.handleBuscar.bind(this);
    }

    handleBuscar({target}){
        const fuse = new Fuse(this.props.list, this.state.options);
        console.log('Funcion: ->', target.value);
        const result = fuse.search('\''+target.value);
        let tmp = '';
        Object.keys(result).map((key)=>(
            tmp = [...tmp, result[key].item]
            ));
        this.props.toRender(tmp);
        // const fuse = new Fuse(this.props.list, this.props.options);
        // const filtro = ('\''+target.value).replace(' ',' \'');
        // const result = fuse.search(filtro);
        // let tmp = '';
        // Object.keys(result).map((key)=>(
        //     tmp = [...tmp, result[key].item]
        //     ));
        // this.props.toRender(tmp);
    }

    render() {
        const { children } = this.props;
        console.log(this.props);
        return (
            <Fragment>
                <select className="form-control col-3" defaultValue='*' name="tipo" onChange={this.handleBuscar}>
                    {children}
                </select>
            </Fragment>
        )
    }
}

export default index