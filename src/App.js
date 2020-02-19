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
import BurnSysOpRe from './table/centerControlRoom/burnSysOpRe/BurnSysOpRe';
import Iheader from './body/Iheader/Iheader';

moment.locale('zh-cn');

function App() {
    return (
        <div className="App">
            <Provider store={store}  locale={zh_CN}>

                <BrowserRouter>
                    <div>
                        <Router/>
                        <Route path='/table/burnSysOpRe' exact component={BurnSysOpRe}></Route>
                    </div>
                </BrowserRouter>

            </Provider>
        </div>
    );
}

export default App;
