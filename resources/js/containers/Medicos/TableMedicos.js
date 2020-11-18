import React, { useState, useEffect } from 'react'

export default function TableMedicos(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        const name = u.target.name.split('/');
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
                    <td>{medicos[key]['email']}</td>
                    <td>{medicos[key]['especialidad']}</td>
                    <td><button className="btn btn-warning btn-sm" id={medicos[key]['id']}
                        name={
                            medicos[key]['cod_medico']+'/'+
                            medicos[key]['tipo_documento']+'/'+
                            medicos[key]['num_documento']+'/'+
                            medicos[key]['nombre']+'/'+
                            medicos[key]['reg_medico']+'/'+
                            medicos[key]['especialidad']+'/'+
                            medicos[key]['email']
                        }
                        onClick={editar}><i className="far fa-edit"></i></button></td>
                    <td><button className="btn btn-danger btn-sm" id={medicos[key]['id']} onClick={eliminar}><i className="fas fa-trash-alt"></i></button></td>
                </tr>
            ))}
        </tbody>

    );

}
