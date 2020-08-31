<?php

namespace App\Exports;

use App\Cronicos;
use Maatwebsite\Excel\Concerns\FromCollection;

class CronicosExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Cronicos::all();
    }
}
