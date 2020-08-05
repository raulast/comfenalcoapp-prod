import React, { useState, useEffect } from 'react'
import Axios from 'axios'


import axios from 'axios';


export default function TableEstados(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        props.handleEdition(u.target.id)
    }
    const estados = props.estados;
    //const { users } = this.state;
    const estadoTypes = ["Inactivo", "Activo"]
    return (
        <tbody>
            {Object.keys(estados).map((key) => (
                <tr key={key}><td></td><td>{estados[key]['estado']}</td>
                <td>{estadoTypes[estados[key]['activo']]}</td>
                    <td><button className="btn btn-warning btn-sm" id={estados[key]['id']} onClick={editar}>Editar</button></td>
                   
                </tr>
            ))}
        </tbody>

    );

}
