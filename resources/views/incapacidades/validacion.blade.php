
<?php
/*

$tipoDocumento = "CC";
$numeroIdentificacion = "94490066";
*/
// dd($numeroIdentificacion);
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
?>