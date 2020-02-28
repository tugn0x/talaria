import React, {useEffect, useState} from 'react'
import {requestReferencesList} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {ReferencesForm, ReferencesList} from 'components';
import {requestPostReferences} from '../actions'

const ReferencesPage = (props) => {
    const {dispatch, isLoading, location, match, patron} = props
    const referencesList = patron.referencesList
    
    const [isNew, setIsNew] = useState(location.pathname.includes('new'))
    const [currentReference, setCurrentReference] = useState({})
    // const [isSingle, setIsSingle] = useState(match.params)

    useEffect(() => {
        setIsNew(location.pathname.includes('new'))
    }, [location.pathname])


    useEffect(() => {
        if(!isLoading) {
            dispatch(requestReferencesList())
        }
    }, [])

    useEffect(() => {
        if(!isNew && match.params.id){
            setCurrentReference(referencesList.filter(reference => reference.id === parseInt(match.params.id))[0])
        }
    }, [referencesList])

    return (
        <>
            <h1>References Page</h1>
            {isNew && 
                <ReferencesForm 
                    loading={isLoading} 
                    createReferences={ (formData) => dispatch(requestPostReferences(formData)) } />
            
            || !isNew && match.params.id &&
                <>
                    <h4>Update Form</h4>
                    <ReferencesForm 
                        currentReference={currentReference}
                        loading={isLoading} 
                        createReferences={ (formData, method) => dispatch(requestPostReferences(formData, method)) } />
                </>
            ||
                <ReferencesList match={match} referencesList={referencesList} />
            }
        </>
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
  
export default compose(withConnect)((ReferencesPage));