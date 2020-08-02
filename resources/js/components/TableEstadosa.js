import React, { useState, useEffect } from 'react'
import Axios from 'axios'


export default function TableEstadosa(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        props.handleEdition(u.target.id)
    }
    const estadosa = props.estadosa;
    const estadoTypes = ["Inactivo", "Activo"]
    const licenciaTypes = ["No","Si","No","No"]
    return (
        <tbody>
            {Object.keys(estadosa).map((key) => (
                <tr key={key}><td></td>
                <td>{estadosa[key]['estado']}</td>
                <td>{licenciaTypes[estadosa[key]['incapacidad']]}</td>
                <td>{estadoTypes[estadosa[key]['activo']]}</td>
                <td><button className="btn btn-warning btn-sm" id={estadosa[key]['id']} onClick={editar}>Editar</button></td>              
                </tr>
            ))}
        </tbody>

    );

}
