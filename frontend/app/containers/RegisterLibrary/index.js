import React, {useState, useEffect} from 'react'
import Navigation from './Navigation'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import wizardMessages from './messages'
import globalMessages from 'utils/globalMessages';
import {fields, totalSteps, setNewSteps} from './fields'
import './style.scss'
import {Button} from 'reactstrap'
import {useIntl} from 'react-intl'
import {CustomForm, BasePage} from 'components'
import { requestGetCountriesOptionList,
    requestLibrarySubjectOptionList, requestPostPublicLibrary, requestGetProjectsOptionList, requestGetInstitutionsByTypeByCountryOptionList,
    requestGetInstitutionTypeOptionList, requestGetlibraryProjectsOptionList, requestGetlibraryidentifierTypesOptionList } from "./actions"
import {institutionsOptionListSelector,
    countriesOptionListSelector, librarySubjectOptionListSelector, projectsOptionListSelector,institutionsByTypeCountryOptionListSelector,
    institutionTypesOptionListSelector,
    placesSelector, 
    libraryProjectsOptionListSelector,
    identifierTypesOptionListSelector} from './selectors';
import { acceptallLenderLendingRequest } from '../../utils/api';

const ILL_REQUEST_PAYMENT=(process.env.ILL_REQUEST_PAYMENT && process.env.ILL_REQUEST_PAYMENT=="true")?true:false;
const LIBRARY_DIFFERENT_PROFILES = (process.env.LIBRARY_DIFFERENT_PROFILES && process.env.LIBRARY_DIFFERENT_PROFILES=="true")?true:false;

