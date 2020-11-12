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

    handleBuscar(){
        const selection = document.getElementById('selector_'+this.props.tag).value;
        if(selection!='*'){
            const fuse = new Fuse(this.props.list, this.state.options);
            const result = fuse.search(selection);
            let tmp = '';
            Object.keys(result).map((key)=>(
                tmp = [...tmp, result[key].item]
                ));
            this.props.toRender(tmp);
        }else{
            this.props.toRender(this.props.list);
        }
    }

    render() {
        if(this.props.auto){
            this.handleBuscar();
        }
        const { children } = this.props;
        return (
            <Fragment>
                <select id={'selector_'+this.props.tag} className="form-control col-3" defaultValue='*' name="tipo" onChange={this.handleBuscar}>
                    {children}
                </select>
            </Fragment>
        )
    }
}

export default index
