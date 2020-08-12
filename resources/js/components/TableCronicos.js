import React, { useState, useEffect } from 'react'
import Axios from 'axios'


import axios from 'axios';


export default function TableCronicos(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        props.handleEdition(u.target.id)
    }
    const cronicos = props.cronicos;
    
   
    //console.log(Object.keys(cronicos[0]))
    //console.log(typeof cronicos[0])
    
    if (typeof cronicos === 'object'){
         var cols=Object.keys(cronicos[0])
         const columnas = cols.map((col) =>
            <td>{col}</td>
            );

    const openCronico = (u) =>{
        window.open('verCronico/'+ u.target.id,'_blank');
    }
    return (

        <div>
           
            <table className="table table-sm table-striped table-bordered texto">
                <tbody>
                    <tr className="table-success">{ columnas}</tr>

                    {Object.keys(cronicos).map((key) => (
                        <tr key={key}>
                            {cols.map((col) =>
                             col != 'id' ? <td>{cronicos[key][col]}</td> :  <td><button className="btn btn-sm btn-success" id={cronicos[key][col]} onClick={openCronico}>Ver</button></td> 
                
                            )}
                    
                        </tr>
            ))}
               
                </tbody>
            </table>
        </div>

    );
    }
}
