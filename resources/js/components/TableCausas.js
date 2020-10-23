import React, { useState, useEffect } from 'react'

export default function TableCausas(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        console.log(u.target.name)
        props.handleEdition(u.target.id,u.target.name)
    }
    const causas = props.causas;
    //const { users } = this.state;
    const estadoTypes = ["Inactiva", "Activa"]
    return (
        <tbody>
            {Object.keys(causas).map((key) => (
                <tr key={key}><td></td><td>{causas[key]['causa_externa']}</td>
                <td>{estadoTypes[causas[key]['estado']]}</td>
                    <td><button className="btn btn-warning btn-sm" id={causas[key]['id']} name={causas[key]['causa_externa']} onClick={editar}>Editar</button></td>
                    {/* <td><button className="btn btn-danger btn-sm" id={causas[key]['id']} name={causas[key]['causa_externa']} onClick={eliminar}>Eliminar</button></td> */}
                </tr>
            ))}
        </tbody>

    );

}
