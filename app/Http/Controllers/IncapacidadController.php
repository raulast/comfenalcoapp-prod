<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IncapacidadController extends Controller
{
    //
    public function inicio(){
        return view('incapacidades.incapacidad');
    }
    public function validacion($tipo,$numero){
        
        $tipoDocumento = $tipo;
        $numeroIdentificacion = $numero;
        
       /*return view('incapacidades.validacion',[
            'tipoDocumento' => $tipoDocumento, 
            'numeroIdentificacion' => $numeroIdentificacion
            ]);*/
        //respuesta NO
       // return '{"responseMessageOut":{"header":{"invokerDateTime":"2020-05-26 15:50:56","moduleId":"CHATBOTEPS","systemId":"CHATBOTEPS","messageId":"CHATBOTEPS |80197028|CC","logginData":{"sourceSystemId":"NA","destinationSystemId":"NA"},"destination":{"namespace":"http:\/\/co\/com\/comfenalcovalle\/esb\/ws\/ValidadorServiciosEps","name":"ValidadorServiciosEps","operation":"execute"},"responseStatus":{"statusCode":"SUCCESS"}},"body":{"response":{"validadorResponse":{"xsi":"http:\/\/www.w3.org\/2001\/XMLSchema-instance","Derechos":{"DerechoPrestacion":"NO","Programa":"EP","DescripcionPrograma":"Por plan de beneficios de salud","MENSAJE":"El usuario con tipo CC y numero 80197028 NO tiene derecho a prestación de servicios, Por plan de beneficios de salud"},"DsAfiliado":{},"DsSede":{"Sede":{"Observaciones":"No se encontraron registros"},"SedeAtencion":{"Observaciones":"No se encontraron registros"}},"DsGrupoFamiliar":{"Beneficiario":{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"80197028","EstadoCaja":"NA","EstadoPOS":"RE","EstadoPCO":"NA","Nombre":"JUAN FERNANDO","PrimerApellido":"GUERRA","SegundoApellido":"CAMARGO","Sexo":"M","TidTrabajador":"1","IDTrabajador":"80197028"}}}}}}}';

        //respuesta correcta   
        return '{"responseMessageOut":{"header":{"invokerDateTime":"2020-05-30 17:58:48","moduleId":"CHATBOTEPS","systemId":"CHATBOTEPS","messageId":"CHATBOTEPS |16449455|CC","logginData":{"sourceSystemId":"NA","destinationSystemId":"NA"},"destination":{"namespace":"http:\/\/co\/com\/comfenalcovalle\/esb\/ws\/ValidadorServiciosEps","name":"ValidadorServiciosEps","operation":"execute"},"responseStatus":{"statusCode":"SUCCESS"}},"body":{"response":{"validadorResponse":{"xsi":"http:\/\/www.w3.org\/2001\/XMLSchema-instance","Derechos":{"DerechoPrestacion":"SI","Programa":"EP","DescripcionPrograma":"Por plan de beneficios de salud","MENSAJE":"El usuario con tipo CC y numero 16449455 SI tiene derecho a prestación de servicios, Por plan de beneficios de salud"},"DsAfiliado":{"Afiliado":{"EstadoDescripcion":"Afiliado","TipoDocAfiliado":"CC","TipoDocEmpresa":"NI","TipoDocTrabajador":"CC","NombreDepartamento":"VALLE","NombreMunicipio":"YUMBO","TidTrabajador":"1","IDTrabajador":"16449455","Nombre":"MANUEL ANTONIO","PrimerApellido":"SALCEDO","SegundoApellido":"POVEDA","FechaNacimiento":"1961-02-04T00:00:00","Estrato":"1","Sexo":"M","IDEmpresa":"830511993","TidEmpresa":"2","SedeCapita":"SERSALUD S.A - SEDE YUMBO","IdAfiliado":"16449455","TIdAfiliado":"1","FechaAfiliacion":"2019-07-08T00:00:00","Estado":"0","IdEntidad":"12","Direccion":"CL 1 B ESTE 3CU 03","Telefono":"6933873","NombreEmpresa":"NUCLEO S.A","Telefono2":{},"IdCapita":"805025846","IdMunicipio":"76892","EstadoCivil":"SO","IdUnico":"6052103532445721","email":{},"FechaAfiliacionSSS":{},"Programa":"EP","IdPrograma":"121201","DescripcionPrograma":"Dependiente","IdRegional":"16","DiasCotizados":{},"IdArp":"15","IdDiscapacidad":{},"DirEmpresa":"CR 12 8 46","IdHistoria09":{},"IdHistoria12":"101658249","FechaDesafiliacion":"0","IdConyuge":"6089933260318791","CabezaFamilia":"S","NombreTrabajador":"MANUEL ANTONIO SALCEDO POVEDA","Principal":"S","IdBarrio":"0","FechaRetiro":"0","PorcentajeDescuento":{},"TipoDescuento":{},"IdIpsCapita":"16007","SemCotSSS":"0","ClaseAfiliacion":"COT","CodigoRegional":"16"}},"DsSede":{"Sede":[{"NitEntidad":"805026250","Descripcion":"CL.SIGMA S.YUMBO"},{"NitEntidad":"890307534","Descripcion":"OPTOMETRIA YUMBO"}],"SedeAtencion":{"IdSedeAtencion":"805025846","SedeAtencion":"SERSALUD S.A - SEDE YUMBO","CodSedeAtencion":"16007"}},"DsGrupoFamiliar":{"Beneficiario":[{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"16449455","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"MANUEL ANTONIO","PrimerApellido":"SALCEDO","SegundoApellido":"POVEDA","Sexo":"M","TidTrabajador":"1","IDTrabajador":"16449455"},{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"29820286","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"OLGA DORA","PrimerApellido":"PATINO","SegundoApellido":"QUINTERO","Sexo":"F","TidTrabajador":"1","IDTrabajador":"16449455"},{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"TI","TIdBeneficiario":"3","IDBeneficiario":"1104825934","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"JHON STEVEN","PrimerApellido":"GIRALDO","SegundoApellido":"PATINO","Sexo":"M","TidTrabajador":"1","IDTrabajador":"16449455"},{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"1118308000","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"JUAN CARLOS","PrimerApellido":"AGUIRRE","SegundoApellido":"PATINO","Sexo":"M","TidTrabajador":"1","IDTrabajador":"16449455"}]}}}}}}';
        if ($numeroIdentificacion == "" || $tipoDocumento == "") {
            echo json_encode('error');
        }
        else{
                $hoy = date("Y-m-d H:i:s"); 
               
                $host = "https://virtual.comfenalcovalle.com.co/esbtest/V2RESTJSONChannelAdapter";
                $username = "INGENIOSE";
                $password = "1nG3n1o5e";
        
                $headers = array(
                    'Content-type: charset=iso-8859-1; charset=utf-8',
                    'Authorization: Basic '. base64_encode("$username:$password")
                );
                $payload = '{
                    "requestMessageOut": {
                    "header": {
                        "invokerDateTime": "'.$hoy.'",
                        "moduleId": "CHATBOTEPS",
                        "systemId": "CHATBOTEPS",
                        "messageId": "CHATBOTEPS |'.$numeroIdentificacion.'|'.$tipoDocumento.'",
                        "logginData": {
                        "sourceSystemId": "NA",
                        "destinationSystemId": "NA"
                        },
                        "destination": {
                        "namespace": "http://co/com/comfenalcovalle/esb/ws/ValidadorServiciosEps",
                        "name": "ValidadorServiciosEps",
                        "operation": "execute"
                        },
                        "securityCredential": {
                        "userName": "",
                        "userToken": ""
                        },
                        "classification": ""
                    },
                    "body": {
                        "request": {
                        "validadorRequest": {
                            "abreviatura":"'.$tipoDocumento.'",
                            "identificacion": "'.$numeroIdentificacion.'"
                        }
                        }
                    }
                    }
                }';
                //dd($payload);
                header("Content-type: charset=iso-8859-1");
                $process = curl_init($host);
                curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                curl_setopt($process, CURLOPT_HEADER, 0);
                curl_setopt($process, CURLOPT_USERPWD, $username . ":" . $password);
                curl_setopt($process, CURLOPT_TIMEOUT, 30);
                curl_setopt($process, CURLOPT_POST, 1);
                curl_setopt($process, CURLOPT_POSTFIELDS, $payload);
                curl_setopt($process, CURLOPT_ENCODING, "UTF-8" );
                curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                $return = curl_exec($process);
                
                curl_close($process);
            
                //finally print your API response
                echo utf8_encode($return);
        }
    }
}
