<?php

namespace App\Exports;

use App\Incapacidad;
use Maatwebsite\Excel\Concerns\FromCollection;

class IncapacidadExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Incapacidad::all();
    }
}
