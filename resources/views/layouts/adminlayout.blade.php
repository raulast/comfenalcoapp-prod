@extends('layouts.app')

@section('content')
<input type="hidden" id="tipo" value="{{ $tipo }}">
<div class="white">
<div class="row">
    <div class="col-12 ">
        <div id="adminNav" >
        </div>
    </div>
    <!--<div class="col-10">
        @yield('contentAdmin')  
    </div>-->
</div>
</div>
@endsection