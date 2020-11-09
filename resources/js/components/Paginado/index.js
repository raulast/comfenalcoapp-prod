import React, { Component, Fragment } from 'react';
import ReactPaginate from 'react-paginate';

class index extends Component {
    constructor(props){
        super(props);

        this.state = {
            offset:0,
            currentPage: 0,
            pageCount: 0
        };
        this.getData=this.getData.bind(this);
        this.handlePageClick=this.handlePageClick.bind(this);

    }

    getData(){
        const data = this.props.listado;
        const slice = data.slice(this.state.offset, this.state.offset + this.props.perPage);
        this.props.toRender(slice);
        console.log('si carga');
        console.log(this.props.listado);

        this.setState({
            pageCount: Math.ceil(data.length / this.props.perPage)
        })
    }

    handlePageClick(e){
        const selectedPage = e.selected;
        const offset = selectedPage * this.props.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.state.getData()
        });

    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <Fragment>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </Fragment>
        );
    }
}

export default index;
