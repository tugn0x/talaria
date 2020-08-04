import React, {useState, useEffect} from 'react'
/* import {CustomForm} from 'components';
import {fields} from './fields'; */
// import messages from './messages';
// import Loader from 'components/Form/Loader.js';
// import {useIntl} from 'react-intl';
import formMessages from './messages';
import FormEdit from './FormEdit';
import FormCreate from './FormCreate';
import PreForm from './PreForm';

const ReferencesForm = (props) => {
    const {createReference, reference, updateReference, messages, 
            labelsOptionList, applyLabels, groupsOptionList, 
            applyGroups, removeLabel, removeGroup, deleteReference} = props
    const [goToForm, setGoToForm] = useState(false);
    
    
    return (
        <>
                {reference  && 
                    <FormEdit 
                        messages={messages} 
                        submitCallBack={(formData) => updateReference(formData)}
                        labelsOptionList={labelsOptionList}
                        groupsOptionList={groupsOptionList}
                        applyLabels={applyLabels}
                        applyGroups={applyGroups}
                        removeLabel={removeLabel}
                        removeGroup={removeGroup}
                        reference={reference}
                        deleteReference={deleteReference}
                    />
                ||
                    <>
                        {!goToForm && 
                            <PreForm 
                                goToForm={setGoToForm}
                                messages={formMessages}
                            />
                        ||
                            <FormCreate 
                                messages={messages} 
                                submitCallBack={(formData) => createReference(formData)}
                                labelsOptionList={labelsOptionList}
                                groupsOptionList={groupsOptionList}
                            />
                        }
                    </>
                }
        </>
    )
}


export default ReferencesForm