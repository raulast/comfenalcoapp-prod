<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Medico;
use Carbon\Carbon;

class InhabilitarCuentas extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'usuario:inhabilitar';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Inhabilita usuarios con mas de 90 dias inactivos';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Iniciando analisis de usuarios');
        $users = User::all();
        $now = Carbon::now();

        $count = [];
        $bar = $this->output->createProgressBar(count($users) >0 ? count($users) : 1);
        $bar->setFormat(' %current%/%max% [%bar%] %percent:3s%% ');
        $bar->start();
        foreach ($users as $user) {
            $time = $user->updated_at;
            $diff=date_diff($time,$now);
            if($diff->format("%a") > 90){
                if(Medico::where('user_id',$user->id)->exists()){
                    Medico::where('user_id',$user->id)->delete();
                }
                $user->delete();
                $count[]=$user->id;
            }
            $bar->advance();
        }
        $bar->finish();
        $this->info("\nUsuarios Inhabilitados: ".count($count));

        return $count;
    }
}
