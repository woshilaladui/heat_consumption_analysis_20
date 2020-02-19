import React from 'react';
import {Table, Input, Button, message,Popconfirm} from 'antd';
import moment from "moment";
import {getOldData} from "../../../Request/RequsetCenter";
import {Standard, URL} from "../../../Request/Constant";
import {getHuaYSJsonData} from "../../../Request/JsonCenter";

//化验室日报--物理性能
export default class TableWLXN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format("YYYY-MM-DD"),
            CYData: [
                {t_data: []}, {t_data: []},{t_data: []}, {t_data: []},
                {t_data: []}
            ],
            CCData: [
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []},{t_data: []},{t_data: []},{t_data: []},
                {t_data: []},{t_data: []},{t_data: []},{t_data: []},
                {t_data: []}

            ],
        }
    }
    componentDidMount() {
        this.setCY();
        this.setCC();
    }
    setCY() {//拿到出窑物理性能的数据
        getOldData(
            URL.HUAYS_QUERY,
            getHuaYSJsonData("NS_CYT", this.state.date),
            "NS_CYT",
            Standard.NONE,
            this.state.CYData
        )
            .then((response) => {
                this.setState(() => ({
                    CYData: response,
                    person: window.localStorage.name,
                }))
                console.log("CYData")
                console.log(this.state.CYData)
                console.log("CYData")
            }
       )

            .catch()
    }
    setCC() {//拿到出窑物理性能的数据
        getOldData(
            URL.HUAYS_QUERY,
            getHuaYSJsonData("NS_CCT", this.state.date),
            "NS_CCT",
            Standard.NONE,
            this.state.CCData
        )
            .then((response) => {
                this.setState(() => ({
                    CCData: response,
                    person: window.localStorage.name,
                }))
                console.log("CCData")
                console.log(this.state.CCData)
                console.log("CCData")
            })

            .catch()
    }
    render(){
        const dataw = [];//物理性能
        const timew = ['出窑熟料', '出厂熟料'];
        const shouliaowulixingneng = ['熟料物理性能', '熟料物理性能'];
        //const andingxing = ['合格', '合格'];

        const columnshw = [
            {
                title: '物理性能',
                key: 'wlxn',
                dataIndex: 'wlxn',
                // //width:"6%"
                render: (value, row,
                         index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 0) {

                        obj.props.rowSpan = 2;
                    }
                    if (index === 1) {

                        obj.props.rowSpan = 0;
                    }


                    return obj;
                },
            },
            {
                title: '项目',
                key: 'xiangmu',
                dataIndex: 'xiangmu',
                // //width:"6%"
            },
            {
                title: '安定性',
                key: 'andingxinghg',
                dataIndex:
                    'andingxinghg',
                // //width:"6%"
            },
            {
                title: '初凝min',
                key: 'chuning',
                dataIndex: 'chuning',
                // //width:"6%"
            },
            {
                title: '终凝min',
                key: 'zhongning',
                dataIndex:
                    'zhongning',
                // //width:"6%"
            },
            {
                title: 'SO3',
                key: 'SO3',
                dataIndex: 'SO3',
                // //width:"6%"
            },
            {
                title: '比表面积',
                key: 'Bibiaomianji',
                dataIndex:
                    'Bibiaomianji',
                // //width:"6%"
            },
            {
                title: '三天抗折',
                key: 'santiankangzhe',
                dataIndex:
                    'santiankangzhe',
                // //width:"6%"

            },
            {
                title: '三天抗压',
                key: 'santiankangya',
                dataIndex:
                    'santiankangya',
                // //width:"6%"

            },
            {
                title: '上月28天抗折',
                key: 'lM28kz',
                dataIndex:
                    'lM28kz',
                // //width:"6%"

            },
            {
                title: '上月28天抗压',
                key: 'lM28ky',
                dataIndex:
                    'lM28ky',
                // //width:"6%"

            },
            {
                title: '稠度',
                key: 'choudu',
                dataIndex: 'choudu',
                // //width:"6%"
            },
            {
                title: '28天抗压S',
                key: 'tiankangya28',
                dataIndex:
                    'tiankangya28',
                // //width:"6%"
            },
            {
                title: '出厂熟料合格',
                key:
                    'chuchangshuini',
                dataIndex:
                    'chuchangshuini',
                // //width:"6%"
            },
            {
                title: '富裕强度合格',
                key: 'fuyuqiangdu',
                dataIndex:
                    'fuyuqiangdu',
                // //width:"6%"
            },


        ];
        dataw.push({
            wlxn: shouliaowulixingneng[0],
            xiangmu: timew[0],
            andingxinghg:this.state.CYData[0]['t_data'][0],
            chuning:this.state.CYData[1]['t_data'][0],
            zhongning:this.state.CYData[2]['t_data'][0],
            SO3:this.state.CYData[3]['t_data'][0],
            Bibiaomianji:this.state.CYData[4]['t_data'][0],

        })
        dataw.push({
            wlxn: shouliaowulixingneng[1],
            xiangmu: timew[1],
            andingxinghg:this.state.CCData[0]['t_data'][0],
            chuning:this.state.CCData[1]['t_data'][0],
            zhongning:this.state.CCData[2]['t_data'][0],
            SO3:this.state.CCData[3]['t_data'][0],
            Bibiaomianji:this.state.CCData[4]['t_data'][0],
            santiankangzhe:this.state.CCData[5]['t_data'][0],
            santiankangya:this.state.CCData[6]['t_data'][0],
            lM28kz:this.state.CCData[7]['t_data'][0],
            lM28ky:this.state.CCData[8]['t_data'][0],
            choudu:this.state.CCData[9]['t_data'][0],
            tiankangya28:this.state.CCData[10]['t_data'][0],
            chuchangshuini:this.state.CCData[11]['t_data'][0],
            fuyuqiangdu:this.state.CCData[12]['t_data'][0],

        })
        return(
            <div>
                <Table  columns={columnshw}  bordered dataSource={dataw}pagination={false}/>
            </div>
        );
}

}