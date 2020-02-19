import React, { Component} from 'react';
import {Button} from 'antd';
import { Popconfirm } from 'antd';

export default class ButtonConfirmationBox extends Component{
    

    

    cancel() {

    }

    render()
    { 
        return(
            <Popconfirm title={"是否"+this.props.buttonText} onConfirm={this.props.action} onCancel={this.cancel}
                        placement={this.arrowPointAtCenter}
                        okText="是"
                        cancelText="否">
                <Button type={this.props.type} htmlType={"button"}
                    style={this.props.buttonStyle} disabled={this.props.disabled}
                >{this.props.buttonText}</Button>
            </Popconfirm>

        );
    }
}