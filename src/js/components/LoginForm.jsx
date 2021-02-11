import React from "react";
import ReactDOM from "react-dom";
import OAuth2Login from "react-simple-oauth2-login";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./LoginForm.scss";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";

function LoginForm(props) {
  const onSuccess = (response) => console.log("SUCCESS: ", response);
  const onFailure = (response) => console.error("ERROR: ", response);

  return (
    <div className="login-form">
      <Card>
        <Button buttontype='secondary' full>
          Continue
        </Button>
        <Button buttontype='secondary' icon='google' full>
          Continue with Google
        </Button>
        <Button buttontype='secondary' icon='twitter' full>
          Continue with Twitter
        </Button>
        <Button buttontype='secondary' icon='facebook' full>
          Continue with Facebook
        </Button>
        <Button buttontype='secondary' icon='apple' full>
          Continue with Apple
        </Button>

        <div>
          <OAuth2Login
            authorizationUrl='https://accounts.spotify.com/authorize'
            responseType='token'
            clientId='9822046hvr4lnhi7g07grihpefahy5jb'
            redirectUri='http://localhost:3000/oauth-callback'
            onSuccess={onSuccess}
            onFailure={onFailure}
            buttonText={props.loginBtnText}
            className={"oAuthLogin"}
          />
        </div>

        <div
          className={classnames("fb-login-button", "fbButton")}
          data-width=''
          data-size='large'
          data-button-type='login_with'
          data-layout='rounded'
          data-auto-logout-link='false'
          data-use-continue-as='false'
        />

        <Button buttontype='primary'>Yes</Button>
      </Card>
    </div>
  );
}

LoginForm.propTypes = {
  loginBtnText: PropTypes.string.isRequired,
};

export default LoginForm;
