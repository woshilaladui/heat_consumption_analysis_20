import React from "react";
import {Input, Button, message, Divider, Form, Icon, Layout, Menu} from 'antd';
import "./user.css"
import UserHeader from './userHeader'
import UserContent from './userContent'

const {Header, Content, Footer} = Layout;
 export default class user extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          choose_num: 0,
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }
   onChangeNum(e) {
     this.setState({
       choose_num: e
     });
     console.log(e);
   }
    componentWillMount() {

    }
     handleSubmit = e => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
             if (!err) {
                 console.log('Received values of form: ', values);
             }
         });
     };

    render() {

        return (
          <div >
              <Layout >
                  <Header style={{backgroundColor: 'white'}}>
                     <UserHeader choose={this.state.choose_num} onChange={this.onChangeNum.bind(this)}/>
                  </Header>
              </Layout>
              <Layout>
                <UserContent choose={this.state.choose_num} />
              </Layout>
          </div>

                // {/*<a>输入旧密码：</a>*/}
                // {/*<Input style={{width: '10%'}} onBlur={this.changeOldPwd}/><br/>*/}
                // {/*<a>输入新密码：</a>*/}
                // {/*<Input style={{width: '10%'}} onBlur={this.changeNewPwd}/><br/>*/}
                // {/*<a>确认新密码：</a>*/}
                // {/*<Input style={{width: '10%'}} onBlur={this.confirmNewPwd}/><br/>*/}
                // {/*<Button onClick={this.changePwd}>确认</Button>*/}
            // </div>
        )
    }

}
// const WrappedNormalLoginForm = Form.create()(user);
// export default WrappedNormalLoginForm