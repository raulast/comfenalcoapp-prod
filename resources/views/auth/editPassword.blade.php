@extends('layouts.app')

@section('content')
<div class="container texto">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header titulo">{{ __('Editar Contraseña') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('editar.password') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="actual-password" class="col-md-4 col-form-label text-md-right">{{ __('Actual Contraseña') }}</label>

                            <div class="col-md-6">
                                <input 
                                    id="actual-password" 
                                    type="password" 
                                    class="form-control" 
                                    name="actual-password" 
                                    required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Nueva Contraseña') }}</label>

                            <div class="col-md-6">
                                <input 
                                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$"
                                    title="al menos una mayuscula,
                                    al menos una minuscula,
                                    al menos un número,
                                    al menos un caracter especial,
                                    sin espacios"
                                    id="password" 
                                    type="password" 
                                    class="form-control @error('password') is-invalid @enderror" 
                                    name="password" 
                                    required>

                                @error('password')
                                    <span class="redf" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="confirm-password" class="col-md-4 col-form-label text-md-right">{{ __('Confirmar contraseña') }}</label>

                            <div class="col-md-6">
                                <input 
                                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$"
                                    title="al menos una mayuscula,
                                    al menos una minuscula,
                                    al menos un número,
                                    al menos un caracter especial,
                                    sin espacios"
                                    id="confirm-password" 
                                    type="password" 
                                    class="form-control" 
                                    name="confirm-password" 
                                    required>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Guardar') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
