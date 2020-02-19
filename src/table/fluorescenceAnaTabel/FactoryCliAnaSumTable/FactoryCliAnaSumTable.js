// import React, {Component, Fragment} from "react";
// import ButtonConfirmationBox from "./components/ButtonConfirmBox";
// import TimeShow from "./components/ShowTime";
// import UpperForm from "./components/UpperForm";
// import "antd/dist/antd.css";
// import moment from "moment";
// import {HYSFormat, ZBFormat} from "../../../package/Format";
// import {checkAuthority} from "../../../Request/RequsetCenter";
// import {Mark, URL} from "../../../Request/Constant";
import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/ShowTime";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";
import moment from "moment";
import {HYSFormat, ZBFormat} from "../../../package/Format";
import {checkAuthority, getOldData, getStandard} from "../../../Request/RequsetCenter";
import {Mark, Standard, URL} from "../../../Request/Constant";
import {getHuaYSJsonData} from "../../../Request/JsonCenter";

// 出厂熟料全分析汇总表
export default class CMRawMatCheAnaRe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format("YYYY-MM-DD"),
            timeChose: 0, //选择的班次 0代表1-7 1代表8-15 2代表16-23
            startValue: [], //从数据库获取的标准
            endValue: [],
            upperData: [
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
            ], //表格数据
            upperData_CRO: [//获取fCaO 从控制室原始记录中获取对应值
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
            ],
            person: "",//传入的值班人员
            t_name: "FAS",//出厂熟料
        };
    }

    /**onRef控制子组件提交表单**/
    onRef = ref => {
        this.BottomForm = ref;
    };

    /**点击提交数据**/
    handleSubmit = () => {
        this.BottomForm.postAllToHome();
    };

    /**
     * 响应班次变化
     **/
    handleTimeChose(x) {
        this.setState({
            timeChose: x
        });
    }

    returnBack = () => {
        this.props.history.push("/index");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {
        checkAuthority(URL.HUAYS_CHECK)
            .then((response)=>{
                if(response === Mark.ERROR){
                    this.props.history.push('/');
                }
            })
            .catch()
    }

    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/
        this.setOldData();

        //获取FCao
        this.setFCao();

        //设置标准
        this.setStandard();
    }


    //检查权限
    // checkAuthority() {
    //     fetch('/api/HuaYS/check', {
    //         method: 'post',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': window.localStorage.authorization,
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data['code'] !== 0)
    //                 this.props.history.push('/');
    //
    //         })
    //         .catch(error => console.error('Error:', error))
    // }

    /**
     * 获取旧数据
     * @param jsondata
     * @param t_name
     */
    // getOldData(jsondata, t_name) {
    //     fetch("/api/HuaYS/query", {
    //         method: "POST",
    //         body: JSON.stringify(jsondata), // data can be `string` or {object}!
    //         headers: {
    //             "Content-Type": "application/json",
    //             'authorization': window.localStorage.authorization,
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data['code'] === 0) {//判定是否成功
    //                 let upperData = this.state.formData;
    //                 let a = HYSFormat(upperData, data['data'], t_name, 1)
    //                 upperData = a[0]
    //                 let startValue = a[1]
    //                 let endValue = a[2]
    //
    //                 console.log(upperData)
    //                 this.setState({//传值给upperData
    //                     upperData: upperData,
    //                     startValue: startValue,
    //                     endValue: endValue,
    //                     person: window.localStorage.name,
    //                 });
    //             }
    //         })
    //         .catch(error => console.error('Error:', error))
    //         .then(response => console.log('Success:', response));
    // }

    /**
     * 获取指标
     * @param t_name
     */
    // getIndex(t_name) {
    //     /**从服务器获取指标**/
    //
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
    //             if (data["code"] === 0 && data["standard"]["t_name"] === t_name) {
    //                 //判定是否成功
    //                 const a = ZBFormat(this.state.startValue, this.state.endValue, data["standard"])
    //                 this.setState({
    //                     startValue: a[0],
    //                     endValue: a[1]
    //                 });
    //             }
    //         })
    //         .catch(error => console.error("Error:", error))
    //         .then(response => console.log("Success:", response));
    // }

    /**
     * 从控制室原始记录中获取对应FCaO
     * @param josndata_cro
     */
    // getFCaO(josndata_cro) {
    //     /**从控制室原始记录中获取对应FCaO**/
    //     fetch("/api/HuaYS/query", {
    //         method: "POST",
    //         body: JSON.stringify(josndata_cro), // data can be `string` or {object}!
    //         headers: {
    //             "Content-Type": "application/json",
    //             'authorization': window.localStorage.authorization,
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data['code'] === 0) {//判定是否成功
    //                 let upperData_CRO = this.state.formData_CRO;
    //                 let a = HYSFormat(upperData_CRO, data['data'], "CRO", 1)
    //                 upperData_CRO = a[0]
    //
    //
    //                 console.log(99)
    //                 console.log(upperData_CRO)
    //                 console.log(99)
    //                 this.setState({//传值给upperData
    //                     formData_CRO: upperData_CRO,
    //                     person: window.localStorage.name,
    //                 });
    //             }
    //         })
    //         .catch(error => console.error('Error:', error))
    //         .then(response => console.log('Success:', response));
    // }

    setStandard() {
        const {t_name, date} = this.state;
        let startValue = this.state.startValue;
        let endValue = this.state.endValue;
        getStandard(URL.HUAYS_STANDARD,{t_name:t_name},t_name,startValue,endValue)
            .then((response) => {
                this.setState(() => ({
                    startValue: response.startValue,
                    endValue: response.endValue
                }))

            })
            .catch()

    }

    setFCao(){
        const {t_name, date} = this.state;
        const josndata_cro = getHuaYSJsonData('CRO', date)
        let tempData = this.state.upperData_CRO;
        getOldData(URL.HUAYS_QUERY, josndata_cro,'CRO', Standard.HAVA, tempData)
            .then((response) => {
                console.log("Fcao")
                console.log(response)
                console.log("Fcao")
                this.setState(() => ({
                    upperData_CRO: response,
                    person: window.localStorage.name,
                }))

            })
            .catch()
    }

    setOldData() {
        const {t_name, date} = this.state;
        const jsondata = getHuaYSJsonData(t_name, date)
        let tempData = this.state.upperData;
        getOldData(URL.HUAYS_QUERY, jsondata, t_name, Standard.HAVA, tempData)
            .then((response) => {
                this.setState(() => ({
                    upperData: response,
                    person: window.localStorage.name,
                }))

            })
            .catch()
    }

    render() {

        return (
            <Fragment style={{width: "100%", height: "100%"}}>
                <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
                    <h1 align="center">出厂熟料全分析汇总表</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow
                        person={this.state.person}
                        handleTimeChose={this.handleTimeChose.bind(this)}
                    />
                    <div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >
                        {/*表单上半部分*/}
                        <UpperForm
                            onRef={this.onRef}
                            startValue={this.state.startValue}
                            endValue={this.state.endValue}
                            timeChose={this.state.timeChose}
                            person={this.state.person}
                            upperData={this.state.upperData}
                            upperData_CRO = {this.state.upperData_CRO}//用于获取原始记录表
                            date={this.state.date}
                            t_name={this.state.t_name}
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
                    <ButtonConfirmationBox
                        type="primary"
                        buttonText="提交"
                        action={this.handleSubmit}
                    />
                </div>
            </Fragment>
        );
    }
}
