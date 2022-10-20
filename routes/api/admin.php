<?php

use Illuminate\Http\Request;

//ADMIN/MANAGEMENT APIs
//Role required: admin, manager

Route::group([    
    'middleware' => ['api','auth:api','roles:super-admin,manager'],    
    'prefix' => 'admin/',        
], function () {
    
    Route::group([
        'namespace' => 'Libraries',
        'prefix' => 'libraries',        
        'as' => 'api.v1.admin.libraries.',
    ], function () {    
        
        Route::get('', 'AdminLibraryController@index')->name('index');    
        Route::post('', 'AdminLibraryController@create')->name('create');
        Route::delete('{id}', 'AdminLibraryController@delete')->where('id', '[0-9]+')->name('delete'); //soft delete
        Route::put('{id}/changestatus', 'AdminLibraryController@changeStatus')->where('id', '[0-9]+')->name('changeStatus');
        Route::get('{id}', 'AdminLibraryController@show')->where('id', '[0-9]+')->name('show');        
        Route::put('{id}', 'AdminLibraryController@update')->where('id', '[0-9]+')->name('update');  
        
        //Route::get('{id}/subscriptions', 'AdminLibraryController@subscriptions')->where('id', '[0-9]+')->name('showsubscr');        
        //Route::put('{id}/subscriptions/{subid}', 'AdminLibraryController@subscriptions')->where('id', '[0-9]+')->where('subid', '[0-9]+')->name('edotsubscr');        
        //Route::delete('{id}/subscriptions/{subid}', 'AdminLibraryController@subscriptions')->where('id', '[0-9]+')->where('subid', '[0-9]+')->name('delsubscr');        
    
    }); 

    Route::group([
        'namespace' => 'Institutions',
        'prefix' => 'institutions',        
        'as' => 'api.v1.admin.institutions.',
    ], function () {    
        
        Route::get('', 'AdminInstitutionController@index')->name('index');    
        Route::post('', 'AdminInstitutionController@create')->name('create');
        Route::delete('{id}', 'AdminInstitutionController@delete')->where('id', '[0-9]+')->name('delete'); //soft delete
        Route::put('{id}/changestatus', 'AdminInstitutionController@changeStatus')->where('id', '[0-9]+')->name('changeStatus');
        
        //Route::get('{id}/subscriptions', 'AdminLibraryController@subscriptions')->where('id', '[0-9]+')->name('showsubscr');        
        //Route::put('{id}/subscriptions/{subid}', 'AdminLibraryController@subscriptions')->where('id', '[0-9]+')->where('subid', '[0-9]+')->name('edotsubscr');        
        //Route::delete('{id}/subscriptions/{subid}', 'AdminLibraryController@subscriptions')->where('id', '[0-9]+')->where('subid', '[0-9]+')->name('delsubscr');        
    
    }); 

});
