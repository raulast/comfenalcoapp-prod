@extends('layouts.app')

@section('content')
<div id="rootHistorico">
    <div className="container"> 
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <table class="table table-hover table-bordered">
                    <thead>
                        <tr class="bg-info">
                        <th scope="col">No</th>
                        <th scope="col">TD</th>
                        <th scope="col">ND</th>
                        <th scope="col">Fecha Atencion</th>
                        <th scope="col">Diagnóstico</th>
                        <th scope="col">Fecha de inicio</th>
                        <th scope="col">Días</th>
                        <th scope="col">Fecha fin</th>
                        <th scope="col">Observación</th>
                        </tr>
                    </thead>
                    <tbody>
                    @if ($datos != "no")
                    @foreach ($datos as $dato)
                    
                        <tr>
                        <td>{{$dato->id ."-".$dato->prorrogaid}}</th>
                        <td>{{$dato->tipo_documento_afiliado}}</th>
                        <td>{{$dato->num_documento_afiliado}}</td>
                        <td>{{$dato->fecha_atencion}}</td>
                        <td>{{$dato->codigo_diagnostico}}</td>
                        <td>{{$dato->fecha_inicio_incapacidad}}</td>
                        <td>{{$dato->dias_solicitados}}</td>
                        <td>{{$dato->fecha_fin_incapacidad}}</td>
                        <td>{{$dato->observacion}}</td>
                        </tr>
                    @endforeach
                    @endif
                    </tbody>
                    </table>
                </div>
            </div>
    </div>    
</div>
@endsection