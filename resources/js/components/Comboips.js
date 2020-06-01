import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function Comboips(props) {
    const [ipss, setIpss] = useState([])
    const [nitIps, setnitIps] = useState();
    const [codigoHabilitacion, setCodigo] = useState();
    const [ips, setIps] = useState(0);
    const [visible, setVisible] = useState('oculto')
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
    const putIps = (v) => {
        let ips = ipss[v-1].id
        //console.log(ips);
        setIps(ips)
    }
    const putnitIps = (v) => {
        let nitIps = ipss[v-1].nit
        console.log(v-1)
        console.log(nitIps)
        setnitIps(nitIps)
    }
    const putCodigo = (v) => {
        let codigoHabilitacion = ipss[v-1].cod_habilitacion
        setCodigo(codigoHabilitacion)
    }

    const handleIpsChange = (e) => {
        //props.handleIpsChange(e)
        console.log(e.target.value)
       // console.log(ipss)
        putIps(e.target.value)
        putnitIps(e.target.value)
        putCodigo(e.target.value)
        props.handleIpsChange(e.target.value)

    }
    useEffect(getIpss, [])

    const handlePrestadorChange = (e) => {
        //console.log(e.target.value)
        props.handlePrestador(e.target.value)
        if (e.target.value == 1) {
            setVisible('visible');

        }
        else {
            setIps(0)
            props.handleIpsChange(0)
            setnitIps('')
            setCodigo('')
            setVisible('oculto');
        }
        //console.log(visible);
    }

    return (

        <div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="tipoPrestador">Tipo de prestador</label>
                        <select id="tipoPrestador" className="form-control" onChange={handlePrestadorChange} >
                            <option value=""></option>
                            <option value="1">IPS</option>
                            <option value="2">Consultorio</option>
                        </select>
                        <div className={props.error}>
                            <div className={ "invalid-feedback  " + ( props.error || "") }>{ props.mensaje}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={visible}>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="tipoPrestador">IPS</label>
                            <select onChange={handleIpsChange} className="form-control"  >
                                <option value={0}></option>
                                {
                                    ipss.map(ips => <option key={ips.id} value={ips.id}>{ips.nombre_sede}</option>)
                                }
                            </select>
                            <div className={props.errorIps}>
                                <div className={ "invalid-feedback  " + ( props.errorIps || "") }>{ props.mensajeIps}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group">
                            <label htmlFor="nitIPS">Nit IPS</label>
                            <input type="text" id="nitIPS" className="form-control" value={nitIps} readOnly/>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group">
                            <label htmlFor="codigoHabilitacion">Código habilitación IPS</label>
                            <input type="text" id="codigoHabilitacion" className="form-control" value={codigoHabilitacion} readOnly />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}