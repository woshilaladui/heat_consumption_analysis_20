import React,{Component} from 'react';
import './style.css'

export default class Notfound extends Component{
  render() {
    return(
      <div className="body">
        <div className="error"><span>Page not found</span><span>404</span><span>Swim Home, Friend</span>
        </div>
        <div className="sun"></div>
        <div className="clouds">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="birds"></div>
        <div className="sea">
          <div className="wave w-1"></div>
          <div className="wave w-2"></div>
          <div className="fish"><span></span><span></span><span></span>
          </div>
        </div>
        <div className="bottom">
          <div className="grass"><span> </span><span> </span><span> </span>
          </div>
          <div className="grass"><span> </span><span> </span><span> </span>
          </div>
          <div className="grass"><span> </span><span> </span><span> </span>
          </div>
          <div className="grass"><span> </span><span> </span><span> </span>
          </div>
          <div className="circle"><span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="circle"><span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="circle"><span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="circle"><span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="grass_tw"></div>
          <div className="grass_tw"></div>
          <div className="grass_tw"></div>
        </div>
        {/*<div style="text-align:center;margin:50px 0; font:normal 14px/24px 'MicroSoft YaHei';">*/}
        {/*  <p>适用浏览器：360、FireFox、Chrome、Opera、傲游、搜狗、世界之窗. 不支持Safari、IE8及以下浏览器。</p>*/}
        {/*  <p>来源：<a href="http://sc.chinaz.com/" target="_blank">站长素材</a></p>*/}
        {/*</div>*/}
      </div>
    )
  }
}