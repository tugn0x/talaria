<?php
//NOTA: solo i campi fillable vengono Salvati/inseriti dalle API
//quindi non c'e' problm, al max posso lavorare con i $visible per restituire via JSON
//solo i campi del Borrowi/Lending e non di tutta la tabella DocdelRequest

//NOTA: sembra che getAttributes() restituisca comunque tutti i campi della tabella!!
//=>occorre toglierli a mano???


namespace App\Models\Requests;
use App\Models\Libraries\Tag;
use Carbon\Carbon;
use Auth;
use App\Resolvers\StatusResolver;
use Illuminate\Support\Facades\Log;

class LendingDocdelRequest extends DocdelRequest
{

    private $lending_attributes=[
        'lending_status', //stato rich. borrow
        'lending_notes', //dd_note_interne     
        'lending_archived', //0|1 indica se la rich è archiviata
        'all_lender',        
        'docdel_request_parent_id', //id della docdelrequest "padre" (se una rich. viene reinoltrata N volte, tutte le N avranno come parent la rich. originale, in modo da ricostruire lo storico!)
        'patron_docdel_request_id',
        'accept_cost_status', //Stato accettazione utente dopo richiesta: 1=Biblio richiede accettazione, 2=Ute accetta, 3=Ute non accetta
        'accept_cost_date', //quando ha accettato/rifiutato il costo                
        'trash_date', //data cestinamento
        'trash_type', //tipo cestinamento (trash o trashHC)
        'borrowing_notes', //dd_note_interne      
        'parent_id', //parent dd request id 
        'archived', //0|1 indica se la rich è archiviata
        'forward', //0|1 indica se la rich è stata reinoltrata (la rich reinoltrata avrà parent_id=id di questa richiesta)
        //'desk_delivery_format', //formato di invio del della biblio al desk                
        'operator_id',
        'user_license', //(NULL=non impostato, 0=can't send pdf to user, 1=ok can send pdf to user,2=not specified in the lic.)
        'user_cancel_date', //data rich canc da utente   


    ];
      
    protected static $observerClass=LendingDocdelRequestObserver::class;

    protected $statusField="lending_status";
    protected $table = 'docdel_requests';    
       
    public function __construct()
    {
        parent::__construct();
        
        $this->fillable=array_merge($this->fillable,$this->lending_attributes);        
        $this->visible=array_merge($this->visible,$this->lending_attributes);
    }

    public function patrondocdelrequest()
    {
        return $this->belongsTo(PatronDocdelRequest::class,'patron_docdel_request_id')->withTrashed();
    }


    public function tags()
    {
        //filter by libraryid
        //if($this->lendinglibrary())
            //return $this->belongsToMany(Tag::class,"docdel_request_tag","docdel_request_id","tag_id")->inLibrary($this->lendinglibrary()->first()->id);
            return $this->belongsToMany(Tag::class,"docdel_request_tag","docdel_request_id","tag_id");
    }
    
    public function library()
    {
        return parent::lendinglibrary();
    }        

    
    public function operator()
    {        
        return $this->belongsTo('App\Models\Users\User', 'operator_id');
    }


    public function canManage(User $user=null){
        $u = $user ? $user:Auth::user();        
        return 
            $u->can('manage', $this->lendingLibrary()->first())||
            $u->can('lend', $this->lendingLibrary()->first());
    }


    public function changeStatus($newstatus,$others=[]) {

            
     
        $sr=new StatusResolver($this);                        
        
     

         switch ($newstatus)
         {  
           
            case 'pendingRequest': 
                $newstatus="requestReceived";                        
                break; 


            case 'requestReceived': 
                $newstatus="willSupply";                        
                break; 

            case 'willSupply': 
                $others=array_merge($others,[
                    'cancel_request_date'=>Carbon::now(),
                    'lending_archived'=>1,
                ]);

                $newstatus="unFilled";                        
                break;                
                
             case 'cancelRequested': 
                  $others=array_merge($others,[
                      'cancel_request_date'=>Carbon::now(),
                      'lending_archived'=>1,
                  ]);
   
                  $newstatus="canceledAccepted";                        
                  break;
         }
    
         
         $sr->changeStatus($newstatus,$others);

     

         return $this;
    }

    public function scopeInLibrary($query, $library_id)
    {        
        return $query->where('lending_library_id', $library_id);
    }  
    
    public function scopeLendingarchived($query, $lending_archived)
    {
        if ($lending_archived>0)
            return $query->where('lending_archived','=',$lending_archived);
        else
            return $query->where('lending_archived','=',null);
    }

    public function scopeLendingalllender($query, $all_lender)
    {
        return $query->where('all_lender','=',$all_lender);
    }
   
    public function scopeByTags($query, $tagIds){
        return $query->whereHas('tags', function($q) use ($tagIds){
            $arr=explode(',',$tagIds);
            if(sizeof($arr)>0)
                return $q->whereIn('tags.id', $arr);
            return;    
        });        
    }
     
}