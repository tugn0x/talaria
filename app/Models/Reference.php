<?php

namespace App\Models;

use App\Models\Requests\DocdelRequest;
use App\Models\Requests\PatronDocdelRequest;
use App\Models\Users\Label;

class Reference extends BaseModel
{
    protected $fillable = [
        'material_type',
        'pub_title',
        'part_title',
        'first_author',
        'last_author',
        'pubyear',
        'volume',
        'issue',
        'page_start',
        'page_end',
        'abstract',
        'doi',
        'issn',            
        'publisher', 
        'publishing_place',
        'isbn',
        'sid',
        'pmid'
    ];

    public function patronddrequest()
    {
        return $this->hasOne(PatronDocdelRequest::class);
    }

    public function libraryddrequest()
    {
        return $this->hasMany(DocdelRequest::class);
    }

    public function labels()
    {
        return $this->belongsToMany(Label::class);
    }
}
