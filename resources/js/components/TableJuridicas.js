import React, { useState, useEffect } from 'react'
import Axios from 'axios'


import axios from 'axios';


export default function TableJuridicas(props) {

    const eliminar = (u) => {
        props.handleEliminar(u.target.id)
    }
    const editar = (u) =>{
        props.handleEdition(u.target.id)
    }
    const juridicas= props.juridicas;
    
   
    //console.log(Object.keys(cronicos[0]))
    //console.log(typeof cronicos[0])
    
    if (typeof juridicas === 'object'){
         var cols=Object.keys(juridicas[0])
         const columnas = cols.map((col) =>
            <td>{col}</td>
            );

    const openJuridica = (u) =>{
        window.open('verJuridica/'+ u.target.id + "/1/u",'_blank');
    }
    return (

        <div style={{overflow: scroll}}>
           
            <table className="table table-sm table-striped table-bordered texto">
                <tbody>
                    <tr className="table-success">{ columnas}</tr>

                    {Object.keys(juridicas).map((key) => (
                        <tr key={key}>
                            {cols.map((col) =>
                             col != 'id' ? <td>{juridicas[key][col]}</td> :  <td><button className="btn btn-sm btn-success" id={juridicas[key][col]} onClick={openJuridica}>Ver</button></td> 
                
                            )}
                    
                        </tr>
            ))}
               
                </tbody>
            </table>
        </div>

    );
    }
}
