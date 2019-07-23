import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Table } from 'choerodon-ui';
import { Action, Content, Header, Page } from '@choerodon/boot';
import Store from './stores/Store';

@observer
class TableDemo extends Component {
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    Store.loadData();
  }

  renderLevel(text) {
    const LEVEL_MAP = {
      organization: '组织',
      project: '项目',
    };
    return LEVEL_MAP[text] || '全局';
  }

  renderTable = () => {
    const { isLoading, pagination } = Store;
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',//列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法
        key: 'name',//React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
        width: '25%',
      },
      {
        title: '编码',
        dataIndex: 'code',
        key: 'code',
        width: '25%',
      },
      {
        title: '层级',
        dataIndex: 'level',
        key: 'level',
        filters: [
          {
            text: '全局',
            value: 'site',
          }, {
            text: '组织',
            value: 'organization',
          }, {
            text: '项目',
            value: 'project',
          }],
        render: text => this.renderLevel(text),
      },
      {
        title: '状态',
        dataIndex: 'enabled',
        key: 'enabled',
      },
      {
        title: '',
        key: 'action',
        align: 'right',
        render: (text, record) => {
          const actionDatas = [{
            icon: '',
            type: 'site',
            text: '修改',
            // action: this.showModal.bind(this, record.id),
          }];
          if (record.enabled) {
            actionDatas.push({
              icon: '',
              type: 'site',
              text: '停用',
              // action: this.handleEnable.bind(this, record),
            });
          } else {
            actionDatas.push({
              icon: '',
              type: 'site',
              text: '启用',
              // action: this.handleEnable.bind(this, record),
            });
          }
          return <Action data={actionDatas} getPopupContainer={() => document.getElementsByClassName('page-content')[0]} />;
        },
      },
    ];
    return (
      <Table
        columns={columns}//表格列的配置描述，具体项见下表
        dataSource={Store.data.slice()}//数据数组
        pagination={pagination}//分页器，参考配置项或 pagination，设为 false 时不展示和进行分页
        rowKey={record => record.id}//表格行 key 的取值，可以是字符串或一个函数
        onChange={this.handlePageChange}//分页、排序、筛选变化时触发
        loading={isLoading}//页面是否加载中
        filterBarPlaceholder="过滤表"//过滤条的占位文本
      />
    );
  }

  render() {
    return (
      <Page className="choerodon-role">
        <Header title="表格演示">
          <Button
            onClick={this.handleRefresh}
            icon="refresh"
          >
            刷新
          </Button>
        </Header>
        <Content
          title="标题"
          description="描述"
          link="#"
        >
          {this.renderTable()}
        </Content>
      </Page>
    );
  }
}

export default TableDemo;
