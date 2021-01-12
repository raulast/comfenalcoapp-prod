import React, { useState, useEffect } from 'react'

import axios from 'axios';


export default function TableCronicos(props) {
    console.log(props);

    const eliminar = (u) => {
        const id= u.target.id;
        props.setModal(true, id);
    }
    const editar = (u) =>{
        props.handleEdition(u.target.id)
    }
    const cronicos = props.cronicos;
    
    
    if (typeof cronicos === 'object'){
         var cols=Object.keys(cronicos[0])
         const columnas = cols.map((col) =>
            <td>{col}</td>
            );

    const openCronico = (u) =>{
        window.open('verCronico/'+ u.target.id + "/1",'_blank');
    }
    return (

        <div>
           
            <table className="table table-sm table-striped table-bordered texto">
                <tbody>
                    <tr className="table-success">{ columnas}</tr>

                    {Object.keys(cronicos).map((key) => (
                        <tr key={key}>
                            {cols.map((col) =>
                             col != 'id' ? <td>{cronicos[key][col]}</td> :
                                <td className="d-flex justify-content-between align-items-center border-bottom-0 border-right-0 ">
                                   <button className="btn btn-sm btn-success mx-3" id={cronicos[key][col]} onClick={openCronico}>Ver</button>
                                   <button className="btn btn-sm btn-danger mx-3" id={cronicos[key][col]} onClick={eliminar}><i className="fas fa-trash-alt"></i></button>
                                </td> 
                            )}
                    
                        </tr>
            ))}
               
                </tbody>
            </table>
        </div>

    );
    }
}
