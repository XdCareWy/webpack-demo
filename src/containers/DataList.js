import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { getListAction } from '../action/index';

class DataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 5,
    };
  }

  componentDidMount() {
    this.props.getData(1);
  }

  handleChange = (page, pageSize) => {
    this.setState({ pageNum: page, pageSize: 5 });
    this.props.getData(page);
  };

  render() {
    const { pageNum, pageSize } = this.state;
    const { total, list } = this.props.data;
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
    ];
    return (
      <Table
        loading={this.props.data === true}
        rowKey="id"
        current={pageNum}
        columns={columns}
        dataSource={list}
        pagination={{
          total: total,
          pageSize: pageSize,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataList);

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: pageNum => dispatch(getListAction(pageNum)),
  };
}
