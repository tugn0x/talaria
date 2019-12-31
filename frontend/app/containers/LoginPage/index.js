/**
 *
 * LoginPage
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import messages from './messages';
import { requestLogin, socialLoginPrepare, socialLoginRequest, requestVerification, requestLogout, requestNewToken } from '../AuthProvider/actions';
import { LoginForm } from "../../components";

// import VerificationForm from "../../../../frontend/app/components/VerificationForm";

// import { withStyles } from '@material-ui/core/styles';
// import VerificationForm from "../../components/VerificationForm";
//
// import TwoColumnLayout from "components/TwoColumnLayout";


const styles = (theme) => {
  return {

  }
};

function LoginPage(props) {
  useEffect(() => {
    props.prepareFacebook()
  });


  // this.props.prepareGoogle()

  return (
    <div>
      <h1>LOGINAPGE</h1>

      <button onClick={props.loginFacebook}>Connect with Facebook</button>
        {!props.auth.oauth.token && <LoginForm {...props} login={(request) => props.dispatch(requestLogin(request))} />}
        {/*{props.auth.oauth.token && !props.auth.user.is_verified && <VerificationForm {...props} auth={props.auth} verify={(request) => props.dispatch(requestVerification(request))} logout={(request) => props.dispatch(requestLogout(request))} newtoken={(request) => props.dispatch(requestNewToken(request))} />}*/}
      </div>

  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //loginPage: makeSelectLoginPage()
});

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  // prepareGoogle: () => dispatch(socialLoginPrepare('google', { client_id: googleClientId })),
  // loginGoogle: () => dispatch(socialLoginRequest('google')),
  prepareFacebook: () => dispatch(socialLoginPrepare('facebook', { appId: process.env.FACEBOOK_APP_ID, redirect_uri:`${process.env.FACEBOOK_REDIRECT}` })),
  loginFacebook: () => dispatch(socialLoginRequest('facebook')),
})


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
