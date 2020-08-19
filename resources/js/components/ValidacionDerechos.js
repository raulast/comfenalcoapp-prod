import React from 'react'
import axios from 'axios'
import { size } from 'lodash';



export default async function ValidacionDerechos(tipoDocumento, numeroIdentificacion) {
    var result = [];
    
    let url = '/validacionDerechos/' + tipoDocumento + "/" + numeroIdentificacion;
   
    
    await axios
        .get(url, {
            tipoDocumento: tipoDocumento,
            numeroIdentificacion: numeroIdentificacion
        })
        .then(response => {
            // console
            console.log(response);

            let mensaje = response.data.responseMessageOut.body.response.validadorResponse.Derechos['MENSAJE'];
            let derecho = response.data.responseMessageOut.body.response.validadorResponse.Derechos['DerechoPrestacion']
            
            if (derecho == "SI"){
            
                let afiliaciones = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado;
                //console.log(derecho);
                //console.log(mensaje);
                //console.log(afiliaciones);
                //console.log(Array.isArray(afiliaciones));

                let validaciones = [];

                if (Array.isArray(afiliaciones) == false) {
                    afiliaciones = [afiliaciones]    
                }
            
                let incapacidades = [];
                let promises = [];
                for (var i = 0; i < size(afiliaciones); i++) {
                    var afiliacion = afiliaciones[i];
                    var clasea = afiliacion.ClaseAfiliacion;
                    var estado = afiliacion.Estado;
                    var descripcion = afiliacion.DescripcionPrograma;
                    var programa = afiliacion.IdPrograma 
                    if(typeof afiliacion.NombreEmpresa === 'object' ){
                       afiliacion.NombreEmpresa=''
                    }
                    if(typeof afiliacion.IDEmpresa === 'object' ){
                        afiliacion.IDEmpresa='N/A'
                    }
                    /*
                    if (Object.keys(afiliacion.NombreEmpresa).length ===0){
                        afiliacion.NombreEmpresa=''
                    }
                    if (Object.keys(afiliacion.IDEmpresa).length ===0){
                        afiliacion.IDEmpresa=''
                    }*/
                    let url = '/validacionDescripcion/'+ estado + "/" + clasea + "/" + programa;
                    promises.push(
                        axios.get(url).then(response => {
                            // do something with response
                            incapacidades.push(response.data);
                        })
                    )

                }
                Promise.all(promises).then(() => {

                    //console.log(incapacidades)
                    for (var i = 0; i < size(afiliaciones); i++) {
                        if (incapacidades[i] == 0) {
                            afiliaciones[i]["Incapacidad"] = "NO"
                        }
                        if (incapacidades[i] == 1) {
                            afiliaciones[i]["Incapacidad"] = "SI"
                        }
                    }
                    //console.log(incapacidades,response,afiliaciones)
                    result=[incapacidades,response,afiliaciones] 
                    
                    /*this.setState({
                        validaciones: afiliaciones
                    });
                    this.activarGeneracion(incapacidades, response,afiliaciones)*/
                });

                //console.log(this.state.validaciones);
            }
            else{
                /*
                this.setState({
                    mensaje : mensaje,
                    loading: true,
                    tipoMensaje: 'error',
                });
                */
               result = "NO"
            }     
            return result;                
    });
    
   
}