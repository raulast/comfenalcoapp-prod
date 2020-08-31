import React, { useState, useEffect } from 'react'
import Axios from 'axios'


import axios from 'axios';


export default function TableReportes(props) {

    const datos = props.datos;
    
    if (typeof datos === 'object'){
         var cols=Object.keys(datos[0])
         const columnas = cols.map((col) =>
            <td>{col}</td>
            );
    return (

        <div>
           
            <table className="table table-sm table-striped table-bordered texto">
                <tbody>
                    <tr className="table-success">{ columnas}</tr>

                    {Object.keys(datos).map((key) => (
                        <tr key={key}>
                            {cols.map((col) =>
                             
                             (col!="validacion") ? (
                            <td>{datos[key][col]}</td>) :
                                (<td></td>)
                            
                            )}
                    
                        </tr>
            ))}
               
                </tbody>
            </table>
        </div>

    );
    }
}
