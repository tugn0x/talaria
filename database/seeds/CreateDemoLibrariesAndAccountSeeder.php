<?php

//TODO: BEFORE RUNNING THIS, please edit accordingly to RSCVD Partner's data
//in order to fill DB with their accounts!

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CreateDemoLibrariesAndAccountSeeder extends Seeder
{    
    public function run()
    {
        Model::unguard(); //altrimenti non setta la passw perchè è unfillable        

        $lib1 = factory(\App\Models\Libraries\Library::class)->create([            
            'name' => 'Library jj',
            'status'=>1,            
            'subject_id'=>1,            
            'country_id'=>1,
            'profile_type'=>2,
            'external'=>0,
        ]);

        //DESK
        /*DB::table('deliveries')->insert([
            'library_id' => $lib1->id,
            'name'=>'Desk jj'
        ]);*/

        //User
        $user1 = factory(\App\Models\Users\User::class)->create([
            'email' => 'jjj@jjj.com',
            'name' => 'JJJ',
            'surname' => 'JJJ',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);

        $user1->allow('manage', $lib1); //manager
        

        //Account patron
        /*DB::table('library_user')->insert([
            'library_id' => $lib1->id,
            'user_id' => $user1->id,
            'status'=>1,
            'department_id'=>null,
            'title_id'=>null,
        ]);
        $user1->assign('patron'); //patron
        
        */
       

        
        Model::reguard();
    }
}
