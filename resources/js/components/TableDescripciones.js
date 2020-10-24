import React, { useState, useEffect } from 'react'
import Axios from 'axios'


export default function TableDescripciones(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        const name = u.target.name.split('/') 
        props.handleEdition(u.target.id, name[1], 'Programa', name[0])
    }
    const descripciones = props.descripciones;
    const estadoTypes = ["Inactivo", "Activo"]
    const licenciaTypes = ["No","Si","No","No"]
    return (
        <tbody>
            {Object.keys(descripciones).map((key) => (
                <tr key={key}><td></td>
                <td>{descripciones[key]['codigo']}</td>
                <td>{descripciones[key]['clases_afiliacion_id']}</td>
                <td>{descripciones[key]['descripcion'] }</td>
                <td>{licenciaTypes[descripciones[key]['incapacidad']]}</td>
                <td>{estadoTypes[descripciones[key]['activo']]}</td>
                <td><button className="btn btn-warning btn-sm" id={descripciones[key]['id']} name={descripciones[key]['codigo']+'/'+descripciones[key]['descripcion']} onClick={editar}>Editar</button></td>
               
                </tr>
            ))}
        </tbody>

    );

}
