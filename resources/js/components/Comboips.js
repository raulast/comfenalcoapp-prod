import React,{ useState, useEffect} from 'react'
import Axios from 'axios'

export default function Comboips(props){
    const [ipss,setIpss]= useState([])
    const [nitIps,setnitIps] = useState();
    const [codigoHabilitacion,setCodigo] = useState();
    const getIpss = () => {
        let url ='list/ips'
        Axios.get(url)
            .then(resp => {
                setIpss(resp.data.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }
    const putnitIps = (v) => {
        let nitIps = ipss[v].nit
        setnitIps(nitIps)
    }
    const putCodigo = (v) => {
        let codigoHabilitacion = ipss[v].cod_habilitacion
        setCodigo(codigoHabilitacion)
    }
    const handleIpsChange = (e) => {
        //props.handleIpsChange(e)
        console.log(e.target.value)
        putnitIps(e.target.value)
        putCodigo(e.target.value)
    }
    useEffect(getIpss,[])

    const handlePrestadorChange = (e) =>{
        console.log(e.target.value)
        props.handlePrestador(e.target.value)
    }

    return(
        <div className="row">
            <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="tipoPrestador">Tipo de prestador</label>
                                            <select id="tipoPrestador" className="form-control" onChange={handlePrestadorChange}>
                                                <option value=""></option>
                                                <option value="1">IPS</option>
                                                <option value="2">Consultorio</option>
                                            </select>
                                        </div>
                                    </div>
            <div className="col-sm-4">
                <div className="form-group">
                    <label htmlFor="tipoPrestador">IPS</label>
                    <select onChange={handleIpsChange} className="form-control">
                        <option value={0}></option>
                        {
                            ipss.map(ips => <option key={ips.id} value={ips.id}>{ips.nombre_sede}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label htmlFor="nitIPS">Nit IPS</label>
                    <input type="text" id="nitIPS" className="form-control" value={nitIps} readOnly  />
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label htmlFor="codigoHabilitacion">Código Habilitación IPS</label>
                    <input type="text" id="codigoHabilitacion" className="form-control" value={codigoHabilitacion} readOnly  />
                </div>
            </div>    
        </div>
    )
}