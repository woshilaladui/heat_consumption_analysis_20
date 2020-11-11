import React, { Component } from 'react';
import { Layout } from 'antd';
import Fheader from './header/Fheader';
import WrappedRegistrationForm from './detail/Detail';

const {Header, Content} = Layout;

class feedBack extends Component{
    render(){
        return (
            <div>
                <Layout>
                    <Header style={{backgroundColor: 'white'}}>
                        <Fheader />
                    </Header>
                </Layout>
                <Layout style={{height:'99%'}}>
                    <Content style={{margin:'1% 1% 0 1%',overflow: 'auto', backgroundColor: 'white'}}>
                        <WrappedRegistrationForm />
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default feedBack;