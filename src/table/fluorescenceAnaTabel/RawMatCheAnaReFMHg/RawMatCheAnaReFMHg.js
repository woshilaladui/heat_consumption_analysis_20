import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/ShowTime";
import UpperForm from "./components/Upperform";
import "antd/dist/antd.css";
import moment from "moment";
import {HYSFormat, ZBFormat} from "../../../package/Format"
import {checkAuthority, getOldData, getStandard} from "../../../Request/RequsetCenter";
import {URL, Table, Mark, Standard} from "../../../Request/Constant"
import {getHuaYSJsonData} from "../../../Request/JsonCenter";

// 进厂原材料分析化学报告单（干煤粉灰）
export default class RuYaoSLYCLHXFXBGDFMHg extends Component {
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
            person: "",//传入的值班人员
            t_name: "RMA_FMHg",//石灰石
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
        this.props.history.push("/");
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
        /**首先查询当前页面是否有历史纪录并赋值upperData**/
        //获取请求参数
        this.setOldData();

        //设置标准
        this.setStandard();

    }


    setStandard() {
        getStandard(
            URL.HUAYS_STANDARD,
            {t_name:this.state.t_name},
            this.state.t_name,
            this.state.startValue,
            this.state.endValue)
            .then((response) => {
                this.setState(() => ({
                    startValue: response.startValue,
                    endValue: response.endValue
                }))

            })
            .catch()
    }

    setOldData() {
        getOldData(
            URL.HUAYS_QUERY,
            getHuaYSJsonData(this.state.t_name, this.state.date),
            this.state.t_name,
            Standard.HAVA,
            this.state.upperData
        )
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
                    <h1 align="center">进厂粉煤灰(干)原材料分析化学报告单</h1>

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
