import React, { useState, useEffect } from 'react'
import Axios from 'axios'


import axios from 'axios';


export default function TableUsers(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        props.handleEdition(u.target.id)
    }
    const users = props.users;
    //const { users } = this.state;
    const userTypes = ["Admin", "Médico","Auxiliar Pemel","Admin Pemel","Admin IPS","Usuarios Admin"]
    return (
        <tbody>
            {Object.keys(users).map((key) => (
                <tr key={key}><td></td><td>{users[key]['name']}</td><td>{users[key]['email']}</td><td>{userTypes[users[key]['tipo']]}</td>
                    <td><button className="btn btn-warning btn-sm" id={users[key]['id']} onClick={editar}>Editar</button></td>
                    <td><button className="btn btn-danger btn-sm" id={users[key]['id']} onClick={eliminar}>Eliminar</button></td>
                </tr>
            ))}
        </tbody>

    );

}
