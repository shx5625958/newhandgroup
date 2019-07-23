import React, { PureComponent } from 'react';
import { Action, Content, Header, Page } from '@choerodon/boot';
import { DataSet, Table } from 'choerodon-ui/pro';
import Store from './stores';

const { Column } = Table;

export default class ModelList extends PureComponent {
  constructor(props) {
    super(props);
    this.ds = new DataSet(Store);
  }

  renderLevel = ({ record }) => {
    const LEVEL_MAP = {
      organization: '组织',
      project: '项目',
    };
    return <span>{LEVEL_MAP[record.get('level')] || '全局'}</span>;
  }

  renderAction = ({ record }) => (
    <Action />
  )

  render() {
    return (
      <Page>
        <Header title="表格Pro组件" />
        <Content>
          <Table dataSet={this.ds}>
            <Column name="name" />
            <Column name="code" />
            <Column name="level" renderer={this.renderLevel} />
            <Column name="enabled" />
            {/*<Column renderer={this.renderAction} width={100} align="right" />*/}
          </Table>
        </Content>
      </Page>
    );
  }
}
