import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function EstadoSelect(props) {
    const [tcs, setTc] = useState([])
    
    const getTc = () => {
        let url = 'list/estados'
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
            <select onChange={handleTcChange} className="form-control form-control-sm"  name="estado" >
                <option value=""></option>
                {
                    tcs.map(tc => <option key={tc.id} value={tc.id}>{tc.estado}</option>)
                }
            </select>
        </div>

    )
}