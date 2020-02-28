import React, {useEffect} from 'react'
import {CustomForm} from 'components';
import {fields} from './fields';
import {Row, Col} from 'reactstrap'
import messages from './messages';
import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';
import globalMessages from 'utils/globalMessages'


const ReferencesForm = (props) => {
    const {createReferences, currentReference} = props
    const intl = useIntl();
    useEffect(() => {
      //  console.log(currentReference)
    })
    return (
        <Loader show={props.loading} >
            <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                    {currentReference && Object.keys(currentReference).length > 0 &&
                        <CustomForm 
                            submitCallBack={(formData) => createReferences(formData, 'PUT')} 
                            updateFormData={currentReference}
                            fields={fields} 
                            title={`${intl.formatMessage(globalMessages.update)} ${currentReference.pub_title}`} 
                            messages={messages}
                            submitText={intl.formatMessage(messages.updateSubmitText)}
                        /> 
                    ||
                        <CustomForm 
                            submitCallBack={(formData) => createReferences(formData)} 
                            fields={fields} 
                            title={intl.formatMessage(messages.header)} 
                            messages={messages}
                            submitText={intl.formatMessage(messages.createSubmitText)}
                        />
                    }
                </Col>
            </Row>
        </Loader>
    )
}


export default ReferencesForm