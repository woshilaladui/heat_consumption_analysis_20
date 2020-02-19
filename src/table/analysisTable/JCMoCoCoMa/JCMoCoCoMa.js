import React, {Component , Fragment} from 'react';
import ButtonComfirmBox from './components/ButtonConfirmBox';
import TimeShow from './components/ShowTime';
import UpperForm from './components/UpperForm';
import moment from 'moment';
import {HYSFormat_JCM} from "../../../package/Format";
import {checkAuthority, getOldData} from "../../../Request/RequsetCenter";
import {Mark, Standard, URL} from "../../../Request/Constant";
import {getAnalysisJsonData} from "../../../Request/JsonCenter";

//进厂原燃材料水分
export default class JCMoCoCoMa extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format("YYYY/MM/DD"),
            timeChose: 0, //选择的班次 0代表1-7 1代表8-15 2代表16-23
            upperData: [
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}


            ], //表格数据
            person: "",//传入的值班人员
            t_name: "NS_JCM"//进厂原燃材料水分
        };
    }

    /**onRef控制子组件提交表单**/
    onRef = ref => {
        this.UpperForm = ref;
    };

    /**点击提交数据**/
    handleSubmit = () => {
        this.UpperForm.postAllToHome();
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


    }


    setOldData() {
        getOldData(
            URL.HUAYS_QUERY,
            getAnalysisJsonData(this.state.t_name, this.state.date),
            this.state.t_name,
            Standard.NONE,
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

    render(){

        return(
            <Fragment style = {{width:"100%",height:"100%"}}>
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">进厂原燃材料水分</h1>
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
                            person={this.state.person}
                            upperData={this.state.upperData}
                            t_name={this.state.t_name}
                            date={this.state.date}
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
                    <ButtonComfirmBox
                        type="primary"
                        buttonText="提交"
                        action={this.handleSubmit}
                    />
                </div>
            </Fragment>
        )
    }
}