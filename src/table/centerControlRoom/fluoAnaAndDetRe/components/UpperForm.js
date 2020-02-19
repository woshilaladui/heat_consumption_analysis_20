import React, {Component} from 'react';
import {Table} from 'antd';
import {ZhongKSOrder_FAD} from "../../../../Constant/TableOrder";
import {connect} from "react-redux";


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




    //控制输入框的样式
    changeStyle = (value) => {
        if (value) {
            if (isNaN(value) || value > 100) {
                return {
                    borderColor: 'red',
                    color: 'red',
                }
            }
        }
    };

    render() {

        // 表头
        const columns = [
            {
                title: '时间',
                key: 'time',
                dataIndex: 'time',
                width: "10%"
            },
            {
                title: 'SiO2',
                dataIndex: 'SiO2',
                width: "7%"
            },
            {
                title: 'Al2O3',
                dataIndex: 'Al2O3',
                width: "7%"
            },
            {
                title: 'Fe2O3',
                dataIndex: 'Fe2O3',
                width: "7%"
            },
            {
                title: 'CaO',
                dataIndex: 'CaO',
                width: "7%"
            },
            {
                title: 'MgO',
                dataIndex: 'MgO',
                width: "7%"
            },
            {
                title: 'KH',
                dataIndex: 'KH',
                width: "7%"
            },
            {
                title: 'SM',
                dataIndex: 'SM',
                width: "7%"
            },
            {
                title: 'IM',
                dataIndex: 'IM',
                width: "7%"
            },
            {
                title: '立升重',
                dataIndex: 'LSZ',
                width: "7%"
            },
            {
                title: 'f-CaO',
                dataIndex: 'fCaO',
                width: "7%"
            },
            // {
            //     title: '人员',
            //     key: 'person',
            //     dataIndex: 'person',
            //     width: "10%"
            // },
            // {
            //     title: '暂存',
            //     key: 'btn_save',
            //     dataIndex: 'btn_save',
            //     width: "10%"
            // }
        ];
        const {upperDataFront, upperDataLast,upperDataLSZ,timeChose} = this.props;
        const DataFront = JSON.parse(JSON.stringify(upperDataFront))
        const DataLast = JSON.parse(JSON.stringify(upperDataLast))
        const DataLSZ = JSON.parse(JSON.stringify(upperDataLSZ))
        const data = [];

        const LSZ = DataLSZ[2+timeChose]['t_data'][4];
        for (let i = 0; i < 8; i++) {

            let hour = i + timeChose * 8;
            const valueFront = DataFront[hour]['t_data'];
            const valueLast = DataLast[hour]['t_data'];

            data.push(
                {
                    time: this.state.Time[i],
                    SiO2:
                        <span>{isNaN(valueFront[ZhongKSOrder_FAD.SiO2]) ? null : valueFront[ZhongKSOrder_FAD.SiO2]}</span>,
                    Al2O3:
                        <span>{isNaN(valueFront[ZhongKSOrder_FAD.Al2O3]) ? null : valueFront[ZhongKSOrder_FAD.Al2O3]}</span>,
                    Fe2O3:
                        <span>{isNaN(valueFront[ZhongKSOrder_FAD.Fe2O3]) ? null : valueFront[ZhongKSOrder_FAD.Fe2O3]}</span>,
                    CaO:
                        <span>{isNaN(valueFront[ZhongKSOrder_FAD.CaO]) ? null : valueFront[ZhongKSOrder_FAD.CaO]}</span>,
                    MgO:
                        <span>{isNaN(valueFront[ZhongKSOrder_FAD.MgO]) ? null : valueFront[ZhongKSOrder_FAD.MgO]}</span>,
                    KH:
                        <span>{isNaN(valueFront[ZhongKSOrder_FAD.KH]) ? null : valueFront[ZhongKSOrder_FAD.KH]}</span>,
                    SM:
                        <span>{isNaN(valueFront[ZhongKSOrder_FAD.SM]) ? null : valueFront[ZhongKSOrder_FAD.SM]}</span>,
                    IM:
                        <span>{isNaN(valueFront[ZhongKSOrder_FAD.IM]) ? null : valueFront[ZhongKSOrder_FAD.IM]}</span>,
                    LSZ:
                        <span>{isNaN(LSZ) ? null : LSZ}</span>,//每个班只测2次，取其平均值然后这个班8个小时都是同样的值
                    fCaO:
                        <span>{isNaN(valueLast[ZhongKSOrder_FAD.fCaO]) ? null : valueLast[ZhongKSOrder_FAD.fCaO]}</span>,
                    // person:
                    //     Data[hour]['name'],
                    // btn_save:
                    //     <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }

        return (
            <div className="upper">
                {/*表格填写*/}
                <Table columns={columns} bordered dataSource={data} pagination={false}/>
            </div>
        );
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['fluoAnaAndDetRe', 'date']),
        timeChose: state.getIn(['fluoAnaAndDetRe', 'timeChose']),
        upperDataFront: state.getIn(['fluoAnaAndDetRe', 'upperDataFront']),
        upperDataLast: state.getIn(['fluoAnaAndDetRe', 'upperDataLast']),
        upperDataLSZ: state.getIn(['fluoAnaAndDetRe', 'upperDataLSZ']),
        bottomData: state.getIn(['fluoAnaAndDetRe', 'bottomData']),
        person: state.getIn(['fluoAnaAndDetRe', 'person']),
        t_name: state.getIn(['fluoAnaAndDetRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {}//end return
}

export default connect(mapStateToProps, mapDispathToProps)(UpperForm);