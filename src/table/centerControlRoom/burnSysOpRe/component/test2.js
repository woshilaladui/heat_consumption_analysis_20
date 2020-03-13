import React, {Component} from "react";
import { Table, Tag } from 'antd';

export default class Test2 extends Component{
    render() {


        const columns = [
            {
                title:"a",
                dataIndex:"index_a",
                render:(text,row,index)=>{
                    if(index < 4){
                        return{
                            children:<a>{text}</a>,
                            props:{

                            }
                        }
                    }

                    else if(index === 4){
                        return {
                            children:<a>{text}</a>,
                            props:{
                                colSpan:5
                            }
                        }
                    }
                }
            },
            {
                title:"b",
                dataIndex:"index_b",

            },
            {
                title:"c",
                dataIndex:"index_c"
            }
        ];

        const dataSource =[{
            index_a:"zhang",
            index_b:"asd",
            index_c:"aaaa"
        },{},{},{},{}];




        return (
            <div className="upper">
                {/*表格填写*/}
                <Table
                    className="pper_table" columns={columns} bordered
                    dataSource={dataSource} showHeader={true} pagination={false}
                />

            </div>
        );

    }
}