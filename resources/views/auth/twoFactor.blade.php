@extends('layouts.app')
@section('content')
<div class="row justify-content-center texto">
    <div class="col-md-8">
        <div class="card-group">
            <div class="card p-4">
                <div class="card-body">
                    @if(session()->has('message'))
                        <p class="alert alert-info">
                            {{ session()->get('message') }}
                        </p>
                    @endif
                    <form method="POST" action="{{ route('verify.store') }}">
                        {{ csrf_field() }}
                        <h3>Verificación de código</h3>
                        <p class="text-muted">
                            Ha recibido un correo electrónico que contiene un código para ingresar
                            
                            Si no lo ha recibido presione <a href="{{ route('verify.resend') }}">aquí</a>.
                        </p>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <!--<span class="input-group-text">
                                    <i class="fa fa-lock"></i>
                                </span>-->
                            </div>
                            <input name="two_factor_code" type="text" class="form-control{{ $errors->has('two_factor_code') ? ' is-invalid' : '' }}" required autofocus placeholder="Ingrese el Código">
                            @if($errors->has('two_factor_code'))
                                <div class="invalid-feedback">
                                    {{ $errors->first('two_factor_code') }}
                                </div>
                            @endif
                        </div>

                        <div class="row">
                            <div class="col-6">
                                <button type="submit" class="btn btn-primary px-4">
                                    Verificar
                                </button>
                            </div>
                            <div class="col-6 text-right">
                                <a class="btn btn-danger px-4" href="#" onclick="event.preventDefault(); document.getElementById('logoutform').submit();">
                                    {{ trans('Salir') }}
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<form id="logoutform" action="{{ route('logout') }}" method="POST" style="display: none;">
    {{ csrf_field() }}
</form>
@endsection