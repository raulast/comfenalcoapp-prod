@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row">
        <div class="col-sm-8 offset-sm-2">
            <div class="card">
                <div class="card-header"></div>

                <div class="card-body texto">
                    @if (auth()->user()->tipo == 0)
                    <div class="row">
                        <div class="col-sm-12 col-md-12 offset-md-2">
                            <button class="buttonm texto mx-auto" style="vertical-align:middle" onclick="window.open('{{ route('menu') }}')"><span>GENERACIÓN&nbsp;&nbsp;&nbsp;&nbsp;</span></button>
                        </div>
                    </div>
                    @endif
                    <div class="row">
                        <div class="col-sm-12 col-md-12 offset-md-2">
                            <button class="buttonm texto mx-auto" style="vertical-align:middle" onclick="window.open('{{ route('cronicos') }}')"><span>INCAPACIDAD CONTINUA PROLONGADA&nbsp;&nbsp;&nbsp;&nbsp;</span></button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-12 offset-md-2">
                                <button class="buttonm texto mx-auto" style="vertical-align:middle" onclick="window.open('{{ route('reportes') }}')"><span>REPORTES</span></button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-12 offset-md-2">
                                <button class="buttonm texto mx-auto" style="vertical-align:middle" onclick="window.open('{{ route('admin') }}')"><span>PARÁMETROS</span></button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-12 offset-md-2">
                                <button class="buttonm texto mx-auto" style="vertical-align:middle" onclick="window.open('{{ route('juridicas') }}')"><span>ACCIONES JURÍDICAS</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection