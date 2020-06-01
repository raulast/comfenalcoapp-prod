import React,{ useState, useEffect} from 'react'
import Axios from 'axios'

export default function Combocausae(props){
    const [causas,setCausas]= useState([])
    
    const getCausas = () => {
        let url ='list/causas'
        Axios.get(url)
            .then(resp => {
                setCausas(resp.data.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }
   
    /*
    const handleIpsChange = (e) => {
        //props.handleIpsChange(e)
        console.log(e.target.value)
        putnitIps(e.target.value)
        putCodigo(e.target.value)
    }*/
    const handleCausa = (e) => {
        //console.log(e.target.value)
        props.handleCausa(e.target.value)
    }
    useEffect(getCausas,[])

    return(
        <div className="form-group">
            <label htmlFor="causaExterna">Causa externa</label>
            <select id="causaExterna" className="form-control" onChange={handleCausa} value={props.value}>
            
                <option value={0}></option>
                {
                    causas.map(causa => <option key={causa.id} value={causa.id}>{causa.causa_externa}</option>)
                }
            </select>
            <div className={props.error}>
                <div className={ "invalid-feedback  " + ( props.error || "") }>{ props.mensaje}</div>
            </div>
        </div>
    )
}