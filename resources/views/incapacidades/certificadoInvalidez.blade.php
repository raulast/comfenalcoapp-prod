
<!DOCTYPE html>
<html>
<head>
	<title>Certificado de Incapacidad</title>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
<style>	

.bg-white{
	background-color: white;

}
.spaced{
	padding: 10px;
}

.font-ten{
    font-size:10px;
}

.font-eleven{
	font-size: 11px;
	
}
.table{
    margin: 0 !important; 
}
tr td{
  padding: 1 !important;
  margin: 0 !important;
}
</style>   
</head>
<body class="bg-white font-eleven">

<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr>
            <td ><img  src="img/comfenalcovalle.png" width="50" height="17"></td>
            <td class="font-weight-bold">{{ $i["titulo"] }}</td>
        </table>
    </div>

</div>
<br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr>
            <td class="font-weight-bold">No. Certificado:</td><td>{{ $i["No"] }}</td>
            <td class="font-weight-bold">Fecha de expedición:</td><td>{{ $i["Fecha de expedicion"] }}</td>
            <td class="font-weight-bold">Ciudad: </td><td>{{  $i["ciudad"]}}</td>
            </tr>
        </table>
    </div>
</div>
<br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr>
            <td class="font-weight-bold">Nombre Prestador:</td><td>{{ $i["Nombre Prestador"] }}</td>
            <td class="font-weight-bold">Nit Prestador:</td><td>{{ $i["Nit Prestador"] }}</td>
           
            </tr>
        </table>
    </div>
</div>
<br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td class="font-weight-bold">DATOS AFILIADO</td>
            <tr>
        </table>
    </div>
</div>
<br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td class="font-weight-bold">Nombre Afiliado:</td><td>{{ $i["nombre"] }}</td>
            <td class="font-weight-bold">Id:</td><td>{{ $i["id"] }}</td>
            </tr>
        </table>
    </div>
</div>
<br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td class="font-weight-bold">Empresa donde labora:</td><td>{{ $i["empresa"] }}</td>
            <td class="font-weight-bold">Id:</td><td>{{ $i["nit"] }}</td>
            </tr>
        </table>
    </div>
</div>

<br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td class="font-weight-bold">DATOS CALIFICACIÓN PÉRDIDA DE CAPACIDAD LABORAL</td>
            <tr>
        </table>
    </div>
</div>
<br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td class="font-weight-bold">Fecha Dictámen:</td><td>{{ $i["fechad"] }}</td>
            <td class="font-weight-bold">Pérdida de capacidad laboral:</td><td>{{ $i["cpclo"] }}</td>
            </tr>
            <tr> 
            <td class="font-weight-bold">Origen:</td><td>{{ $i["origen"] }}</td>
            </tr>
            <tr> 
            <td class="font-weight-bold">Código CIE10 Diagnóstico principal:</td><td>{{ $i["codigo"] }}</td>
            </tr>
            <tr> 
            <td class="font-weight-bold">Fecha Estructuración:</td><td>{{ $i["fechae"] }}</td>
            <td class="font-weight-bold">Fecha de atención:</td><td>{{ $i["Fecha de expedicion"]  }}</td>
            </tr>
        </table>
    </div>
</div>
<br><br><br><br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td class="font-weight-bold">NOTA ACLARATORIA</td>
            <tr>
        </table>
    </div>
</div>
<br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td >Es importante manifestar, que la pensión ha de pagarse desde la fecha de definición del estado de invalidez, es decir, desde la fecha de estructuración de la misma y de manera retroactiva, razón por la cual no es pertinente seguir recibiendo subsidio económico por incapacidad, de acuerdo a: 
“Ley 100 de 1993. Artículo 40. Monto de la Pensión de Invalidez. ….. La pensión de invalidez se reconocerá a solicitud de parte interesada y comenzará a pagarse, en forma retroactiva, desde la fecha en que se produzca tal estado.”
“LEY 100 DE 1993 ARTICULO.  38.-Estado de invalidez. Para los efectos del presente capítulo se considera inválida la persona que, por cualquier causa de origen no profesional, no provocada intencionalmente, hubiere perdido el 50% o más de su capacidad laboral.”</td>
            <tr>
        </table>
    </div>
