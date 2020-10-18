import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/TimeShow";
import UpperForm from "./components/UpperForm";
import BottomForm from './components/BottomForm';
import "antd/dist/antd.css";
import {checkAuthority} from "../../../Request/RequsetCenter";
import {Mark, URL} from "../../../Request/Constant";
import * as actionCreators from "./store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";
import moment from "moment";

// 临城中联福石控制室原始记录
class CMRawMatCheAnaRe extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         date: moment().format("YYYY-MM-DD"),
    //         timeChose: 0, //选择的班次 0代表1-7 1代表8-15 2代表16-23
    //         startValue: [], //从数据库获取的标准
    //         endValue: [],
    //         upperData: [
    //             {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
    //             {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
    //
    //             {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
    //             {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
    //
    //             {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
    //             {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    //         ], //表格数据
    //         //bottomData: [[[], [], [], [], ''], [[], [], [], [], ''], [[], [], [], [], '']],
    //         person: "", //传入的值班人员
    //         t_name: "CRO"
    //     };
    // }

    // /**onRef控制子组件提交表单**/
    // onRef = ref => {
    //     this.BottomForm = ref;
    // };

    // /**点击提交数据**/
    // handleSubmit = () => {
    //     this.BottomForm.postToHome();
    // };

    // /**
    //  * 响应班次变化
    //  **/
    // handleTimeChose(x) {
    //     this.setState({
    //         timeChose: x
    //     });
    // }

    returnBack = () => {
        this.props.history.push("/");
    };

    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/
        const {data, date, tableName, setOldData,modelData} = this.props;

        setOldData(date,tableName,deepCopy(modelData));


    }
    //判定是否已登录，是否有权限
    componentWillMount() {
        // checkAuthority(URL.HUAYS_CHECK)
        //     .then((response)=>{
        //         if(response === Mark.ERROR){
        //             this.props.history.push('/');
        //         }
        //     })
        //     .catch()

        // const {_upperData, _bottomData, requestFlag, date, t_name, setOldData, setOldStandard, startValue, endValue} = this.props;
        // if (requestFlag) {
        //     const tempStartValue = deepCopy(startValue)//JSON.parse(JSON.stringify(startValue))
        //     const tempEndValue = deepCopy(endValue)//JSON.parse(JSON.stringify(endValue))
        //      const tempUpperData = deepCopy(_upperData);
        //      const tempBottomData = deepCopy(_bottomData)
        //      console.log("temp")
        //     console.log(tempUpperData)
        //     console.log(JSON.parse(JSON.stringify(_upperData)))
        //     console.log("temp")
        //     // console.log("temp"+tempUpperData)
        //     // console.log("temp"+tempBottomData)
        //     // console.log("temp"+JSON.parse(JSON.stringify(_upperData)))
        //     // console.log("temp"+JSON.parse(JSON.stringify(_bottomData)))
        //     setOldStandard(tempStartValue, tempEndValue,t_name);
        //     setOldData(t_name,date,tempUpperData,tempBottomData);
        //
        // }
    }

    componentWillReceiveProps(nextProps){
        const { tableName, setOldData, date,searchFlag } = nextProps; //新的props
        const {modelData} = this.props;


        if(this.props.date != date){
            setOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
        }
        if(this.props.searchFlag != searchFlag){
            setOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
        }
    }

    // componentDidMount() {
    //     /**首先查询当前页面是否有历史纪录并赋值formData**/
    //
    //     const {t_name, date} = this.state;
    //     const jsondata = {
    //         startdate: date,
    //         starthour: 0,
    //         enddate: date,
    //         endhour: 23,
    //         t_name: t_name,
    //         t_type: 0
    //     };
    //     fetch("/api/HuaYS/query", {
    //         method: "POST",
    //         body: JSON.stringify(jsondata), // data can be `string` or {object}!
    //         headers: {
    //             "Content-Type": "application/json",
    //             'authorization': window.localStorage.authorization,
    //         }
    //     })
    //         .then(res =>{res.json()
    //         })
    //         .then(data => {
    //             if (data['code'] === 0) {//判定是否成功
    //
    //                 console.log(554)
    //                 console.log(data['data'])
    //                 console.log(554)
    //
    //                 let upperData = this.state.upperData
    //                // let bottomData = this.state.bottomData
    //                 //返回一个[upperData, startValue, endValue]数组
    //                 let a = HYSFormat(upperData, data['data'], t_name, 1)
    //                 upperData = a[0]
    //                 let startValue = a[1]
    //                 let endValue = a[2]
    //               //  bottomData = HYSFormat(bottomData, data['data'], t_name, 2)
    //                 console.log(556)
    //                 console.log(upperData)
    //                 //console.log(bottomData)
    //                 console.log(556)
    //                 this.setState({//传值给upperData
    //                     upperData: upperData,
    //                     //bottomData: bottomData,
    //                     startValue: startValue,
    //                     endValue: endValue,
    //                     person: window.localStorage.name,
    //                 });
    //             }
    //         })
    //         .catch(error => console.error('Error:', error))
    //
    //     /**从服务器获取指标**/
    //     fetch("/api/standard/query", {
    //         method: "POST",
    //         body: JSON.stringify({t_name: t_name}), // data can be `string` or {object}!
    //         headers: {
    //             "Content-Type": "application/json",
    //             'authorization': window.localStorage.authorization,
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             //判定是否成功
    //             if (data["code"] === 0 && data["standard"]["t_name"] === t_name) {
    //                 //返回[startValue, endValue]数组
    //                 const a = ZBFormat(this.state.startValue, this.state.endValue, data["standard"])
    //                 this.setState({
    //                     startValue: a[0],
    //                     endValue: a[1]
    //                 });
    //             }
    //         })
    // }

    render() {
        return (
          <Fragment /*style={{width: "100%", height: "100%"}}*/>
                <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
                    <h1 align="center">临城中联福石控制室原始记录</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow
                        // person={this.state.person}
                        // handleTimeChose={this.handleTimeChose.bind(this)}
                    />
                    <div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >
                        {/*表单上半部分*/}
                        <UpperForm
                            // onRef={this.onRef}
                            // startValue={this.state.startValue}
                            // endValue={this.state.endValue}
                            // timeChose={this.state.timeChose}
                            // person={this.state.person}
                            // upperData={deepCopy(this.state.upperData)}
                            // date={this.state.date}
                            // t_name={this.state.t_name}
                        />
                        {/* 表单下部分 */}
                        <BottomForm
                            // onRef={this.onRef}
                            // timeChose={this.state.timeChose}
                            // person={this.state.person}
                            // bottomData={this.state.bottomData}
                            // startValue={this.state.startValue}
                            // endValue={this.state.endValue}
                            // date={this.state.date}
                        />
                    </div>
                </div>
                <div
                    style={{
                        float: "right",
                        margin: "0px 50px 20px 0px",
                        display: "inline-block"
                    }}
                >
                    {this.props.searchFlag ? (<ButtonConfirmationBox />) : null}
                </div>
            </Fragment>
        );
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {
        //date:state.getIn(['ControlRoomOriginalRe', 'date']),
        timeChose:state.getIn(['ControlRoomOriginalRe', 'timeChose']),
        data:state.getIn(['ControlRoomOriginalRe', 'data']),
        modelData:state.getIn(['ControlRoomOriginalRe', 'modelData']),
        requestFlag:state.getIn(['ControlRoomOriginalRe', 'requestFlag']),
        person:state.getIn(['ControlRoomOriginalRe', 'person']),
        tableName:state.getIn(['ControlRoomOriginalRe', 'tableName']),
        startValue: state.getIn(['ControlRoomOriginalRe', 'startValue']),
        endValue: state.getIn(['ControlRoomOriginalRe', 'endValue']),
        date:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(date,tableName,data){
            dispatch(actionCreators.getData(date,tableName,data))
        },

        setOldStandard(startValue, endValue,tableName) {
            dispatch(actionCreators.getOldStandard(tableName, startValue, endValue))
        }
    }//end return
}

//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispathToProps)(CMRawMatCheAnaRe);
