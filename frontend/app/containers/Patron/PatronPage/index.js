/*
 * PatronPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import { connect } from 'react-redux';
import {BasePage} from "components";
import patronRoutes from "routes/patronRoutes";
import makeSelectPatron, {isPatronLoading}  from '../selectors';
import {requestGetLibraryList} from '../actions'

function PatronPage(props) {
  console.log('PatronPage', props)

  const {isLoading, dispatch} = props

  useEffect(() => {
    if(!isLoading) {
       dispatch(requestGetLibraryList())
    }
   }, [])

  return (
    <>
      <BasePage {...props} routes={patronRoutes} messages={messages} />
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  isLoading: isPatronLoading()
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default withRouter(withGoogleReCaptcha((SignupForm)));
export default compose(withConnect)(PatronPage);
