import React, {Component} from 'react';
import {Table} from 'antd';
import "./UpperForm.css";

import {connect} from "react-redux";
import {ZhongKSOrder_RYS} from "../../../../Constant/TableOrder"
import * as actionCreators from "../../RawFAnaRaRe/store/actionCreators";
import {deepCopy} from "../../../../Helper/Copy";

class UpperForm extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         Time: [],//第一列的时间变化自动控制
    //     }
    // }


    /**
     * 第一列的时间变化
     */
    componentWillMount() {

    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {
    }

    render() {
        // 定义表头
        const columns = [
            {
                title: '班次',
                dataIndex: 'Time',
            },
            {
                title: 'SiO2',
                dataIndex: 'SiO2',
            },
            {
                title: 'Al2O3',
                dataIndex: 'Al2O3',
            },
            {
                title: 'Fe2O3',
                dataIndex: 'Fe2O3',
            },
            {
                title: 'Cao',
                dataIndex: 'CaO',
            },
            {
                title: 'MgO',
                dataIndex: 'MgO',
            },
            {
                title: 'KH',
                dataIndex: 'KH',
            },
            {
                title: 'SM',
                dataIndex: 'SM',
            },
            {
                title: 'IM',
                dataIndex: 'IM',
            },
            {
                title: '细度',
                dataIndex: 'XD',
            },
            {
                title: '水分',
                dataIndex: 'SF',
            },
        ];

        const {data,timeChose,allTime,upperDataFront,upperDataLast} = this.props;
        const Data = deepCopy(data);
        const DataFront = deepCopy(upperDataFront);
        const DataLast = deepCopy(upperDataLast);
        const time = deepCopy(allTime);

        const dataSource = [];
        // 中间八行的数据输入
        for (let i = 0; i < 8; i++) {

            //入窑生料化学分析报告单每个班次8行
            const index_Front = i + timeChose * 8;

            //控制室原始记录每个班次表格12行
            const index_Last = i + timeChose * 12;


            const valueFront = DataFront[index_Front]['data'];
            const valueLast = DataLast[index_Last]['data'];


            dataSource.push(
                {
                    Time: time[timeChose][i],
                    SiO2: <span>{isNaN(valueFront[ZhongKSOrder_RYS.SiO2]) ? null : valueFront[ZhongKSOrder_RYS.SiO2]}</span>,
                    Al2O3: <span>{isNaN(valueFront[ZhongKSOrder_RYS.Al2O3]) ? null : valueFront[ZhongKSOrder_RYS.Al2O3]}</span>,
                    Fe2O3: <span>{isNaN(valueFront[ZhongKSOrder_RYS.Fe2O3]) ? null : valueFront[ZhongKSOrder_RYS.Fe2O3]}</span>,
                    CaO: <span>{isNaN(valueFront[ZhongKSOrder_RYS.CaO]) ? null : valueFront[ZhongKSOrder_RYS.CaO]}</span>,
                    MgO: <span>{isNaN(valueFront[ZhongKSOrder_RYS.MgO]) ? null : valueFront[ZhongKSOrder_RYS.MgO]}</span>,
                    KH: <span>{isNaN(valueFront[ZhongKSOrder_RYS.KH]) ? null : valueFront[ZhongKSOrder_RYS.KH]}</span>,
                    SM: <span>{isNaN(valueFront[ZhongKSOrder_RYS.SM]) ? null : valueFront[ZhongKSOrder_RYS.SM]}</span>,
                    IM: <span>{isNaN(valueFront[ZhongKSOrder_RYS.IM]) ? null : valueFront[ZhongKSOrder_RYS.IM]}</span>,
                    XD: <span> {isNaN(valueLast[ZhongKSOrder_RYS.XD]) ? null : valueLast[ZhongKSOrder_RYS.XD]}</span>,
                    SF: <span>{isNaN(valueLast[ZhongKSOrder_RYS.SF]) ? null : valueLast[ZhongKSOrder_RYS.SF]}</span>,
                    // person: Data[hour]['user'],
                    // btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }


        return (
            <div className="upper">
                <Table columns={columns} bordered dataSource={dataSource} pagination={false}/>
            </div>
        )
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {

        date:state.getIn(['ruYSLYGFXJL', 'date']),
        allTime:state.getIn(['ruYSLYGFXJL', 'allTime']),
        timeChose:state.getIn(['ruYSLYGFXJL', 'timeChose']),
        data:state.getIn(['ruYSLYGFXJL', 'data']),
        upperDataFront: state.getIn(['ruYSLYGFXJL', 'upperDataFront']),
        upperDataLast: state.getIn(['ruYSLYGFXJL', 'upperDataLast']),
        requestFlag:state.getIn(['ruYSLYGFXJL', 'requestFlag']),
        person:state.getIn(['ruYSLYGFXJL', 'person']),
        tableName:state.getIn(['ruYSLYGFXJL', 'tableName']),


    }
};

const mapDispathToProps = (dispatch) => {
    return {
        updateChange(NewData) {

            dispatch(actionCreators.updateData({data:deepCopy(NewData)}))
        },

    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(UpperForm);
