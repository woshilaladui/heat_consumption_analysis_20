import React,{Component} from 'react';
import {Table} from 'antd';
const treeData = [
  {
    id: '1',
    pid: '0',
    level: 0,
    children: [
      {
        id: '1-1',
        pid: '1',
        level: 1,
        children: [
          {
            id: '1-1-1',
            pid: '1-1',
            level: 2,
          },
        ],
      },
      {
        id: '1-2',
        pid: '1',
        level: 1,
        children: [
          {
            id: '1-2-1',
            pid: '1-2',
            level: 2,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    pid: '0',
    level: 0,
    children: [
      {
        id: '2-1',
        pid: '2',
        level: 1,
        children: [
          {
            id: '2-1-1',
            pid: '2-1',
            level: 2,
          },
          {
            id: '2-1-2',
            pid: '2-1',
            level: 2,
          },
        ],
      },
    ],
  },
];
class TreeTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectRowKeys: [],
    };
  }

  handleOnDatalevel=(record) => {
    const datalevel = [
      this.handleOnFirstlevel(record),
      this.handleOnTwolevel(record),
      this.handleOnThreelevel(record),
    ];
    return datalevel[record.level];
  }

  handleOnFirstlevel=(record) => <span>{record.level}</span>

  handleOnTwolevel=(record) => <span>{record.level}</span>

  handleOnThreelevel=(record) => <span>{record.level}</span>

  // 设置父级选择
  handleOnSetParentCheck(set, id) {
    let parent = this.getParent(treeData, id);
    if (parent) {
      set.add(parent.id);
      this.handleOnSetParentCheck(set, parent.id);
    }
    return set;
  }

  // 设置父级取消
  handleOnSetParentUncheck=(set, id) => {
    let checkedParent = false;
    let parent = this.getParent(treeData, id);
    if (parent) {
      let childlist = parent.children;
      childlist.forEach((v) => {
        if (set.has(v.id)) {
          checkedParent = true;
        }
      });
      if (!checkedParent) {
        set['delete'](parent.id);
        this.handleOnSetParentUncheck(set, parent.id);
      }
    }
    return set;
  }

  // 设置child全选
  handleOnSetChildCheck=(set, list) => {
    const _that = this;
    list.forEach(function(v) {
      set.add(v.id);
      v.children && _that.handleOnSetChildCheck(set, v.children);
    });
    return set;
  }

  // 设置child取消
  handleOnSetChildUncheck=(set, list) => {
    const _that = this;
    list.forEach(function(v) {
      set['delete'](v.id);
      v.children && _that.handleOnSetChildUncheck(set, v.children);
    });
    return set;
  }

  // 获取当前对象的父级
  getParent=(tabData, id) => {
    for (let i = 0; i < tabData.length; i++) {
      if (tabData[i].id === id) {
        return null;
      }
    }
    return _getParent(tabData);
    function _getParent(list) {
      let childlist = false;
      let isExist = false;
      for (let i = 0; i < list.length; i++) {
        if ((childlist = list[i].children)) {
          for (var key in childlist) {
            if (childlist[key].id === id) {
              isExist = true;
            }
          }
          if (isExist) {
            return list[i];
          }
          if (_getParent(childlist)) {
            return _getParent(childlist);
          }
        }
      }
    }
  }

  handleOnTableSelect=(record, selected) => {
    const {selectRowKeys} = this.state;
    const set = new Set(selectRowKeys);
    const id = record.id;
    if (selected) {
      set.add(id);
      record.children && this.handleOnSetChildCheck(set, record.children);
      this.handleOnSetParentCheck(set, id);
    } else {
      set['delete'](id);
      record.children && this.handleOnSetChildUncheck(set, record.children);
      this.handleOnSetParentUncheck(set, id);
    }
    this.setState({
      selectRowKeys: Array.from(set),
    });
  }

  render() {
    const {selectRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys: selectRowKeys,
      onSelect: this.handleOnTableSelect,
      getCheckboxProps: (record) => ({
        disabled: record.level === 2,
      }),
    };
    const columns = [{
      key: 'id',
      render: (record) => this.handleOnDatalevel(record),
    }];
    return (
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={treeData}
        showHeader={false}
        rowSelection={rowSelection}
        rowClassName={(record) => record.level === 0 ? 'firstlevel' : (record.level === 2 ? 'lastlevel' : '')}
      />
    );
  }
}
export default TreeTable;

