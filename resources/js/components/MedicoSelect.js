import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function MedicoSelect(props) {
    const [medicos, setMedicos] = useState([])
    
    const getMedicos = () => {
        let url = 'list/medicos'
        Axios.get(url)
            .then(resp => {
                setMedicos(resp.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
   
    const handleMedicosChange = (e) => {
        props.handleChange(e)
    }
    useEffect(getMedicos, [])

    return (

        <div>
            <select onChange={handleMedicosChange} className="form-control form-control-sm"  name="medico" >
                <option value={0}></option>
                {
                    medicos.map(medico => <option key={medico.id} value={medico.id}>{medico.nombre}</option>)
                }
            </select>
        </div>

    )
}