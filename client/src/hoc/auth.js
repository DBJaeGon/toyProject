import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchAuth } from '_reducer/userReducer';
import { currentLoc } from '_reducer/headerNavReducer';
import { message } from 'antd';

const auth = (SpectificComponent, option, adminRoute = null) => {   
    // option 설명
    // null 아무나
	// true 로그인만
	// flase 로그인은 불가능
    function AuthenticationCheck() {
        const dispatch = useDispatch();
        const history = useHistory();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(async() => {
            try {
                const response = await dispatch(fetchAuth());
                const { role } = unwrapResult(response);

                if(adminRoute && !role) {
                    message.error('관리자 권한이 필요합니다.');
                    history.push('/');
                    await dispatch(currentLoc(history.location.pathname));
                } else {
                    if(option === null ? false : !option) {
                        history.push('/');
                        await dispatch(currentLoc(history.location.pathname));
                    }
                }
            } catch (error) {
                console.log(error.message);
                if(option) {
                    message.error('로그인이 필요합니다.');
                    history.push('/signIn');
                    await dispatch(currentLoc(history.location.pathname));
                }
            }
        }, [dispatch, history]);

        return (
            <SpectificComponent />
        );
    }

    return AuthenticationCheck;
};

export default auth;