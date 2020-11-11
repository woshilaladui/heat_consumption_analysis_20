import React, {Component} from 'react';
import './Ibody.css'
import $ from 'jquery';
import {Drawer, Divider, Col, Row, Card} from 'antd';
import {OverPack} from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import img1 from "../../img/survey/1.jpg";
import img2 from '../../img/survey/2.jpg';
import img3 from '../../img/survey/3.jpg';
import img4 from '../../img/survey/4.jpg';
import img5 from '../../img/survey/bjsnfh.jpg';
import img6 from '../../img/survey/changhuashiye.jpg';
import img7 from '../../img/survey/djjsnhy.jpg';
import img8 from '../../img/survey/highway01.jpg';

/***蚂蚁抽屉定义开始***/

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
  textAlign: 'center',
};

const DescriptionItem = ({title, content}) => {
  return (
    <div
      style={{
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 7,
        color: 'rgba(0,0,0,0.65)',
      }}
    >
      <p
        style={{
          marginRight: 8,
          display: 'inline-block',
          color: 'rgba(0,0,0,0.85)',
        }}
      >
        {title}:
      </p>
      {content}
    </div>
  );
};

/***蚂蚁抽屉定义结束***/

/***蚂蚁卡片定义开始***/
const {Meta} = Card;
/***蚂蚁卡片定义结束***/


