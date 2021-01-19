@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row">
        <div class="col-sm-8 offset-sm-2">
            <div class="card">
                <div class="card-body">
                    @if (session('info'))
                        <div class="alert alert-success" role="alert">
                            {{ session('info') }}
                        </div>
                    @endif
                </div>
            </div>
            <div class="card">
                <div class="card-header"></div>

                <div class="card-body texto">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 offset-md-4">
                            <button class="buttonm texto mx-auto" style="vertical-align:middle" onclick="window.open('{{ route('incapacidad') }}')"><span>Incapacidades&nbsp;&nbsp;&nbsp;&nbsp;</span></button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-12 offset-md-4">
                                <button class="buttonm texto mx-auto" style="vertical-align:middle" onclick="window.open('{{ route('licencia') }}')"><span>Licencias</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
