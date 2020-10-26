import {
  ListInfoPDF,
  ListInfoPDFButton,
  LogList
} from '../style';
import {List, DatePicker, Input} from "antd";
import React from "react";
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

// const { Column, ColumnGroup } = Table;

class UpperForm extends React.Component {

  changeTime = (timeData) => {
    // console.log("timeData" + timeData)
    const date = new Date(timeData);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  render() {


    // let date = new Date(time);//转换成中国标准时间:Mon Dec 10 2018 00:00:00 GMT+0800 (中国标准时间)
    // return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    Input.defaultProps = {
      disabled: !this.props.searchFlag,
      style: this.props.searchFlag ? {} : {opacity: "1", color: "black"},
    }
    const column = [
      {
        title1: '用户',
        title2: '时间',
        title3: '操作'
      }
    ];
    return (
      <LogList>
        <List
          dataSource={column}
          renderItem={item => (
            <List.Item>
              <ListInfoPDFButton>{item.title1}</ListInfoPDFButton>
              <ListInfoPDFButton>{item.title2}</ListInfoPDFButton>
              <ListInfoPDF>{item.title3}</ListInfoPDF>

            </List.Item>
          )}
        />
        <hr/>
        <List
          pagination={5}
          loading={this.props.loadFlag}
          dataSource={this.props.data.logRecord}
          renderItem={item => (
            <List.Item>
              <ListInfoPDFButton>{item.username}</ListInfoPDFButton>
              <ListInfoPDFButton>{this.changeTime(item.time)}</ListInfoPDFButton>
              <ListInfoPDF>{item.operation}</ListInfoPDF>
            </List.Item>
          )}
        />
      </LogList>

    )
  }
}

//定义映射
const mapStateToProps = (state) => {
  return {
    date: state.getIn(['log', 'date']),
    data: state.getIn(['log', 'data']),
    person: state.getIn(['log', 'person']),
    tableName: state.getIn(['log', 'tableName']),
    loadFlag: state.getIn(['log', 'loadFlag']),
    searchdate: state.getIn(['searchTable', 'date']),
    searchFlag: state.getIn(['searchTable', 'searchFlag']),
  }
}

const mapDispathToProps = (dispatch) => {
  return {

    //上表暂存一行数据

  }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(UpperForm);