export default class Ibody_share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*蚂蚁抽屉属性*/
      visible: false,
      // 初始数据
      data: [
        {   "id": '1',
          "title": '中国水泥工业环境状况本底数据收集与调查',
          "content": `本课题拟对我国水泥生产线的规模、产能、装备、工艺、产品质量进行格局分布调查，摸清水泥工业结构构成及区域特征，分区域对我国水泥工业资源消耗、能源
                                消耗、可替代燃料和协同处置固体废物状况、常规和非常规污染物排放的基本数据进行初步收集，为深度调查样本的确定及其它课题的开展奠定基础。`,
          "img": img1
        },
        {
          "id" : '2',
          "title": '水泥工业资源消耗状况及其对环境影响的调查研究',
          "content": `为全面掌握我国水泥工业生产中石灰质、
                                硅铝质等大宗原料及其它辅助原料资源消耗状况及其对环境的影响，本课题拟对水泥工业资源消耗状况进行深度调查、分析与研究，其中包括主要原材料种类、
                                储量、开采量、辅助原料利用情况、水泥熟料和水泥生产原材料消耗情况、典型矿山开采工艺过程对生态环境影响等，以明确水泥工业资源消耗及其对环境影响机制与规律。`,
          "img": img2
        },
        {
          "id" : '3',
          "title": '水泥工业能源消耗水平及其对环境影响的调查研究',
          "content": `本课题主要负责水泥工业能源消耗水平及其对环境影响的调查研究。在前期已有工作基础上，实时结合课题1的调查结果，对抽取出的样本空间中水泥生产企业的能源消耗
                                状况进行深度调查、分析及研究，按水泥生产单元分类收集煤、电、替代燃料等能源的消耗情况的基础数据，并初步分析出水泥工业能源消耗的影响因素及规律。`,
          "img": img3
        },
        {
          "id" : '4',
          "title": '水泥生产替代燃料应用和协同处置废物对环境状况影响调查',
          "content": `本课题拟对水泥生产过程中替代燃料应用、协同处置废物的基本情况及对环境状况的影响进行调查研究。在课题1、2、3基础上，将水泥生产中应用替代燃料、协同处置废
                                的有代表性的样本提取出来，有针对性的展开其对环境影响的调查研究，从而获得全国水泥生产替代燃料、协同处置废物的基本信息，并初步掌握替代燃料、协同处置废物等技术对环境影响的基本规律。`,
          "img": img4
        },
        {
          "id" : '5',
          "title": '常规污染物排放水平及其对环境影响的调查研究（课题负责人：刘宇）',
          "content": `本课题主要负责水泥工业常规大气污染物排放水平及其对环境影响的调查研究。在前期已有工作基础上，并实时结合课题1的调查结果，对抽取出的样本空间中的水泥生产企业进行实地调
                                查，对工艺过程和燃烧过程的常规大气污染物排放状况进行深度调查、分析，从调查样本中筛选出部分典型企业，进行深度调查分析和对排放数据进行现场测试和校核，并进行污染物现状及其对周边环境影响的初步分析。`,
          "img": img5
        },
        {
          "id" : '6',
          "title": '非常规污染物排放水平及其对环境影响的调查研究',
          "content": `本课题主要负责水泥工业非常规污染物排放水平及其对环境影响的调查研究。在了解现有统计数据构成的基础上，调查和分析汞、砷和硒等重金属和多氯联苯、六氯苯和其他多环芳烃等非常规污染物的排放情况，结合
                                原料、燃料、固体废物成分的分析，研究非常规污染物的来源及其对环境的影响。选择120条以上具有代表性的生产线进行现场采样、分类收集烟粉尘和气体污染物样品，深度分析非常规污染物排放及其对周边环境的影响。`,
          "img": img6
        },
        {
          "id" : '7',
          "title": '水泥工业“节能减排”典型案例调查、模拟分析、生产验证与评价',
          "content": `本课题拟在上述课题的基础上，考虑投产时间长短、生产规模大小、生产工艺先进性、原燃料种类和来源、是否协同处置固体废物、生产管理水平高低、地区差异性等选取若干典型性、代表性的“节能减排”样本，对所收集的数据及信息进行
                                深度整理与加工，模拟分析出水泥工业工艺装备、产品质量、资源消耗、能源消耗、常规和非常规污染物排放等因素之间的互动性规律，并基于得出的规律性进行现场生产验证和“节能减排”效果评价。`,
          "img": img7
        },
        {
          "id" : '8',
          "title": '中国水泥工业环境状况数据库及信息共享服务平台建设',
          "content": `该课题负责中国水泥工业环境状况数据库及信息共享服务平台建设。拟在上述课题基础上，对所收集到的本底数据、深度调研数据以及相应科学规律进行整合，形成数据库，并开发出基于互联网络的中国水泥工业环境状况信息共享平台。`,
          "img": img8
        },
      ],
      dData: []
    }
  }


  /******蚂蚁抽屉方法开始******/

  showDrawer = (key) => {
    this.setState({
      dData: this.state.data[key-1],
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  /******蚂蚁抽屉方法结束******/


  render() {
    const dData = this.state.dData;
    return (
      <div>
        <div id="share" className="share">
          <div className="headtxt">
            <span className="txt1">新闻资讯</span><br/>
          </div>
          <div className="content ">
            {/*滚动到指定位置显示*/}
            <OverPack playScale={[0.2, 0.5]}>
              {/*动画展示效果*/}
              <QueueAnim className="row"
                         key="queue" delay={100} leaveReverse={true}
                         animConfig={{opacity: [1, 0], translateY: [0, 50]}}
              >
                {/*key为abcd...用来控制展示顺序*/}
                <div key="a" style={{width: '100%', height: '100%'}}>
                  {/*盒子外壳*/}
                  {
                    this.state.data.map((item) =>(
                      <div className="row-1" key = {item.id}>
                        {/*覆盖变色盒子，点击触发事件盒子*/}
                        <div
                          className='box'
                          onClick={() => {
                            this.showDrawer(item.id)
                          }}
                        >
                          <div className="icon">
                            <img src ={item.img} alt="" style = {{width:'135px'}} />
                          </div>
                          <div className="context">
                            <p className="news_title">{item.title}</p>
                            <hr/>
                            <p className="news_content">{item.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </QueueAnim>
            </OverPack>
          </div>
        </div>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Card
            hoverable
            cover={<img alt="example" src={dData.img}/>}
          >
            <Meta
              style={{textAlign: 'center'}}
              title="水泥项目组"
              description="水泥项目组"
            />
          </Card>
          <Divider/>
          <p style={pStyle}>阶段性工作总结</p>
          <Divider/>
          <p>{dData.content}</p>
          <Divider/>
          <p style={pStyle}>项目成果</p>
          <Divider/>
          <p>&emsp;&emsp;项目完成后，需要对项目成果概括介绍，但基于300到500字限制，不知如何写出效果很好的项目简介，充分展现项目成果，这里给大家介绍一种写作方法，希望有所帮助</p>
          <Divider/>
          <p style={pStyle}>项目数据汇编</p>
          <Divider/>
          <Row>
            <Col span={12}>
              <DescriptionItem title="所在地" content="湖北武汉"/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="公司类型" content="有限责任公司"/>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="公司规模" content="100-500人"/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="年营业额" content="3亿"/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="业务范围"
                content="水泥，化肥，XXX"
              />
            </Col>
          </Row>
          <Divider/>
          <p style={pStyle}>相关资料下载</p>
          <Divider/>
          <Row>
            <Col span={24}>
              <DescriptionItem title="邮箱" content="LeeVirtue@SmartLab Design.com"/>
            </Col>
            <Col span={24}>
              <DescriptionItem title="电话" content="+86 188 0000 0000"/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="主页"
                content={(
                  <a href="http://www.ccement.com/">
                    www.ccement.com
                  </a>
                )}
              />
            </Col>
          </Row>
        </Drawer>
      </div>


    )
  }
}

