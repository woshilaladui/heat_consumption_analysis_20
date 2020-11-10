import React from 'react'
import {Table, Input, Button, message, Popconfirm} from 'antd';
import './HuayanshiRibao.css';
import './TableJCYCL/TableJCYCL';
import {Standard, URL} from "../../../Request/Constant";
import {getHuaYSJsonData} from "../../../Request/JsonCenter";
import TableJCYCL from "./TableJCYCL/TableJCYCL";
import TableMGY from "./TableMGY";
import TableWLXN from "./TableWLXN";
import TableSLFX from "./TableSLFX";
import TableRaw from "./TableRaw/TableRaw";
import TableCTR from "./TableCTR";
import moment from "moment";
import {HYSFormat, ZKSFormat} from "../../../package/Format";
import ReactToPrint from "react-to-print";



/*****************************************化验室日报*************************************************/
export default class HuayanshiRibao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format("YYYY-MM-DD"),

        }
    }
    componentDidMount() {

    }


    render() {
                return (
                    <div ref={(el) => this.refs = el}>
                        <br/>
                        <h1 className="huayanshi">化验室日报</h1>
                        <div id="containerhuayanshi" className="biaozhun">
                            <div className="JCYCL">
                                <TableJCYCL/>
                            </div>
                            <div className="MGY">
                                <TableMGY/>
                            </div>
                            <div className="Raw">
                                <TableRaw/>
                            </div>
                            <div className="SLFX">
                                <TableSLFX/>
                            </div>
                            <div className="WLXN">
                                <TableWLXN/>
                            </div>
                            <div className="ctr">
                                <TableCTR/>
                            </div>
                        </div>
                        <div
                            style={{
                                float: "right",
                                margin: "0px 50px 20px 0px",
                                display: "inline-block"
                            }}
                        >
                          <ReactToPrint
                            trigger={
                              () => <a href="#">
                                <Button type='primary' style={{marginTop: 10}}>打印</Button>
                              </a>
                            }
                            content={() => this.refs}
                          />

                        </div>

                    </div>

                );
            }
        }
/**************************************化验室日报**************************************************/