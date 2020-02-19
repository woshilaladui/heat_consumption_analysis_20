import React, {Component} from 'react';
import {Table} from 'antd';
import "./UpperForm.css";

import {connect} from "react-redux";
import {ZhongKSOrder_RYS} from "../../../../Constant/TableOrder"

class UpperForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Time: [],//第一列的时间变化自动控制
        }
    }


    /**
     * 第一列的时间变化
     */
    componentWillMount() {
        const allTime = [
            ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
            ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
            ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        ];
        this.setState({
            Time: [...allTime[this.props.timeChose]],
        })
    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {
        const allTime = [
            ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
            ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
            ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        ];
        this.setState({
            Time: [...allTime[nextProps.timeChose]],
        });
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

        const {upperDataFront, upperDataLast,timeChose} = this.props;
        const DataFront = JSON.parse(JSON.stringify(upperDataFront))
        const DataLast = JSON.parse(JSON.stringify(upperDataLast))
        const data = [];
        // 中间八行的数据输入
        for (let i = 0; i < 8; i++) {
            let hour = i + timeChose * 8;
            const valueFront = DataFront[hour]['t_data'];
            const valueLast = DataLast[hour]['t_data'];
            data.push(
                {
                    Time: this.state.Time[i],
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
                <Table columns={columns} bordered dataSource={data} pagination={false}/>
            </div>
        )
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['ruYSLYGFXJL', 'date']),
        timeChose: state.getIn(['ruYSLYGFXJL', 'timeChose']),
        upperDataFront: state.getIn(['ruYSLYGFXJL', 'upperDataFront']),
        upperDataLast: state.getIn(['ruYSLYGFXJL', 'upperDataLast']),
        bottomData: state.getIn(['ruYSLYGFXJL', 'bottomData']),
        person: state.getIn(['ruYSLYGFXJL', 'person']),
        t_name: state.getIn(['ruYSLYGFXJL', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(UpperForm);
