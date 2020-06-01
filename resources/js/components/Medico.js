import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function Medico(props) {
    const [tipoDocumento, setTipo] = useState()
    const [numDocumento, setNumero] = useState();
    const [nombre, setNombre] = useState();
    const [registro, setRegistro] = useState();
    const [especialidad, setEspecialidad] = useState();

    const getMedico = () => {
        let url = 'datosMedico'
        Axios.get(url)
            .then(resp => {
                setTipo(resp.data.data[0]['tipo_documento'])
                setNumero(resp.data.data[0]['num_documento'])
                setNombre(resp.data.data[0]['nombre'])
                setRegistro(resp.data.data[0]['reg_medico'])
                setEspecialidad(resp.data.data[0]['especialidad'])
                props.handleMedico(resp.data.data[0]['id'])
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(getMedico, [])

    return (
        <div className="row">

            <div className="col-sm-3">
                <div className="form-group">
                    <label htmlFor="tipoDocumentoMedico">Tipo documento</label>
                    <input type="text" id="tipoDocumentoMedico" className="form-control" defaultValue={ tipoDocumento} readOnly/>
                </div>
            </div>

            <div className="col-sm-3">
                <div className="form-group">
                    <label htmlFor="numeroIdentificacionMedico">Número de identificacion</label>
                    <input type="text" id="numeroIdentificacionMedico" className="form-control" defaultValue={ numDocumento} readOnly/>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label htmlFor="nombreMedico">Nombre completo</label>
                    <input type="text" id="nombreMedico" className="form-control" defaultValue={ nombre} readOnly />
                </div>
            </div>
        

            <div className="col-sm-3">
                <div className="form-group">
                    <label htmlFor="noRegistroMedico">Número de registro médico</label>
                    <input type="text" id="noRegistroMedico" className="form-control" defaultValue={ registro} readOnly/>
                </div>
            </div>


            <div className="col-sm-4">
                <div className="form-group">
                    <label htmlFor="especialidadMedica">Especialidad médica</label>
                    <select id="especialidadMedica" className="form-control" value={ especialidad} readOnly >
                        <option value="0"></option>
                        <option value="1">Medicina general</option>
                    </select>
                </div>
            </div>

        </div> 
    )
}