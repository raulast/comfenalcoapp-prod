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


Route::redirect('/', '/login');
Route::get('/home', 'HomeController@index')->name('home');
Auth::routes(['register' => false]);
Route::get('verify/resend', 'Auth\TwoFactorController@resend')->name('verify.resend');
Route::resource('verify', 'Auth\TwoFactorController')->only(['index', 'store']);
//Route::redirect('/admin', '/login');

Route::get('/menu','HomeController@menu')->name('menu')->middleware('auth','twofactor');;
Route::get('/incapacidad','IncapacidadController@inicio')->name('incapacidad')->middleware('auth','twofactor');
Route::get('/licencia','LicenciaController@inicio')->name('licencia')->middleware('auth','twofactor');

Route::get('/validacionDerechos/{tipo}/{numero}','IncapacidadController@validacion')->middleware('cors');
Route::get('/validacionDescripcion/{estado}/{clasea}/{programa}','IncapacidadController@validacionD');
//Auth::routes();


//admin
Route::get('/admin','AdminController@index')->name('admin');
Route::get('/admin/usuarios','AdminController@users')->name('adminUsers');
Route::get('/admin/incapacidades','AdminController@incapacidades')->name('adminIncapacidades');

//load csv
Route::get('/load/{tipo}','LoadController@datos');

//api masters
Route::get('/list/{tipo}','ApiController@list');
Route::get('/search/{tipo}/{value}','ApiController@search');
Route::get('datosMedico','ApiController@datosMedico');

//creates
Route::post('saveIncapacidad','ApiController@saveIncapacidad');
Route::post('saveLicencia','ApiController@saveLicencia');
Route::post('saveUser','ApiController@saveUser');


//updates
Route::post('updateCie10','ApiController@updateCie10');


//deletes
Route::post('deleteUser','ApiController@deleteUser');

//reads
Route::get('getNumeroIncapacidad','ApiController@getNumeroIncapacidad');
Route::get('getNumeroLicencia','ApiController@getNumeroLicencia');
Route::get('buscarHistoricoUltimaDias/{tipo}/{numero}','ApiController@buscarHistoricoUltimaDias');
Route::get('getSystemUsers','ApiController@getSystemUsers');
Route::get('getSystemCausas','ApiController@getSystemCausas');
Route::get('getSystemCie10','ApiController@getSystemCie10');
Route::get('getCie10/{id}','ApiController@getCie10');
Route::get('getSystemEstados','ApiController@getSystemEstados');
Route::get('getSystemIps','ApiController@getSystemIps');
Route::get('getSystemClasesa','ApiController@getSystemClasesa');
Route::get('getSystemDescripciones','ApiController@getSystemDescripciones');
Route::get('getSystemEstadosa','ApiController@getSystemEstadosa');
Route::get('getSystemDiasmax','ApiController@getSystemDiasmax');
Route::post('getUser','ApiController@getUser');
Route::get('getMedicosUsers','ApiController@getMedicosUsers');
Route::get('buscarCie10/{campo}/{texto}','ApiController@buscarCie10');


//reports 
Route::get('buscarHistorico/{tipo}/{numero}','ApiController@buscarHistorico')->middleware('auth','twofactor');
Route::get('historicoIncapacidades','ApiController@historicoIncapacidades');
Route::get('certificadoIncapacidad/{id}/{pid}','ApiController@certificadoIncapacidad');
Route::get('certificadoLicencia/{id}','ApiController@certificadoLicencia');
Route::get('/reportes','ReportesController@index')->name('reportes');
Route::post('/reportIncapacidades','ReportesController@reportIncapacidades');
Route::post('/reportLicencias','ReportesController@reportLicencias');
Route::get('/exportReporte','ExcelController@export');
Route::get('/exportCronicos','ExcelController@exportCronicos');
//cronicos

Route::get('/cronicos','CronicosController@index')->name('cronicos');
Route::get('/getCronicos','CronicosController@getCronicos');
Route::post('/buscarCronicos','CronicosController@buscarCronicos');
Route::post('/buscarCronico','CronicosController@buscarCronico');
Route::get('/verCronico/{id}','CronicosController@verCronico');
Route::get('/getCronico/{id}','CronicosController@getCronico');


