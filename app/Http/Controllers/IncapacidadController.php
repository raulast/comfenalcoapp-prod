<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Descripcionesp;
use App\Clasesa;
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
       //return '{"responseMessageOut":{"header":{"invokerDateTime":"2020-05-26 15:50:56","moduleId":"CHATBOTEPS","systemId":"CHATBOTEPS","messageId":"CHATBOTEPS |80197028|CC","logginData":{"sourceSystemId":"NA","destinationSystemId":"NA"},"destination":{"namespace":"http:\/\/co\/com\/comfenalcovalle\/esb\/ws\/ValidadorServiciosEps","name":"ValidadorServiciosEps","operation":"execute"},"responseStatus":{"statusCode":"SUCCESS"}},"body":{"response":{"validadorResponse":{"xsi":"http:\/\/www.w3.org\/2001\/XMLSchema-instance","Derechos":{"DerechoPrestacion":"NO","Programa":"EP","DescripcionPrograma":"Por plan de beneficios de salud","MENSAJE":"El usuario con tipo CC y numero 80197028 NO tiene derecho a prestación de servicios, Por plan de beneficios de salud"},"DsAfiliado":{},"DsSede":{"Sede":{"Observaciones":"No se encontraron registros"},"SedeAtencion":{"Observaciones":"No se encontraron registros"}},"DsGrupoFamiliar":{"Beneficiario":{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"80197028","EstadoCaja":"NA","EstadoPOS":"RE","EstadoPCO":"NA","Nombre":"JUAN FERNANDO","PrimerApellido":"GUERRA","SegundoApellido":"CAMARGO","Sexo":"M","TidTrabajador":"1","IDTrabajador":"80197028"}}}}}}}';

        //respuesta correcta   
        //return '{"responseMessageOut":{"header":{"invokerDateTime":"2020-05-30 17:58:48","moduleId":"CHATBOTEPS","systemId":"CHATBOTEPS","messageId":"CHATBOTEPS |16449455|CC","logginData":{"sourceSystemId":"NA","destinationSystemId":"NA"},"destination":{"namespace":"http:\/\/co\/com\/comfenalcovalle\/esb\/ws\/ValidadorServiciosEps","name":"ValidadorServiciosEps","operation":"execute"},"responseStatus":{"statusCode":"SUCCESS"}},"body":{"response":{"validadorResponse":{"xsi":"http:\/\/www.w3.org\/2001\/XMLSchema-instance","Derechos":{"DerechoPrestacion":"SI","Programa":"EP","DescripcionPrograma":"Por plan de beneficios de salud","MENSAJE":"El usuario con tipo CC y numero 16449455 SI tiene derecho a prestación de servicios, Por plan de beneficios de salud"},"DsAfiliado":{"Afiliado":{"EstadoDescripcion":"Afiliado","TipoDocAfiliado":"CC","TipoDocEmpresa":"NI","TipoDocTrabajador":"CC","NombreDepartamento":"VALLE","NombreMunicipio":"YUMBO","TidTrabajador":"1","IDTrabajador":"16449455","Nombre":"MANUEL ANTONIO","PrimerApellido":"SALCEDO","SegundoApellido":"POVEDA","FechaNacimiento":"1961-02-04T00:00:00","Estrato":"1","Sexo":"M","IDEmpresa":"830511993","TidEmpresa":"2","SedeCapita":"SERSALUD S.A - SEDE YUMBO","IdAfiliado":"16449455","TIdAfiliado":"1","FechaAfiliacion":"2019-07-08T00:00:00","Estado":"0","IdEntidad":"12","Direccion":"CL 1 B ESTE 3CU 03","Telefono":"6933873","NombreEmpresa":"NUCLEO S.A","Telefono2":{},"IdCapita":"805025846","IdMunicipio":"76892","EstadoCivil":"SO","IdUnico":"6052103532445721","email":{},"FechaAfiliacionSSS":{},"Programa":"EP","IdPrograma":"121201","DescripcionPrograma":"Dependiente","IdRegional":"16","DiasCotizados":{},"IdArp":"15","IdDiscapacidad":{},"DirEmpresa":"CR 12 8 46","IdHistoria09":{},"IdHistoria12":"101658249","FechaDesafiliacion":"0","IdConyuge":"6089933260318791","CabezaFamilia":"S","NombreTrabajador":"MANUEL ANTONIO SALCEDO POVEDA","Principal":"S","IdBarrio":"0","FechaRetiro":"0","PorcentajeDescuento":{},"TipoDescuento":{},"IdIpsCapita":"16007","SemCotSSS":"0","ClaseAfiliacion":"COT","CodigoRegional":"16"}},"DsSede":{"Sede":[{"NitEntidad":"805026250","Descripcion":"CL.SIGMA S.YUMBO"},{"NitEntidad":"890307534","Descripcion":"OPTOMETRIA YUMBO"}],"SedeAtencion":{"IdSedeAtencion":"805025846","SedeAtencion":"SERSALUD S.A - SEDE YUMBO","CodSedeAtencion":"16007"}},"DsGrupoFamiliar":{"Beneficiario":[{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"16449455","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"MANUEL ANTONIO","PrimerApellido":"SALCEDO","SegundoApellido":"POVEDA","Sexo":"M","TidTrabajador":"1","IDTrabajador":"16449455"},{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"29820286","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"OLGA DORA","PrimerApellido":"PATINO","SegundoApellido":"QUINTERO","Sexo":"F","TidTrabajador":"1","IDTrabajador":"16449455"},{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"TI","TIdBeneficiario":"3","IDBeneficiario":"1104825934","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"JHON STEVEN","PrimerApellido":"GIRALDO","SegundoApellido":"PATINO","Sexo":"M","TidTrabajador":"1","IDTrabajador":"16449455"},{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"1118308000","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"JUAN CARLOS","PrimerApellido":"AGUIRRE","SegundoApellido":"PATINO","Sexo":"M","TidTrabajador":"1","IDTrabajador":"16449455"}]}}}}}}';
       //  return '{"responseMessageOut":{"header":{"invokerDateTime":"2020-07-28 15:56:11","moduleId":"CHATBOTEPS","systemId":"CHATBOTEPS","messageId":"CHATBOTEPS |29361924|CC","logginData":{"sourceSystemId":"NA","destinationSystemId":"NA"},"destination":{"namespace":"http:\/\/co\/com\/comfenalcovalle\/esb\/ws\/ValidadorServiciosEps","name":"ValidadorServiciosEps","operation":"execute"},"responseStatus":{"statusCode":"SUCCESS"}},"body":{"response":{"validadorResponse":{"xsi":"http:\/\/www.w3.org\/2001\/XMLSchema-instance","Derechos":{"DerechoPrestacion":"SI","Programa":"EP","DescripcionPrograma":"Por plan de beneficios de salud","MENSAJE":"El usuario con tipo CC y numero 29361924 SI tiene derecho a prestación de servicios, Por plan de beneficios de salud"},"DsAfiliado":{"Afiliado":{"EstadoDescripcion":"Afiliado","TipoDocAfiliado":"CC","TipoDocEmpresa":{},"TipoDocTrabajador":"CC","NombreDepartamento":"VALLE","NombreMunicipio":"CALI","TidTrabajador":"1","IDTrabajador":"29361924","Nombre":"CATHERINE MIGRETH","PrimerApellido":"SANCHEZ","SegundoApellido":"CASANOVA","FechaNacimiento":"1982-02-26T00:00:00","Estrato":"1","Sexo":"F","IDEmpresa":{},"TidEmpresa":{},"SedeCapita":"MODELO DE ATENCION DE SALUD SERVIMEDIC QUIRON LTDA","IdAfiliado":"29361924","TIdAfiliado":"1","FechaAfiliacion":"2020-07-17T00:00:00","Estado":"0","IdEntidad":"12","Direccion":"CR 98 A 42 85","Telefono":"3276471","NombreEmpresa":{},"Telefono2":{},"IdCapita":"900014785","IdMunicipio":"76001","EstadoCivil":"SO","IdUnico":"9999022619351478","email":"CATHESTEVEN@HOTMAIL.COM","FechaAfiliacionSSS":{},"Programa":"EP","IdPrograma":"121259","DescripcionPrograma":"Independiente Contrato de Prestación","IdRegional":"1","DiasCotizados":{},"IdArp":{},"IdDiscapacidad":{},"DirEmpresa":{},"IdHistoria09":{},"IdHistoria12":"158551","FechaDesafiliacion":"0","IdConyuge":{},"CabezaFamilia":{},"NombreTrabajador":"CATHERINE MIGRETH SANCHEZ CASANOVA","Principal":"S","IdBarrio":"0","FechaRetiro":"0","PorcentajeDescuento":{},"TipoDescuento":{},"IdIpsCapita":"14029","SemCotSSS":"0","ClaseAfiliacion":"COT","CodigoRegional":"1"}},"DsSede":{"Sede":[{"NitEntidad":"800168722","Descripcion":"LA OPTICA S.SUR"},{"NitEntidad":"805023423","Descripcion":"SEDE SUR - SERVIQUIRON"},{"NitEntidad":"890307534","Descripcion":"OPTOMETRIA S.SUR"},{"NitEntidad":"900014785","Descripcion":"SERVIMEDIC QUIRON"},{"NitEntidad":"900127525","Descripcion":"CIC-VITAL S.SUR"}],"SedeAtencion":{"IdSedeAtencion":"900014785","SedeAtencion":"MODELO DE ATENCION DE SALUD SERVIMEDIC QUIRON LTDA","CodSedeAtencion":"14029"}},"DsGrupoFamiliar":{"Beneficiario":[{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"CC","TIdBeneficiario":"1","IDBeneficiario":"29361924","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"CATHERINE MIGRETH","PrimerApellido":"SANCHEZ","SegundoApellido":"CASANOVA","Sexo":"F","TidTrabajador":"1","IDTrabajador":"29361924"},{"TipoDocTrabajador":"CC","TipoDocBeneficiario":"RC","TIdBeneficiario":"7","IDBeneficiario":"1108259584","EstadoCaja":"NA","EstadoPOS":"AF","EstadoPCO":"NA","Nombre":"MATHIAS ","PrimerApellido":"RAMIREZ","SegundoApellido":"SANCHEZ","Sexo":"M","TidTrabajador":"1","IDTrabajador":"29361924"}]}}}}}}';
        //respuesta varios
       /*return '{
            "responseMessageOut": {
                "header": {
                    "invokerDateTime": "2020-07-26 10:46:54",
                    "moduleId": "CHATBOTEPS",
                    "systemId": "CHATBOTEPS",
                    "messageId": "CHATBOTEPS |16626278|CC",
                    "logginData": {
                        "sourceSystemId": "NA",
                        "destinationSystemId": "NA"
                    },
                    "destination": {
                        "namespace": "http://co/com/comfenalcovalle/esb/ws/ValidadorServiciosEps",
                        "name": "ValidadorServiciosEps",
                        "operation": "execute"
                    },
                    "responseStatus": {
                        "statusCode": "SUCCESS"
                    }
                },
                "body": {
                    "response": {
                        "validadorResponse": {
                            "xsi": "http://www.w3.org/2001/XMLSchema-instance",
                            "Derechos": {
                                "DerechoPrestacion": "SI",
                                "Programa": "EP",
                                "DescripcionPrograma": "Por plan de beneficios de salud",
                                "MENSAJE": "El usuario con tipo CC y numero 16626278 SI tiene derecho a prestaciÃ³n de servicios, Por plan de beneficios de salud"
                            },
                            "DsAfiliado": {
                                "Afiliado": [
                                    {
                                        "EstadoDescripcion": "Afiliado",
                                        "TipoDocAfiliado": "CC",
                                        "TipoDocEmpresa": "NI",
                                        "TipoDocTrabajador": "CC",
                                        "NombreDepartamento": "VALLE",
                                        "NombreMunicipio": "CALI",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278",
                                        "Nombre": "JUAN CARLOS",
                                        "PrimerApellido": "LUNA",
                                        "SegundoApellido": "CUELLAR",
                                        "FechaNacimiento": "1959-03-20T00:00:00",
                                        "Estrato": "2",
                                        "Sexo": "M",
                                        "IDEmpresa": "900336004",
                                        "TidEmpresa": "2",
                                        "SedeCapita": "MODELO DE ATENCION DE SALUD CIS EMCALI",
                                        "IdAfiliado": "16626278",
                                        "TIdAfiliado": "1",
                                        "FechaAfiliacion": "2019-09-01T00:00:00",
                                        "Estado": "0",
                                        "IdEntidad": "12",
                                        "Direccion": "CL 20 118 235 T2 APT 508",
                                        "Telefono": "3396742",
                                        "NombreEmpresa": "ADMINISTRADORA COLOMBIANA DE PENSIONES COLPENSIONES",
                                        "Telefono2": {},
                                        "IdCapita": "890303093",
                                        "IdMunicipio": "76001",
                                        "EstadoCivil": "CA",
                                        "IdUnico": "9999022619003651",
                                        "email": "JCLUNA57@HOTMAIL.COM",
                                        "FechaAfiliacionSSS": {},
                                        "Programa": "EP",
                                        "IdPrograma": "121205",
                                        "DescripcionPrograma": "Pensionado",
                                        "IdRegional": "1",
                                        "DiasCotizados": {},
                                        "IdArp": {},
                                        "IdDiscapacidad": {},
                                        "DirEmpresa": "CRA 10 N 72  33 TO B",
                                        "IdHistoria09": {},
                                        "IdHistoria12": "179870",
                                        "FechaDesafiliacion": "0",
                                        "IdConyuge": "9999022620123312",
                                        "CabezaFamilia": "S",
                                        "NombreTrabajador": "JUAN CARLOS LUNA CUELLAR",
                                        "Principal": "S",
                                        "IdBarrio": "0",
                                        "FechaRetiro": "0",
                                        "PorcentajeDescuento": {},
                                        "TipoDescuento": {},
                                        "IdIpsCapita": "2024",
                                        "SemCotSSS": "1152",
                                        "ClaseAfiliacion": "COT",
                                        "CodigoRegional": "1"
                                    },
                                    {
                                        "EstadoDescripcion": "Afiliado",
                                        "TipoDocAfiliado": "CC",
                                        "TipoDocEmpresa": {},
                                        "TipoDocTrabajador": "CC",
                                        "NombreDepartamento": "VALLE",
                                        "NombreMunicipio": "CALI",
                                        "IDEmpresa": "N/A",
                                        "TidEmpresa": "N/A",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278",
                                        "Nombre": "JUAN CARLOS",
                                        "PrimerApellido": "LUNA",
                                        "SegundoApellido": "CUELLAR",
                                        "FechaNacimiento": "1959-03-20T00:00:00",
                                        "Estrato": "2",
                                        "Sexo": "M",
                                        "SedeCapita": "MODELO DE ATENCION DE SALUD CIS EMCALI",
                                        "IdAfiliado": "16626278",
                                        "TIdAfiliado": "1",
                                        "FechaAfiliacion": "2020-01-29T00:00:00",
                                        "Estado": "0",
                                        "IdEntidad": "12",
                                        "Direccion": "CL 20 118 235 T2 APT 508",
                                        "Telefono": "3396742",
                                        "Telefono2": {},
                                        "IdCapita": "890303093",
                                        "IdMunicipio": "76001",
                                        "EstadoCivil": "CA",
                                        "IdUnico": "9999022619003651",
                                        "email": "JCLUNA57@HOTMAIL.COM",
                                        "FechaAfiliacionSSS": {},
                                        "Programa": "EP",
                                        "IdPrograma": "121259",
                                        "DescripcionPrograma": "Independiente Contrato de PrestaciÃ³n",
                                        "IdRegional": "2",
                                        "DiasCotizados": {},
                                        "IdArp": {},
                                        "IdDiscapacidad": {},
                                        "IdHistoria09": {},
                                        "IdHistoria12": "179870",
                                        "FechaDesafiliacion": "0",
                                        "IdConyuge": "9999022620123312",
                                        "CabezaFamilia": "S",
                                        "NombreTrabajador": "JUAN CARLOS LUNA CUELLAR",
                                        "Principal": "S",
                                        "IdBarrio": "0",
                                        "FechaRetiro": "0",
                                        "PorcentajeDescuento": {},
                                        "TipoDescuento": {},
                                        "IdIpsCapita": "2024",
                                        "SemCotSSS": "1152",
                                        "ClaseAfiliacion": "COT",
                                        "CodigoRegional": "2"
                                    }
                                ]
                            },
                            "DsSede": {
                                "Sede": [
                                    {
                                        "NitEntidad": "800168722",
                                        "Descripcion": "LA OPTICA EMCALI"
                                    },
                                    {
                                        "NitEntidad": "890307534",
                                        "Descripcion": "OPTOMETRIA EMCALI"
                                    },
                                    {
                                        "NitEntidad": "900127525",
                                        "Descripcion": "CIC-VITAL EMCAL"
                                    },
                                    {
                                        "NitEntidad": "900612531",
                                        "Descripcion": "SEDE EMCALI"
                                    }
                                ],
                                "SedeAtencion": {
                                    "IdSedeAtencion": "890303093",
                                    "SedeAtencion": "MODELO DE ATENCION DE SALUD CIS EMCALI",
                                    "CodSedeAtencion": "2024"
                                }
                            },
                            "DsGrupoFamiliar": {
                                "Beneficiario": [
                                    {
                                        "TipoDocTrabajador": "CC",
                                        "TipoDocBeneficiario": "CC",
                                        "TIdBeneficiario": "1",
                                        "IDBeneficiario": "16626278",
                                        "EstadoCaja": "NA",
                                        "EstadoPOS": "AF",
                                        "EstadoPCO": "NA",
                                        "Nombre": "JUAN CARLOS",
                                        "PrimerApellido": "LUNA",
                                        "SegundoApellido": "CUELLAR",
                                        "Sexo": "M",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278"
                                    },
                                    {
                                        "TipoDocTrabajador": "CC",
                                        "TipoDocBeneficiario": "CC",
                                        "TIdBeneficiario": "1",
                                        "IDBeneficiario": "30038121",
                                        "EstadoCaja": "NA",
                                        "EstadoPOS": "AF",
                                        "EstadoPCO": "NA",
                                        "Nombre": "MARIA ELENA",
                                        "PrimerApellido": "MARTINEZ",
                                        "SegundoApellido": {},
                                        "Sexo": "F",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278"
                                    },
                                    {
                                        "TipoDocTrabajador": "CC",
                                        "TipoDocBeneficiario": "CC",
                                        "TIdBeneficiario": "1",
                                        "IDBeneficiario": "31915457",
                                        "EstadoCaja": "NA",
                                        "EstadoPOS": "AF",
                                        "EstadoPCO": "NA",
                                        "Nombre": "PATRICIA ",
                                        "PrimerApellido": "MARTINEZ",
                                        "SegundoApellido": {},
                                        "Sexo": "F",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278"
                                    },
                                    {
                                        "TipoDocTrabajador": "CC",
                                        "TipoDocBeneficiario": "TI",
                                        "TIdBeneficiario": "3",
                                        "IDBeneficiario": "1006100013",
                                        "EstadoCaja": "NA",
                                        "EstadoPOS": "AF",
                                        "EstadoPCO": "NA",
                                        "Nombre": "MARIA JULIANA",
                                        "PrimerApellido": "LUNA",
                                        "SegundoApellido": "MARTINEZ",
                                        "Sexo": "F",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278"
                                    },
                                    {
                                        "TipoDocTrabajador": "CC",
                                        "TipoDocBeneficiario": "CC",
                                        "TIdBeneficiario": "1",
                                        "IDBeneficiario": "1144057372",
                                        "EstadoCaja": "NA",
                                        "EstadoPOS": {},
                                        "EstadoPCO": "NA",
                                        "Nombre": "ANA MARIA",
                                        "PrimerApellido": "LUNA",
                                        "SegundoApellido": "MARTINEZ",
                                        "Sexo": "F",
                                        "TidTrabajador": "1",
                                        "IDTrabajador": "16626278"
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }';*/
        
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
    public function validacionD($clasea,$descripcion){
      
         
        $claseid = Clasesa::where('abbr',$clasea)->first()->id;
        $v = Descripcionesp::where('clases_afiliacion_id',$claseid)->where('descripcion',$descripcion)->exists();
        if ($v){
            $value = Descripcionesp::where('clases_afiliacion_id',$claseid)->where('descripcion',$descripcion)->first()->incapacidad;
            return $value;
        }
        else{
            $descripcion=utf8_decode($descripcion);
            $v = Descripcionesp::where('clases_afiliacion_id',$claseid)->where('descripcion',$descripcion)->exists();
            if ($v){
                $value = Descripcionesp::where('clases_afiliacion_id',$claseid)->where('descripcion',$descripcion)->first()->incapacidad;
                return $value;
            }
            else{
                return 0;
            }
        }
        
        
        
       
    }
}
