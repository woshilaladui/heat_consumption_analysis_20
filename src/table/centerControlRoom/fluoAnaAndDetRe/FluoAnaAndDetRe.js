import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/TimeShow";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";

import {Input} from 'antd';
import * as actionCreators from "../fluoAnaAndDetRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

import Remark from "./components/Remark";

import moment from 'moment';

const {TextArea} = Input;

// 熟料荧光分析及检测记录
class FluoAnaAndDetRe extends Component {
  returnBack = () => {
    this.props.history.push("/");
  };

  //判定是否已登录，是否有权限
  componentWillMount() {
  }

  componentDidMount() {
    const {data, date, tableName, requestFlag, model_data, model_upperDataFront, model_upperDataLast, getOldData, upperDataFront, upperDataLast, getFrontOldData, getLastOldData} = this.props


    getOldData(
      date,
      tableName,
      deepCopy(model_data)
    );

    //出窑熟料全分析汇总表
    getFrontOldData(
      date,
      "KAS",
      deepCopy(model_upperDataFront)
    );

    //控制室原始记录
    getLastOldData(
      date,
      "CRO",
      deepCopy(model_upperDataLast)
    );


  }

  componentWillReceiveProps(nextProps) {

    const {tableName, getOldData, getFrontOldData, getLastOldData, date,searchFlag} = nextProps; //新的props
    const {model_data,model_upperDataFront,model_upperDataLast} = this.props;

    if (this.props.date != date) {

      getOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(model_data));

      getFrontOldData(moment(date).format("YYYY/MM/DD"), "KAS", deepCopy(model_upperDataFront));

      getLastOldData(moment(date).format("YYYY/MM/DD"), "CRO", deepCopy(model_upperDataLast));

    }
    if (this.props.searchFlag != searchFlag) {
      getOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(model_data));

      getFrontOldData(moment(date).format("YYYY/MM/DD"), "KAS", deepCopy(model_upperDataFront));

      getLastOldData(moment(date).format("YYYY/MM/DD"), "CRO", deepCopy(model_upperDataLast));

    }
  }

  render() {
    return (
      <Fragment/* style={{width: "100%", height: "100%"}}*/>
        <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
          <h1 align="center">熟料荧光分析及检测记录</h1>
          {/*表单最上的时间及人员显示*/}
          <TimeShow/>


          <div
            style={{
              border: "2px solid black",
              margin: "0px 30px 0px 30px"
            }}
          >
            {/*表单上半部分*/}
            <UpperForm/>
            {/* 表单下部分备注框 */}
            <Remark/>
          </div>
        </div>
        <div
          style={{
            float: "right",
            margin: "0px 50px 20px 0px",
            display: "inline-block"
          }}
        >
          {this.props.searchFlag ? (<ButtonConfirmationBox/>) : null}
        </div>
      </Fragment>
    );
  }
}

//定义映射
const mapStateToProps = (state) => {
  return {

    //date: state.getIn(['fluoAnaAndDetRe', 'date']),
    timeChose: state.getIn(['fluoAnaAndDetRe', 'timeChose']),
    data: state.getIn(['fluoAnaAndDetRe', 'data']),
    upperDataFront: state.getIn(['fluoAnaAndDetRe', 'upperDataFront']),
    upperDataLast: state.getIn(['fluoAnaAndDetRe', 'upperDataLast']),
    model_data: state.getIn(['fluoAnaAndDetRe', 'upperDataLast']),
    model_upperDataFront: state.getIn(['fluoAnaAndDetRe', 'upperDataLast']),
    model_upperDataLast: state.getIn(['fluoAnaAndDetRe', 'upperDataLast']),
    requestFlag: state.getIn(['fluoAnaAndDetRe', 'requestFlag']),
    person: state.getIn(['fluoAnaAndDetRe', 'person']),
    tableName: state.getIn(['fluoAnaAndDetRe', 'tableName']),
    date: state.getIn(['searchTable', 'date']),
    searchFlag: state.getIn(['searchTable', 'searchFlag']),

  }
};

const mapDispathToProps = (dispatch) => {
  return {
    getOldData(
      date,
      tableName,
      data
    ) {
      dispatch(
        actionCreators.getData(date, tableName, data)
      );
    },

    getFrontOldData(
      date,
      tableName,
      data
    ) {
      dispatch(actionCreators.getFrontData(
        date,
        tableName,
        data
      ));
    },

    getLastOldData(
      date,
      tableName,
      data
    ) {
      dispatch(actionCreators.getLastData(
        date,
        tableName,
        data
      ));
    }
  }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(FluoAnaAndDetRe);
