import React, { useState, useEffect } from 'react'
import Axios from 'axios'


export default function TableDescripciones(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        props.handleEdition(u.target.id)
    }
    const descripciones = props.descripciones;
    const estadoTypes = ["Inactivo", "Activo"]
    const licenciaTypes = ["No","Si","No","No"]
    return (
        <tbody>
            {Object.keys(descripciones).map((key) => (
                <tr key={key}><td></td>
                <td>00000</td>
                <td>{descripciones[key]['clases_afiliacion_id']}</td>
                <td>{descripciones[key]['descripcion'] }</td>
                <td>{licenciaTypes[descripciones[key]['incapacidad']]}</td>
                <td>{estadoTypes[descripciones[key]['activo']]}</td>
                <td><button className="btn btn-warning btn-sm" id={descripciones[key]['id']} onClick={editar}>Editar</button></td>
               
                </tr>
            ))}
        </tbody>

    );

}
