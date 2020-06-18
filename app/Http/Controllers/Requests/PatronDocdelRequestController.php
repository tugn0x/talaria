<?php

namespace App\Http\Controllers\Requests;

use App\Http\Controllers\ApiController;
use App\Models\References\Reference;
use App\Models\References\ReferenceTransformer;
use App\Models\Requests\PatronDocdelRequest;
use App\Models\Requests\PatronDocdelRequestTransformer;
use Illuminate\Http\Request;

class PatronDocdelRequestController extends ApiController
{
    public function __construct(PatronDocdelRequest $model, PatronDocdelRequestTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //Sto cercando le richieste di un riferimento
        if($request->route()->parameters['id'])
        {
            $rifid=$request->route()->parameters['id'];
            $this->model = $this->model->InReference($rifid);
        }
        
        $collection = $this->nilde->index($this->model->owned(), $request);

        return $this->response->paginator($collection, new $this->transformer())->morph();
    }

    public function my(Request $request)
    {
        $this->authorize($this->model);
        $count = $request->input('pageSize', config('api.page_size'));
        $my_applications = $this->model->owned()->orderBy('updated_at','desc')->paginate($count);

        return $this->response->paginator($my_applications, new $this->transformer())->morph();
    }

    public function store(Request $request)
    {
        $model = $this->nilde->store($this->model, $request, null, function ($model, $request) {
//            $model = $model->firstOrNew([
//                'user_id' => $model->user_id,
//                'library_id' => $request->library,
//            ]);
            return $model;
        });
        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

}