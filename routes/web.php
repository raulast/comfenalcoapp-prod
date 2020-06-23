<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/


Route::redirect('/', '/login');
Route::redirect('/home', '/admin');
Auth::routes(['register' => false]);
Route::get('verify/resend', 'Auth\TwoFactorController@resend')->name('verify.resend');
Route::resource('verify', 'Auth\TwoFactorController')->only(['index', 'store']);
/*
Route::group(['prefix' => 'admin', 'as' => 'admin.', 'namespace' => 'Admin', 'middleware' => ['auth', 'twofactor']], function () {
    Route::get('/', 'HomeController@index')->name('home');
    // Permissions
   ;
});
*/
/*
Route::group(['prefix' => 'admin', 'as' => 'admin.', 'namespace' => 'Admin', 'middleware' => ['auth', 'twofactor']], function () {
    Route::get('/', 'HomeController@index')->name('home');
    // Permissions
   ;
});*/

Route::get('/incapacidad','IncapacidadController@inicio')->name('incapacidad')->middleware('auth','twofactor');
Route::get('/validacionDerechos/{tipo}/{numero}','IncapacidadController@validacion');
//Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


//load csv
Route::get('/load/{tipo}','LoadController@datos');

//api masters
Route::get('/list/{tipo}','ApiController@list');

Route::get('/search/{tipo}/{value}','ApiController@search');
Route::get('datosMedico','ApiController@datosMedico');
Route::post('saveIncapacidad','ApiController@saveIncapacidad');
Route::get('getNumeroIncapacidad','ApiController@getNumeroIncapacidad');
Route::get('buscarHistorico/{tipo}/{numero}','ApiController@buscarHistorico')->middleware('auth','twofactor');
Route::get('buscarHistoricoUltimaDias/{tipo}/{numero}','ApiController@buscarHistoricoUltimaDias');