</div>
<br><br><br><br><br><br><br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table" > 
            <tr><td class="font-weight-bold">{{ $i["Nombre del profesional que genera"]  ." - ".  $i["Tipo doc profesional que genera"]." ".$i["Numero doc profesional que genera"]." ".$i["Especialidad"] }}</td><td>Original</td></tr> 
         </table>
    </div>
</div>

<!-- copia -->
<br><br><br>

<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr>
            <td ><img  src="img/comfenalcovalle.png" width="50" height="17"></td>
            <td class="font-weight-bold">{{ $i["titulo"] }}</td>
        </table>
    </div>

</div>
<br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr>
            <td class="font-weight-bold">No. Certificado:</td><td>{{ $i["No"] }}</td>
            <td class="font-weight-bold">Fecha de expedición:</td><td>{{ $i["Fecha de expedicion"] }}</td>
            <td class="font-weight-bold">Ciudad: </td><td>{{  $i["ciudad"]}}</td>
            </tr>
        </table>
    </div>
</div>
<br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr>
            <td class="font-weight-bold">Nombre Prestador:</td><td>{{ $i["Nombre Prestador"] }}</td>
            <td class="font-weight-bold">Nit Prestador:</td><td>{{ $i["Nit Prestador"] }}</td>
           
            </tr>
        </table>
    </div>
</div>
<br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td class="font-weight-bold">DATOS AFILIADO</td>
            <tr>
        </table>
    </div>
</div>
<br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td class="font-weight-bold">Nombre Afiliado:</td><td>{{ $i["nombre"] }}</td>
            <td class="font-weight-bold">Id:</td><td>{{ $i["id"] }}</td>
            </tr>
        </table>
    </div>
</div>
<br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td class="font-weight-bold">Empresa donde labora:</td><td>{{ $i["empresa"] }}</td>
            <td class="font-weight-bold">Id:</td><td>{{ $i["nit"] }}</td>
            </tr>
        </table>
    </div>
</div>

<br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td class="font-weight-bold">DATOS CALIFICACIÓN PÉRDIDA DE CAPACIDAD LABORAL</td>
            <tr>
        </table>
    </div>
</div>
<br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td class="font-weight-bold">Fecha Dictámen:</td><td>{{ $i["fechad"] }}</td>
            <td class="font-weight-bold">Pérdida de capacidad laboral:</td><td>{{ $i["cpclo"] }}</td>
            </tr>
            <tr> 
            <td class="font-weight-bold">Origen:</td><td>{{ $i["origen"] }}</td>
            </tr>
            <tr> 
            <td class="font-weight-bold">Código CIE10 Diagnóstico principal:</td><td>{{ $i["codigo"] }}</td>
            </tr>
            <tr> 
            <td class="font-weight-bold">Fecha Estructuración:</td><td>{{ $i["fechae"] }}</td>
            <td class="font-weight-bold">Fecha de atención:</td><td>{{ $i["Fecha de expedicion"]  }}</td>
            </tr>
        </table>
    </div>
</div>
<br><br><br><br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td class="font-weight-bold">NOTA ACLARATORIA</td>
            <tr>
        </table>
    </div>
</div>
<br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table table-bordered">
            <tr> 
            <td >Es importante manifestar, que la pensión ha de pagarse desde la fecha de definición del estado de invalidez, es decir, desde la fecha de estructuración de la misma y de manera retroactiva, razón por la cual no es pertinente seguir recibiendo subsidio económico por incapacidad, de acuerdo a: 
“Ley 100 de 1993. Artículo 40. Monto de la Pensión de Invalidez. ….. La pensión de invalidez se reconocerá a solicitud de parte interesada y comenzará a pagarse, en forma retroactiva, desde la fecha en que se produzca tal estado.”
“LEY 100 DE 1993 ARTICULO.  38.-Estado de invalidez. Para los efectos del presente capítulo se considera inválida la persona que, por cualquier causa de origen no profesional, no provocada intencionalmente, hubiere perdido el 50% o más de su capacidad laboral.”</td>
            <tr>
        </table>
    </div>
</div>
<br><br><br><br><br><br><br><br>
<div class="row">
    <div class="col-sm-12  mx-auto">
        <table class="table" > 
            <tr><td class="font-weight-bold">{{ $i["Nombre del profesional que genera"]  ." - ".  $i["Tipo doc profesional que genera"]." ".$i["Numero doc profesional que genera"]." ".$i["Especialidad"] }}</td><td>Copia</td></tr> 
         </table>
    </div>
</div>

</body>
</html>

