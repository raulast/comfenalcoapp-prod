@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row">
        <div class="col-sm-8 offset-sm-2">
            <div class="card">
                <div class="card-header"></div>

                <div class="card-body texto">
                    <!--<div class="row">
                        <div class="col-sm-12 col-md-12 offset-md-4">
                            <button class="buttonm texto mx-auto" style="vertical-align:middle" onclick="window.open('{{ route('menu') }}')"><span>GENERACIÓN&nbsp;&nbsp;&nbsp;&nbsp;</span></button>
                        </div>
                    </div>-->
                    <div class="row">
                        <div class="col-sm-12 col-md-12 offset-md-4">
                            <button class="buttonm texto mx-auto" style="vertical-align:middle" onclick="window.open('{{ route('cronicos') }}')"><span>CRÓNICOS&nbsp;&nbsp;&nbsp;&nbsp;</span></button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-12 offset-md-4">
                                <button class="buttonm texto mx-auto" style="vertical-align:middle" onclick="window.open('{{ route('reportes') }}')"><span>REPORTES</span></button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-12 offset-md-4">
                                <button class="buttonm texto mx-auto" style="vertical-align:middle" onclick="window.open('{{ route('admin') }}')"><span>PARÁMETROS</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection