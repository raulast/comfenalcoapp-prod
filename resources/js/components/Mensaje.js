import React, { Component } from 'react';
import ReactDOM from 'react-dom';


function Mensaje(props) {
    const tipo = props.tipo;
    const mensaje = props.mensaje;
    if (tipo == "success") {
      return <div className="alert alert-success" role="alert">{ mensaje }</div>;
    }
    
}
/*
ReactDOM.render(
    // Intentar cambiando isLoggedIn={true}:
    <Mensaje tipo="success" />,
    document.getElementById('mensaje')
);*/