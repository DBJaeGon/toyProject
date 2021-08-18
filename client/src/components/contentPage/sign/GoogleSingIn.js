import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { GoogleLogin } from 'react-google-login';
import { fetchGoogleOAuth } from '_reducer/userReducer';
import { currentLoc } from '_reducer/HeaderNavReducer';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';

const GoogleSingIn = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const onSuccess = async(res) => {
        const { profileObj: { email, familyName, givenName },
            tokenObj: { access_token, idpId}
        } = res;
        const result = await dispatch(fetchGoogleOAuth({email, lastName: familyName, firstName: givenName, accessToken: access_token, provider: idpId}));
        const isOAuth = unwrapResult(result);
        if(isOAuth) {
            history.push('/');
            await dispatch(currentLoc('Home'));
        }
    };

    const onFailure = (err) => {
        console.log(err);
        message.error("로그인에 실패하였습니다.");
    };

    return (
        <GoogleLogin 
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            render={renderProps => (
                <Button onClick={renderProps.onClick} disabled={renderProps.disabled} type="white" htmlType="button" className="signIn-form-button">
                  <GoogleOutlined style={{fontSize: "16px"}} />Google
                </Button>
            )}
        />
    );
};

export default GoogleSingIn;
