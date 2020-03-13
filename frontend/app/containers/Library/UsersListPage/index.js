import React, {useEffect} from 'react'

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {requestUsersList} from '../actions'
import {UsersList} from 'components'

const UsersListPage = (props) => {
    console.log('UsersListPage', props)
    const {dispatch, isLoading, library} = props
    
    const library_id = library.library.id
    const usersList = library.usersList
    const pagination = library.pagination
    console.log(pagination)
    useEffect(() => {
        if(!isLoading && library_id) {
            dispatch(requestUsersList('1', library_id))
        }
    }, [library_id])

    /*  useEffect(() => {
        if(!isLoading && match.params) {
            dispatch(requestReferencesList(match.params.page))
        }
    }, [match.params]) */

    return (
        <>
            <UsersList 
                usersList={usersList}
                editPath={`/library/${library_id}/patrons/patron/:id?`}
                pagination={pagination}
            />
        </>
    )
}

const mapStateToProps = createStructuredSelector({
   
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

export default compose(withConnect)(UsersListPage);