import React, { Component, Fragment } from 'react';
import ReactPaginate from 'react-paginate';

class index extends Component {
    constructor(props){
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 5,
            currentPage: 0
        };
        this.receivedData=this.receivedData.bind(this);
        this.handlePageClick=this.handlePageClick.bind(this);

    }
    handlePageClick(e) {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    }
    receivedData(e){
        const data = this.props.table;
        const slice = data.slice(this.props.offset, this.props.offset + this.props.perPage)
        const postData = slice.map(key =>
                console.log(key)
            );

        this.setState({
            pageCount: Math.ceil(data.length / this.props.perPage),

            postData
        })
    }
    render() {
        return (
            <Fragment>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
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
