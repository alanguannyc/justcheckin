<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'name' => 'admin',
        ]);
        DB::table('roles')->insert([
            'name' => 'member',
        ]);

        DB::table('users')->insert([
            'name' => 'Alan Guan',
            'email' => 'alan@hanyc.org',
            'password' => bcrypt('Hotel2019'),
        ]);

        $user = \App\User::find(1)->roles()->attach(1);

    }
}
