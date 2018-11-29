import React, { Component } from 'react';
import { Table } from 'antd';
import { getListInterface } from '../api';

class DataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 5,
      total: 0,
      dataSource: []
    };
  }

  componentDidMount() {
    this.getList(1);
  }

  getList = pageNum => {
    getListInterface(pageNum).then(response => {
      const { status, data: { code, result: { list = [], total = 0 } = {} } = {} } = response;
      if (status === 200 && code === 0) {
        this.setState({ dataSource: list, total: total });
      }
    });
  };

  handleChange = (page, pageSize) => {
    console.log(pageSize);
    this.setState({ pageNum: page, pageSize: 5 });
    this.getList(page);
  };

  render() {
    const { total, dataSource, pageNum, pageSize } = this.state;
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '年龄',
        dataIndex: 'age'
      }
    ];
    return (
      <Table
        rowKey="id"
        current={pageNum}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total: total,
          pageSize: pageSize,
          onChange: this.handleChange
        }}
      />
    );
  }
}

export default DataList;
