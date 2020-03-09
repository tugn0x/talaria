import React from 'react';
import { Col, Row } from 'reactstrap';
import globalMessages from 'utils/globalMessages'
import messages from './messages'; 
import {useIntl} from 'react-intl';
import Loader from 'components/Form/Loader.js';
import {CustomForm} from 'components';
import {fields} from './fields';

const UserForm = (props) => {
    const {user, updateUser, loading, createUser} = props
    const intl = useIntl();
    return (
        <Loader show={loading} >
            <Row className="justify-content-center">
                <Col md="10">
                    {user && 
                        <CustomForm 
                            submitCallBack={(formData) => updateUser(formData) } 
                            fields={fields} 
                            messages={globalMessages}
                            updateFormData={user}
                            title={intl.formatMessage(messages.header)} 
                            submitText={intl.formatMessage(messages.subtitle)}
                        />
                    ||
                        <CustomForm 
                            submitCallBack={(formData) => createUser(formData) } 
                            fields={fields} 
                            messages={globalMessages}
                            title={intl.formatMessage(messages.createNewUser)} 
                            submitText={intl.formatMessage(messages.createNewUser)}
                        />
                    }
                     
                </Col>
            </Row>
        </Loader>
    )
}

export default UserForm