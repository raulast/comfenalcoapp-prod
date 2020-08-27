import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function EspecialidadesSelect(props) {
    const [esps, setEsp] = useState([])
    
    const getEsp = () => {
        let url = 'list/especialidades'
        Axios.get(url)
            .then(resp => {
                setEsp(resp.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
   
    const handleEspChange = (e) => {
        props.handleChange(e)
    }
    useEffect(getEsp, [])

    return (

        <div>
            <select onChange={handleEspChange} className="form-control form-control-sm"  name="especialidad" >
                <option value={0}></option>
                {
                    esps.map(esp => <option key={esp.id} value={esp.id}>{esp.especialidad}</option>)
                }
            </select>
        </div>

    )
}