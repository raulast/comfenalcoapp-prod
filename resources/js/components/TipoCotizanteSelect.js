import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function TipoCotizanteSelect(props) {
    const [tcs, setTc] = useState([])
    
    const getTc = () => {
        let url = 'list/tiposCotizante'
        Axios.get(url)
            .then(resp => {
                setTc(resp.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
   
    const handleTcChange = (e) => {
        props.handleChange(e)
    }
    useEffect(getTc, [])

    return (

        <div>
            <select onChange={handleTcChange} className="form-control form-control-sm"  name="tipoCotizante" >
                <option value=""></option>
                {
                    tcs.map(tc => <option key={tc.id} value={tc.codigo}>{tc.descripcion}</option>)
                }
            </select>
        </div>

    )
}