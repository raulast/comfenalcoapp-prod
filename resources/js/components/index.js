import React from 'react';
import ReactDOM from 'react-dom';

function Test() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Bienvenido</div>

                        <div className="card-body">Soy un componentes de react</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test;

if (document.getElementById('test')) {
    ReactDOM.render(<Test />, document.getElementById('test'));
}
