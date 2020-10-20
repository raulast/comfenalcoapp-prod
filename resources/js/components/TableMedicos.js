import React, { useState, useEffect } from 'react'
import Axios from 'axios'


import axios from 'axios';


export default function TableMedicos(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        props.handleEdition(u.target.id)
    }
    const medicos = props.medicos;
    return (
       
        <tbody>
            {Object.keys(medicos).map((key) => (
                <tr key={key}>

                    <td>{medicos[key]['cod_medico']}</td>
                    <td>{medicos[key]['tipo_documento']}</td>
                    <td>{medicos[key]['num_documento']}</td>
                    <td>{medicos[key]['nombre']}</td>
                    <td>{medicos[key]['reg_medico']}</td>
                    <td>{medicos[key]['especialidad']}</td>
                    <td><button className="btn btn-warning btn-sm" id={medicos[key]['id']} onClick={editar}>Editar</button></td>
                    {/*<td><button className="btn btn-danger btn-sm" id={medicos[key]['id']} onClick={eliminar}>Eliminar</button></td>*/}
                </tr>
            ))}
        </tbody>

    );

}
