import React from 'react';
import './App.css';
import Router from './route/router';
import {BrowserRouter, Route} from 'react-router-dom';
import {LocaleProvider} from 'antd';
import {Provider} from 'react-redux';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import store from './store';
// import {persistStore } from 'redux-persist';
//
// import {PersistGate} from 'redux-persist/lib/integration/react';

moment.locale('zh-cn');
// const persistor = persistStore(store);
function App() {
  return (
    <div className="App">
      <Provider store={store} locale={zh_CN}>
          {/*<PersistGate loading={null} persistor={persistor}>*/}
          <BrowserRouter>
            {/*基于url的pathname段*/}
            <div>
              <Router/>
              {/*<Route path='/table/burnSysOpRe' exact component={BurnSysOpRe}></Route>*/}
            </div>
          </BrowserRouter>
        {/*</PersistGate>*/}
      </Provider>
    </div>
  );
}

export default App;
