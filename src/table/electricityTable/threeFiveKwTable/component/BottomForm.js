import React, {Component} from 'react';
import {Input, Table} from 'antd';
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";

const { Column, ColumnGroup } = Table;

class BottomForm extends Component {
   
    /**点击暂存之后上传当前行的数据到后台**end**/
    render() {
        /**
         *
         * data是页面数据
         *
         * Data 是拷贝data之后的数据
         *
         */
        /**中间八行的数据输入**start**/
        const dataSource = [];
        const {data, person, date} = this.props;
        const Data = deepCopy(data);
        const value = Data['0']['data'];

        let EX1 = value[3] * 28000 + value[2] * 10000 - value[7] * 16000 - value[8] * 2000 - value[9] * 4000 - value[10] * 16000; 
        let EX2 = value[4] * 7000 - value[11] * 6000;
        let EX3 = value[7] * 16000 + value[9] * 4000 + value[10] * 16000;
        let EX4 = value[0] * 42000 + value[2] * 10000 - value[8] * 2000 - EX3 ;
        let EX5 = EX4;
        let EX6 = (EX4 * EX3)/(EX3 + value[11] * 6000);
        let EX7 = value[2] * 10000 + value[3] * 28000;

        Input.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }

        dataSource.push({
            EX1: <span>
                    <Input
                        defaultValue={''}
                        value={isNaN(EX1) ? null : EX1}
                    />
                </span>,
            EX2: <span>
                    <Input
                        defaultValue={''}
                        value={isNaN(EX2) ? null : EX2}
                    />
                </span>,
            EX3: <span>
                    <Input
                        defaultValue={''}
                        value={isNaN(EX3) ? null : EX3}
                    />
                </span>,
            EX4: <span>
                    <Input
                        defaultValue={''}
                        value={isNaN(EX4) ? null : EX4}
                    />
                </span>,
            EX5: <span>
                    <Input
                        defaultValue={''}
                        value={isNaN(EX5) ? null : EX5}
                    />
                </span>,
            EX6: <span>
                    <Input
                        defaultValue={''}
                        value={isNaN(EX6) ? null : EX6}
                    />
                </span>,
            EX7: <span>
                    <Input
                        defaultValue={''}
                        value={isNaN(EX7) ? null : EX7}
                    />
                </span>
        })

        /**中间八行的数据输入**end**/

        return (
            <Table bordered pagination={false} dataSource={dataSource}>
                <Column title="311+余-603-607" dataIndex="EX1" key="EX1" />
                <Column title="313-608" dataIndex="EX2" key="EX2" />
                <Column title="合计" dataIndex="EX3" key="EX3" />
                <Column title="第25行" dataIndex="EX4" key="EX4" />
                <Column title="第26行" dataIndex="EX5" key="EX5" />
                <Column title="第27行" dataIndex="EX6" key="EX6" />
                <Column title="第29行" dataIndex="EX7" key="EX7" />
            </Table>
        );
    }

}

//定义映射
const mapStateToProps = (state) => {
    return {
        data: state.getIn(['threeFiveKwTable', 'data']),
        person: state.getIn(['threeFiveKwTable', 'person']),
        tableName: state.getIn(['threeFiveKwTable', 'tableName']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
        date: state.getIn(['searchTable', 'date']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {


    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(BottomForm);