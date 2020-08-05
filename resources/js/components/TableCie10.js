import React, { useState, useEffect } from 'react'
import Axios from 'axios'


import axios from 'axios';


export default function TableCausas(props) {
    const cies = props.cies;
    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (key) =>{
        //console.log(key.target.id);
        props.handleEdition(key.target.id)
    }
    
    //const { users } = this.state;
    //const estadoTypes = ["Inactiva", "Activa"]
    return (
        <tbody>
            {Object.keys(cies).map((key) => (
                <tr key={key}>
                <td><button className="btn btn-primary btn-sm" id={cies[key]['id']} onClick={editar}>Ver</button></td>
                <td>{cies[key]['codigo']}</td>
                <td>{cies[key]['descripcion_diagnostico']}</td>
                <td>{cies[key]['num_dias_maximo_solicitud']}</td>
                <td>{cies[key]['capitulo_grupo']}</td>
                <td>{cies[key]['categoria_subgrupo']}</td>
                
                </tr>
            ))}
        </tbody>

    );

}
