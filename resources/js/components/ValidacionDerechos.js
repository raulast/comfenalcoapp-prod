import React from 'react'
import Axios from 'axios'
import { size } from 'lodash';

function validarEstadoa(afiliacion) {
    let estadoa = afiliacion.Estado;
    if (estadoa == "0") {
        afiliacion=validarDescripcionp(afiliacion)
    }
    else {
        afiliacion["Incapacidad"] = "NO";
    }
    return afiliacion;
}
function validarDescripcionp(afiliacion){
    var clasea = afiliacion.ClaseAfiliacion;
    var descripcion = afiliacion.DescripcionPrograma;
    let url = '/validacionDescripcion/' + clasea + "/" + descripcion;
    axios
        .get(url, {
            clasea: clasea,
            descripcion: descripcion,
        })
        .then(response => {
            //console.log(response.data);
            if (response.data==1){
                afiliacion["Incapacidad"]="SI"
            }
            else{
                afiliacion["Incapacidad"] = "NO";
            }
        });
    return afiliacion;

}
export default async function ValidacionDerechos(tipoDocumento, numeroIdentificacion) {
    // console.log(tipoDocumento);
    //console.log(numeroIdentificacion);
    let url = '/validacionDerechos/' + tipoDocumento + "/" + numeroIdentificacion;
    axios
        .get(url, {
            tipoDocumento: tipoDocumento,
            numeroIdentificacion: numeroIdentificacion
        })
        .then(response => {
            // console
            //console.log(response);

            //let mensaje = response.data.responseMessageOut.body.response.validadorResponse.Derechos['MENSAJE'];
            //let derecho = response.data.responseMessageOut.body.response.validadorResponse.Derechos['DerechoPrestacion']
            let afiliaciones = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado;
            //console.log(derecho);
            //console.log(mensaje);
            //console.log(afiliaciones);
            //console.log(Array.isArray(afiliaciones));

            let validaciones = [];

            if (Array.isArray(afiliaciones) == false) {
                afiliacion = afiliaciones
                afiliacion = validarEstadoa(afiliacion);
                validaciones.push(afiliacion)
            }
            else {
                for (var i=0;i< size(afiliaciones);i++) {
                    //console.log(afiliaciones[i]);
                    var afiliacion = validarEstadoa(afiliaciones[i]);
                    validaciones.push(afiliacion)
                }
            }
            
            console.log(validaciones);
            return (validaciones);
            
            /*
            if (derecho =="SI"){
            
                   
                    //console.log(response.data.responseMessageOut.body.response.validadorResponse);
                    let nombre = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['Nombre'];
                    let primerApellido = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['PrimerApellido']; 
                    let segundoApellido = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['SegundoApellido'];
                    let nombreCompleto = `${nombre} ${primerApellido} ${segundoApellido}`;

                    let tipoDocAfiliado = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['TipoDocAfiliado'];
                    let IDTrabajador = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['IDTrabajador'];
                    
                    let historiaClinica = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['IdHistoria12'];
                    let genero = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['Sexo'];
                    let estado = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['EstadoDescripcion'];
                    let tipoCotizante = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['ClaseAfiliacion'];
                    let descripcionPrograma = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['DescripcionPrograma'];

                    //datos aportante
                    let tipoDocAportante = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['TipoDocEmpresa'];
                    let numDocAportante = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['IDEmpresa'];
                    let nombreAportante = response.data.responseMessageOut.body.response.validadorResponse.DsAfiliado.Afiliado['NombreEmpresa'];
                    // set state
                    /*
                    this.setState({
                        nombreCompleto: nombreCompleto,
                        tipoDocAfiliado : tipoDocAfiliado,
                        IDTrabajador : IDTrabajador,
                        historiaClinica : historiaClinica,
                        mensaje : mensaje,
                        genero : genero,
                        estado : estado,
                        tipoCotizante: tipoCotizante,
                        descripcionPrograma: descripcionPrograma,
                        tipoDocAportante: tipoDocAportante,
                        numDocAportante: numDocAportante,
                        nombreAportante:nombreAportante,
                        tipoMensaje: 'success',
                        visible:'visible',
                        loading:true,
                    });

            }
            else{
                this.setState({
                    mensaje : mensaje,
                    loading: true,
                    tipoMensaje: 'error',
                });
            }*/
        });
        

}