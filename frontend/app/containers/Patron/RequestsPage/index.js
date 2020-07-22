import React, {useEffect, useState} from 'react'
import {requestGetRequest} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {/*RequestsForm,*/Loader} from 'components';
import RequestDetail from 'components/Patron/RequestDetail';
//import {requestPostRequests,requestUpdateRequests} from '../actions'
import messages from './messages'
import referenceMessages from '../ReferencesPage/messages'
import {useIntl} from 'react-intl';


const RequestsPage = (props) => {
    console.log("RequestsPage",props)
    const {dispatch, isLoading, match, patron} = props
    const {params} = match
    const patronrequest = patron.patronrequest
    const intl = useIntl();
    const isNew = !params.id || params.id === 'new'
  
    useEffect(() => {
        if(!isNew && !isLoading){
           dispatch(requestGetRequest(params.id))
        }
    }, [params.id])
    
    return (
        <Loader show={isLoading}>
            {/*isNew && (
                <RequestsForm 
                   //  loading={isLoading} 
                    messages={messages}
                    createRequest={ (formData) => dispatch(requestPostRequests(formData, intl.formatMessage(messages.requestAdded))) } />
                )
            */}
            {/*!isNew && ( 
                params.edit &&
                    <RequestsForm 
                        messages={messages}
                        request={request}
                        // loading={isLoading} 
                        updateRequest={ (formData) => dispatch(requestUpdateRequests(formData, params.id, intl.formatMessage(messages.requestUpdate))) } />
                ||*/
                !isNew && <RequestDetail 
                        messages={messages}
                        referenceMessages={referenceMessages}
                        patronrequest={patronrequest} 
                    />
                /*)*/
            }
        </Loader>
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isPatronLoading(),
    patron: makeSelectPatron()
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
  
export default compose(withConnect)((RequestsPage));