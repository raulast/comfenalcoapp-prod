import React, { useState, useEffect } from 'react'
import Axios from 'axios'


import axios from 'axios';


export default function TableDiasmax(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        //console.log(u.target.name);
        props.handleEdition(u.target.id,u.target.name)
    }
    const esp = props.esp;
    //const { users } = this.state;
    //const estadoTypes = ["Inactivo", "Activo"]
    return (
        <tbody>
            {Object.keys(esp).map((key) => (
                <tr key={key}><td></td><td>{esp[key]['especialidad']}</td>
                <td>{esp[key]['dias_maximos']}</td>
                    <td><button className="btn btn-warning btn-sm" id={esp[key]['id']} name={esp[key]['especialidad']} onClick={editar}>Editar</button></td>
                    
                </tr>
            ))}
        </tbody>

    );

}
