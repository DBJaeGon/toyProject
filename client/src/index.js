import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import rootReducer from './_reducer';
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';

const store = configureStore({
  reducer: rootReducer,
  // middleware: [], middlewar custom을 하게 될 경우 배열에 사용할 middlewar들을 추가한다. 하지만 이때 default middleware는 지원되지 않는다.
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat() default middleware에 사용할 middleware를 추가해 사용할 수 있다.
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={koKR}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);