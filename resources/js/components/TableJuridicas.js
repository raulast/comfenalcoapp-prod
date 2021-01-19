import React, { useState, useEffect } from 'react'
import Axios from 'axios'


import axios from 'axios';


export default function TableJuridicas(props) {
    const juridicas= props.juridicas;
    
    if (typeof juridicas === 'object'){
         var cols=Object.keys(juridicas[0])
         const columnas = cols.map((col) =>
            <td>{col}</td>
            );

        const openJuridica = (u) =>{
            window.open('verJuridica/'+ u.target.id + "/1/u",'_blank');
        }
        const deleteJuridica = (u) =>{
            const id= u.target.id;
            props.setModal(true, id);
        }
        return (
            <div style={{overflow: scroll}}>
                <table className="table table-sm table-striped table-bordered texto">
                    <tbody>
                        <tr className="table-success">{ columnas}</tr>
                        {Object.keys(juridicas).map((key) => (
                            <tr key={key}>
                                {cols.map((col) =>
                                col != 'id' 
                                ? <td>{juridicas[key][col]}</td> 
                                : <td className="d-flex justify-content-between align-items-center border-bottom-0 border-right-0">
                                        <button className="btn btn-sm btn-success mx-3" id={juridicas[key][col]} onClick={openJuridica}>Ver</button>
                                        <button className="btn btn-sm btn-danger mx-3" id={juridicas[key][col]} onClick={deleteJuridica}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
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