const RegisterLibrary = (props) => {
    console.log('RegisterLibrary', props)
    const messages= {...wizardMessages,...globalMessages}
    
    let [institutionPresent, setInstitutionPresent] = useState(false)
    let [currentStep, setCurrentStep] = useState(1)
    const intl = useIntl()
    const {dispatch} = props
    const [data, setData] = useState({})
    const [currentFields, setCurrentFields] = useState({})
    const [steps, setSteps] = useState(setNewSteps)
    const [countryid, setCountryid] = useState(0);
    const [institutiontypeid, setInstitutiontypeid] = useState(0);
    const projectsarrname = [];
    const [basicProfile,setBasicProfile]=useState(LIBRARY_DIFFERENT_PROFILES);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    const [countryname, setCountryName] = useState(null);
    const [subjectname, setSubjectName] = useState(null);
    const [institutiontypename, setInstitutionTypeName] = useState(null);
    const [institutionname, setInstitutionName] = useState(null);
    const [identifierType, setIdentifiertype] = useState(null);
    const [identifierTypeSelected, setidentifierTypeSelected] = useState(false);
    let [buttonStopPressed, setbuttonStopPressed] = useState(false)
    const [projectName, setProjectName] = useState(null);
    const [printStatus, setPrintStatus] = useState(false)
    const [disabled, setdisabled] = useState(false)
    const getLocation = () => {
        if (!navigator.geolocation) {
          setStatus(intl.formatMessage(wizardMessages.geolocationNotSupported));
        } else {
            setStatus(intl.formatMessage(wizardMessages.locatingLibraryLocation));
            if (lng===null)  
            {
                fields.geolocation_spinner.hidden=false;
                fields.library_coordinates.label=intl.formatMessage(wizardMessages.stopEnterManually)  
                fields.library_coordinates.color="orange"
            }
            navigator.geolocation.getCurrentPosition((position) => {
                    setLat(position.coords.latitude); setLng(position.coords.longitude);
                    setData({...data, 'lon': position.coords.longitude, 'lat': position.coords.latitude})
            }, () => {
                setStatus(intl.formatMessage(wizardMessages.unableRetriveLocation));
            });
        }
      }
   
      useEffect(() => {
        fields.geolocation_spinner.hidden=true;
        fields.library_coordinates.label=intl.formatMessage(wizardMessages.clicktoGetRecords) 
     }, [lng])

     const GetBrowserCoordinates = (ev) => {
        setdisabled(disabled+1)
    }

    useEffect(() => {
       if(disabled >0 && disabled%2===0) //stop button pressed
       {
            fields.library_coordinates.label=intl.formatMessage(wizardMessages.clicktoGetRecords) 
            setStatus(null);
            fields.geolocation_spinner.hidden=true;
            setLng(0);setLat(0)
       }
       else if (disabled > 0 && disabled%2!==0)
       {
                setStatus(null);
                fields.library_coordinates.label=intl.formatMessage(wizardMessages.stopEnterManually) 
                setLng(0);setLat(0)
                getLocation()
                fields.geolocation_spinner.hidden=false

                if (lng===null && lat===null)
                {    setLng(0);setLat(0)   }
       }
    },[disabled])

    // Fai le chiamate per le option list
    useEffect(() => {
        dispatch(requestGetCountriesOptionList())
        dispatch(requestGetInstitutionTypeOptionList())
        dispatch(requestGetlibraryProjectsOptionList())
        dispatch(requestLibrarySubjectOptionList())
        dispatch(requestGetlibraryidentifierTypesOptionList())

        if (ILL_REQUEST_PAYMENT===false) //RSCVD
        {
            fields.ill_user_cost.hidden=true;
            fields.ill_service_conditions.hidden=true;
            fields.ill_service_conditions_other.hidden=true;
            fields.ill_cost.hidden=true;
            fields.ill_imbalance.hidden=true;
            fields.ill_supply_conditions.hidden=true
        }
        if (LIBRARY_DIFFERENT_PROFILES===false)
        {
            setData({...data, "ill_user_cost": "0", "ill_cost": "0"})                
            fields.volunteer_library_label.hidden = true;
            fields.opac_label.hidden=false;
            fields.opac.hidden=false;
            fields.subject_label.hidden=false;
            fields.subject_id.hidden=false;
            fields.showfullProfile.hidden = true;                             
        }
        fields.geolocation_spinner.hidden=true;
        fields.opac.required=false;
        fields.subject_id.required=false;
        //set profile
        setData({...data, 'profile_type': basicProfile?1:2})
    },[])

    // Filtra i CAMPI / Fields da mostrare a seconda dello step in cui ti trovi
    useEffect(() => {
        let Fields = {}
        Object.keys(fields)
            .filter(key => fields[key].group === `step_${currentStep}` )
            .map(key =>  Fields = {[key]: fields[key], ...Fields})
        setCurrentFields(Fields)
    }, [currentStep])
    
    useEffect(()=> {
        Object.keys(props.libraryProjectsOptionList).forEach(key => 
            projectsarrname.push(props.libraryProjectsOptionList[key].value))
    })


    useEffect(() => {
       //set profile
       setData({...data, 'profile_type': basicProfile?1:2})
    }, [basicProfile])


    useEffect(() => {
        setData({...data, 'country_name': countryname})
     }, [countryname])


     useEffect(() => {
        setData({...data, "subject_name": subjectname})
     }, [subjectname])

     useEffect(() => {
        setData({...data, "institution_type_name": institutiontypename})
     }, [institutiontypename])


     useEffect(() => {
        setData({...data, "institution_name": institutionname})
     }, [institutionname])

     // Cambia Step
    const onChangeStep = (formData, newStep) => {
        setData({...data, ...formData})
        setCurrentStep(parseInt(newStep))
        setSteps({...steps, [parseInt(newStep)]: {active: true} })      
    }
    

    const onBackPressed = (field_name,value,newList) => {
        fields.library_identifier_list.hidden = true
        setData({...data, 'backbuttonPressed': true})
        fields.library_identifier_list.hidden = false
        setCurrentStep(parseInt(1))
        fields.library_identifier_add.disabled = true
    }
    
    // Aggiorna dati nei campi *handle change*
    const onChangeData = (field_name, value) => {
        
        if (field_name === "identifier_type_id")
            setIdentifiertype(value.value);
        
        if (field_name === "institution_type_id")
        {
            setInstitutiontypeid(value.value);
            setInstitutionTypeName(value.label);
            setInstitutiontypeid((institutiontypeid) => {
                console.log("institution type id: " + institutiontypeid); 
                fields.suggested_institution_name.hidden = true;
                return institutiontypeid;
              });
        }
        if (field_name === "institution_country_id")
        {
            setCountryid(value.value);
            setCountryid((countryid) => {
            setData({...data, "institution_country_name": value.label})
            fields.suggested_institution_name.hidden = true;
                if (countryid!==0 && institutiontypeid!==0)
                {
                    setInstitutionPresent(true);
                    console.log("Institution not present")
                    setInstitutionName(null) 
                   
                }
                return countryid;
            });
        }

        if (field_name === "country_id" && value.value !== 0)
            setCountryName(value.label)

        if (field_name === "subject_id" && value.value !== 0)
            setSubjectName(value.label)   

        if (field_name === "institution_type_id" && value.value !== 0)
            setInstitutionTypeName(value.label) 

        if (field_name === "institution_id" && value.value !== 0)
        {
            setInstitutionName(value.label) 
            fields.suggested_institution_name.hidden=true
        }

        if (field_name === "institution_id" && value.value === 0)
        {
            fields.suggested_institution_name.hidden = false;
            setInstitutionName (null)
        }

        if (field_name === "identifier_type_id" && value!==0)
                setidentifierTypeSelected(true)
        
        
        if (field_name === "library_identifiers_txt" && value !== 0 && identifierTypeSelected)
            fields.library_identifier_add.disabled = false
            
        if (field_name === "library_identifiers_txt" && value.length === 0)
            fields.library_identifier_add.disabled = true

        setData({...data, [field_name]: value})
    }


    useEffect(()=>{
        if(countryid!==0 && institutiontypeid!==0)
            dispatch(requestGetInstitutionsByTypeByCountryOptionList(null,countryid,institutiontypeid));                   
        },[countryid,institutiontypeid])
     
        
    const AddNewIdentifier = (field_name,value,newList) => {
        fields.library_identifier_list.hidden = newList.length>0 ? false : true;
        setData({...data, 'identifiers_id': newList})
        console.log("identifier_id" + JSON.stringify(newList))

    }

    const RemoveIdentifier = (field_name,value,newList) => {
        fields.library_identifier_list.hidden = newList.length>0 ? false : true;
        setData({...data, 'identifier_id': newList})
        console.log(JSON.stringify(newList))
    }

    const toggleLibraryProfile = (ev) => {
        setBasicProfile(!basicProfile);
        if (fields.opac.hidden===false)
        {
            fields.opac.required = false;
            fields.subject_id.required = false;
            fields.subject_id.value = 1
            fields.opac.hidden=true;
            fields.opac_label.hidden=true;
            fields.subject_id.hidden=true;
            fields.subject_label.hidden=true;
            fields.showfullProfile.label=intl.formatMessage(wizardMessages.switchToFullProfile)
            
        }
        else
        {            
            fields.subject_id.required = true;
            fields.opac.required = true;
            fields.opac.hidden=false;
            fields.opac_label.hidden=false;
            fields.subject_id.hidden=false;
            fields.subject_label.hidden=false;
            fields.showfullProfile.label=intl.formatMessage(wizardMessages.switchToBasicProfile)            
        }
    }

    // Check validation on change input
    const checkValidation = (validation) => {
     
        if(!validation){
            let objSteps = {}
            Object.keys(steps).map(key => {
                objSteps = {...objSteps, [key]: {active: key > currentStep ?  false : true } }
            })
            setSteps(objSteps)
        }  
    }

    // const Print = () =>{     
    //     let printContents = document.getElementById('printablediv').innerHTML;
    //     let originalContents = document.body.innerHTML;
    //     document.body.innerHTML = printContents;
    //     window.print();
    //     document.body.innerHTML = originalContents; 
    //     setPrintStatus(true)
    // }

    return (
        /*<BasePage {...props} routes={[]} messages={wizardMessages} headermenu={false}>*/
        <>
            <h2>{intl.formatMessage(wizardMessages.header)}</h2>
            <br></br>
              <Navigation 
                step={currentStep} 
                totalSteps={totalSteps}
                steps={steps}
                messages={wizardMessages}
                changeStep={(newStep) => onChangeStep({}, newStep) }/> 
            {/* CARICA TUTTI GLI STEP DEL FORM SECONDO I FIELDS FILTRATI per STEP */}
            {Object.keys(currentFields).length > 0 && 
             currentStep <= totalSteps - 1 &&
                (<CustomForm 
                    submitCallBack={(formData) => onChangeStep(formData, totalSteps > currentStep ? currentStep+1 : currentStep )} 
                    requestData={data ? data : null}
                    onChangeData={(field_name, value) => onChangeData(field_name, value)}
                    fields={currentFields}
                    title={intl.formatMessage(wizardMessages[`step_${currentStep}`])}
                    submitText={intl.formatMessage(globalMessages.continue)}
                    className="wizard-form"
                    institution_type_id = {props.institutionTypesOptionList}
                    country_id={props.countriesOptionList}
                    institution_country_id = {props.countriesOptionList}
                    institution_id={props.institutionsByTypeCountryOptionList}
                    subject_id={props.librarySubjectOptionList}
                    project_id = {props.libraryProjectsOptionList}
                    identifier_type_id = {props.identifierTypesOptionList}
                    onClickData={toggleLibraryProfile}
                    RetrievePositionData = {GetBrowserCoordinates}
                    AddNewIdentifier={AddNewIdentifier}
                    RemoveIdentifier={RemoveIdentifier}
                    searchOptionList={{ 
                        institution_type_id: (input) => dispatch(requestGetInstitutionTypeOptionList(input)), 
                        country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
                        subject_id: (input) => dispatch(requestLibrarySubjectOptionList(input)), 
                        project_id: (input) => dispatch(requestGetProjectsOptionList(input)),
                        institution_country_id: (input) => dispatch(requestGetlibraryidentifierTypesOptionList(input)),
                        identifier_type_id: (input) => dispatch(requestGetIdentifierTypesOptionList(input)),
                    }}
                    messages={messages}
                    getValidation={(validation) => checkValidation(validation) }
                />)
            }

            {/* FINITI GLI STEP CARICA IL RIEPILOGO E FAI IL SUBMIT */}
            {currentStep === totalSteps && 
                <div  id="printablediv">
                    <h3>{intl.formatMessage(wizardMessages.step_4)}</h3>
                   {/* <div class="container_summary ">  */}
                <div> 
                    
                   <div class="container-fluid">
                        <div class="row">
                        {
                            Object.keys(data).map((key, index) => {
                                return (key!==null) && (key!=='profile_type') && key!=='identifier_id' && key!=='institution_type_id' && key!=='country_id' && key!=='library_identifiers_txt' && key!=='identifier_type_id' && key!=='subject_id'
                                && key!=='institution_country_id' && key!=='institution_id' && key!=='project_id' &&
                                data[key]!==null && data[key]!==0 &&
                                <div key={index} class="report_summary"> 
                                    <>
                                    {   
                                        <div> 
                                            <div class="font-weight-bold">{messages[key] && intl.formatMessage(messages[key])}</div>
                                            {(key!=='identifiers_id') && <div>{data[key]}</div>}

                                            {(key==='identifiers_id')&&<div>
                                                {data.identifiers_id.map((item) => (<div><b>{item[2]}: </b>{item[1]}</div>))}</div>}
                                        </div>
                                    }   
                                    </>
                                </div>
                                }
                            )
                        }
                      </div>
                    </div>
                </div>



                <div class="vertical-center" id="noprint"> 
                    <Button onClick={onBackPressed} className='backButton'> 
                        {intl.formatMessage(globalMessages.back)} 
                    </Button>
                    <Button color="brown" className="rightAlignButton" onClick={() => dispatch(requestPostPublicLibrary(data, intl.formatMessage(wizardMessages.createMessage)))}>
                        {intl.formatMessage(globalMessages.submit)} 
                    </Button>
                    </div>
                </div>
            }
        {/*</BasePage>*/}
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    institutionsOptionList: institutionsOptionListSelector(),
    institutionsByTypeCountryOptionList: institutionsByTypeCountryOptionListSelector(),
    libraryProjectsOptionList: libraryProjectsOptionListSelector(),
    countriesOptionList: countriesOptionListSelector(),
    librarySubjectOptionList: librarySubjectOptionListSelector(),
    projectsOptionList: projectsOptionListSelector(),
    identifierTypesOptionList: identifierTypesOptionListSelector(),
    institutionTypesOptionList: institutionTypesOptionListSelector(),
    places: placesSelector(),

  });
  
  function mapDispatchToProps(dispatch) {
    return {
      dispatch,
    };
  }

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  

export default compose(withConnect)(RegisterLibrary)