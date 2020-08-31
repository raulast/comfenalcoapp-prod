import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function IpsSelect(props) {
    const [ipss, setIpss] = useState([])
    
    const getIpss = () => {
        let url = 'list/ips'
        Axios.get(url)
            .then(resp => {
                setIpss(resp.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
   
    const handleIpsChange = (e) => {
        props.handleChange(e)
    }
    useEffect(getIpss, [])

    return (

        <div>
            <select onChange={handleIpsChange} className="form-control form-control-sm"  name="ips" >
                <option value=""></option>
                {
                    ipss.map(ips => <option key={ips.id} value={ips.id}>{ips.nombre_sede}</option>)
                }
            </select>
        </div>

    )
}