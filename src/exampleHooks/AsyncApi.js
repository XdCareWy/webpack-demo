import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { useAsync } from '../customHooks/index';

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'age',
    dataIndex: 'age',
  },
  {
    title: 'name',
    dataIndex: 'name',
  },
];

const getData = () => {
  return axios
    .get('https://easy-mock.com/mock/5b02673795118136368f1a84/myApp/getList')
    .then(response => {
      const { status, data } = response;
      if (status === 200) {
        if (data.code === 0) {
          return data.result;
        }
      }
    });
};

const AsyncApi = () => {
  // const asyncHero = useAsync(getData);
  // console.log(asyncHero);
  // let data = [];
  // if (asyncHero.result && asyncHero.result.hasOwnProperty('list')) {
  //   data = asyncHero.result.list;
  // }
  const [data, setData] = useState([]);
  useEffect(() => {
    getData().then(res => {
      console.log(res);
      setData(res.list);
    });
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default AsyncApi;
