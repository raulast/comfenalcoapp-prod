import React, { useState, useEffect } from 'react'
import Axios from 'axios'


import axios from 'axios';


export default function TableMedicos(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
<<<<<<< HEAD:resources/js/containers/Medicos/TableMedicos.js
        console.log(u.target.name);
        const name = u.target.name.split('/');
       
=======
        const name = u.target.name.split('/')
>>>>>>> 63338422eb5b99c43aa38e734f2e1f19859e5a45:resources/js/components/TableMedicos.js
        props.handleEdition(u.target.id, name)
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
                    <td><button className="btn btn-warning btn-sm" id={medicos[key]['id']} 
                        name={
                            medicos[key]['cod_medico']+'/'+
                            medicos[key]['tipo_documento']+'/'+
                            medicos[key]['num_documento']+'/'+
                            medicos[key]['nombre']+'/'+
                            medicos[key]['reg_medico']+'/'+
                            medicos[key]['especialidad']
                        }
<<<<<<< HEAD:resources/js/containers/Medicos/TableMedicos.js
                        onClick={editar}><span><i className="far fa-edit"/></span></button></td>
                    <td><button className="btn btn-danger btn-sm" id={medicos[key]['id']} onClick={eliminar}><i className="fas fa-trash-alt"></i></button></td>
=======
                        onClick={editar}>Editar</button></td>
                    {/*<td><button className="btn btn-danger btn-sm" id={medicos[key]['id']} onClick={eliminar}>Eliminar</button></td>*/}
>>>>>>> 63338422eb5b99c43aa38e734f2e1f19859e5a45:resources/js/components/TableMedicos.js
                </tr>
            ))}
        </tbody>

    );

}
