import React, { useState, useEffect } from 'react'
import Axios from 'axios'


import axios from 'axios';


export default function TableIps(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        props.handleEdition(u.target.id)
    }
    const ips = props.ips;
    //const { users } = this.state;
    //const estadoTypes = ["Inactiva", "Activa"]
    return (
        <tbody>
            {Object.keys(ips).map((key) => (
                <tr key={key}>
                <td><button className="btn btn-primary btn-sm" id={ips[key]['id']} onClick={editar}>Ver</button></td>
                <td>{ips[key]['cod_sede']}</td>
                <td>{ips[key]['nombre_sede']}</td>
                <td>{ips[key]['cod_habilitacion']}</td>
                <td>{ips[key]['direccion']}</td>
                <td>{ips[key]['telefono']}</td>
                <td>{ips[key]['razon_social']}</td>
                <td>{ips[key]['nit']}</td>
                </tr>
            ))}
        </tbody>

    );

}
