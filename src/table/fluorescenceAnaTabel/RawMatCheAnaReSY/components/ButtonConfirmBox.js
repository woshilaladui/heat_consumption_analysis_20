import React, { Component} from 'react';
import {Button} from 'antd';
import { Popconfirm } from 'antd';

class ButtonConfirmationBox extends Component{
    

    

    cancel() {

    }

    render()
    { 
        return(
            <Popconfirm title={"是否"+this.props.buttonText} onConfirm={this.props.action} onCancel={this.cancel}
                        placement={this.arrowPointAtCenter}
                        okText="是"
                        cancelText="否">
                <Button type={this.props.type} size={"large"} htmlType={"button"}
                        style={{
                            margin:'20px 5px 0px 5px'
                        }}
                >{this.props.buttonText}</Button>
            </Popconfirm>

        );
    }
}
export default ButtonConfirmationBox;