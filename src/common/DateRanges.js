import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import { Button } from 'antd/lib/index';
import Styled from 'styled-components';
import { getSomeDayAgo } from '../utils';

class DateRanges extends Component {
  static getBtnCheckedByDate(start = 0, end = 0) {
    const seven = getSomeDayAgo(1, 7);
    const fifteen = getSomeDayAgo(1, 15);
    const thirty = getSomeDayAgo(1, 30);
    if (start === seven[0] && end === seven[1]) {
      return {
        sevenChecked: true,
        fifteenChecked: false,
        thirtyChecked: false
      };
    }
    if (start === fifteen[0] && end === fifteen[1]) {
      return {
        sevenChecked: false,
        fifteenChecked: true,
        thirtyChecked: false
      };
    }
    if (start === thirty[0] && end === thirty[1]) {
      return {
        sevenChecked: false,
        fifteenChecked: false,
        thirtyChecked: true
      };
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      startStatus: false,
      endStatus: false,
      startValue: null,
      endValue: null,
      visible: false,
      sevenChecked: false,
      fifteenChecked: false,
      thirtyChecked: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if ('value' in nextProps) {
      const { value = [] } = nextProps;
      const { startValue: start, endValue: end } = prevState;
      const startValue = value[0] ? moment(value[0]) : start;
      const endValue = value[1] ? moment(value[1]) : end;
      const checked = DateRanges.getBtnCheckedByDate(value[0], value[1]);
      const mid = moment(startValue);
      const last = mid.add(6, 'M');
      return { last: last, startValue: startValue, endValue: endValue, ...checked };
    }
    return null;
  }

  triggerChange = changedValue => {
    const { onChange } = this.props;
    onChange && onChange(changedValue);
  };

  onStartOpenChange = status => {
    const { startValue } = this.state;
    this.setState({ startStatus: status });
    if (!status && startValue) {
      const mid = moment(startValue);
      const last = mid.add(6, 'M');
      this.setState({ endStatus: true, last: last });
    }
  };
  onEndOpenChange = status => {
    const { startValue, visible } = this.state;
    if (startValue) {
      this.setState({ endStatus: status });
    } else {
      !visible && this.setState({ visible: true });
    }
  };

  onStartChange = startValue => {
    this.setState({ startValue: startValue, endValue: null, visible: false });
    const v = [this.getUnix(startValue), 0];
    this.triggerChange(v);
  };

  getUnix = date => {
    if (date) {
      const str = date.format('YYYY-MM-DD HH:mm:ss');
      const d = new Date(str);
      return d.getTime();
    }
    return 0;
  };

  onEndChange = endValue => {
    const { startValue } = this.state;
    this.setState({ endValue: endValue });
    const v = [this.getUnix(startValue), this.getUnix(endValue)];
    this.triggerChange(v);
  };

  disabledStartTime = () => {
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => []
    };
  };

  disabledEndTime = () => {
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => []
    };
  };

  disabledStartDate = current => {
    const today = moment();
    const todayStr = `${today.year()}-${today.month() + 1}-${today.date()}`;
    return current && current >= moment(todayStr);
  };
  disabledEndDate = date => {
    const { startValue, last } = this.state;
    const today = moment();
    const todayStr = `${today.year()}-${today.month() + 1}-${today.date()}`;
    if (!startValue || !date) {
      return false;
    }
    if (+last < +moment(todayStr)) {
      return date.valueOf() <= startValue.valueOf() || date.valueOf() >= last.valueOf();
    }
    return date.valueOf() <= startValue.valueOf() || date.valueOf() >= moment(todayStr);
  };

  onStartOk = data => {
    if (data) {
      const { startValue } = this.state;
      const mid = moment(startValue);
      const last = mid.add(6, 'M');
      this.setState({ endStatus: true, last: last });
    } else {
      const today = moment();
      const todayStr = `${today.year()}-${today.month() + 1}-${today.date()}`;
      const yesterday = moment(todayStr).subtract(1, 'day');
      const last = moment(yesterday).add(6, 'M');
      this.setState({ startValue: yesterday, endStatus: true, last: last });
    }
  };

  onEndOk = data => {
    if (!data) {
      const { startValue } = this.state;
      const year = startValue.year();
      const month = startValue.month() + 1;
      const day = startValue.date();
      const endValue = moment(`${year}-${month}-${day} 23:59:59`);
      this.setState({ endValue: endValue });
      const v = [this.getUnix(startValue), this.getUnix(endValue)];
      this.triggerChange(v);
    }
  };

  handleDay = e => {
    const btnName = e.target.name;
    let value = getSomeDayAgo(1, 181);
    let sevenChecked = false;
    let fifteenChecked = false;
    let thirtyChecked = false;
    switch (btnName) {
      case 'seven':
        value = getSomeDayAgo(1, 7);
        sevenChecked = true;
        fifteenChecked = false;
        thirtyChecked = false;
        break;
      case 'fifteen':
        value = getSomeDayAgo(1, 15);
        sevenChecked = false;
        fifteenChecked = true;
        thirtyChecked = false;
        break;
      case 'thirty':
        value = getSomeDayAgo(1, 30);
        sevenChecked = false;
        fifteenChecked = false;
        thirtyChecked = true;
        break;
      default:
        value = getSomeDayAgo(1, 181);
        sevenChecked = false;
        fifteenChecked = false;
        thirtyChecked = false;
    }
    this.setState({
      startValue: value[0],
      endValue: value[1],
      sevenChecked: sevenChecked,
      fifteenChecked: fifteenChecked,
      thirtyChecked: thirtyChecked
    });
    this.triggerChange(value);
  };

  render() {
    const { isDate = true, isTime = true, hiddenBtn = false } = this.props;
    const {
      startStatus,
      endStatus,
      startValue = null,
      endValue = null,
      visible,
      sevenChecked,
      fifteenChecked,
      thirtyChecked
    } = this.state;

    return (
      <div style={{ position: 'relative', height: '54px' }}>
        <div style={{ display: 'flex' }}>
          <div>
            <DatePicker
              value={startValue}
              open={startStatus}
              onOpenChange={this.onStartOpenChange}
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{
                defaultValue: moment('00:00:00', 'HH:mm:ss')
              }}
              placeholder="开始时间"
              showToday={false}
              onChange={this.onStartChange}
              disabledDate={isDate ? this.disabledStartDate : null}
              disabledTime={isTime ? this.disabledStartTime : null}
              onOk={this.onStartOk}
            />
            <span style={{ margin: '0 5px' }}>-</span>
            <DatePicker
              value={endValue}
              open={endStatus}
              showTime={{
                defaultValue: moment('23:59:59', 'HH:mm:ss')
              }}
              placeholder="结束时间"
              onOpenChange={this.onEndOpenChange}
              format="YYYY-MM-DD HH:mm:ss"
              showToday={false}
              onChange={this.onEndChange}
              disabledDate={isDate ? this.disabledEndDate : null}
              disabledTime={isTime ? this.disabledEndTime : null}
              onOk={this.onEndOk}
            />
          </div>
          {!hiddenBtn && (
            <Fragment>
              <ButtonStyle
                name="seven"
                type={sevenChecked ? 'primary' : 'default'}
                onClick={e => this.handleDay(e)}>
                近7天
              </ButtonStyle>
              <ButtonStyle
                name="fifteen"
                type={fifteenChecked ? 'primary' : 'default'}
                onClick={e => this.handleDay(e)}>
                近15天
              </ButtonStyle>
              <ButtonStyle
                name="thirty"
                type={thirtyChecked ? 'primary' : 'default'}
                onClick={e => this.handleDay(e)}>
                近30天
              </ButtonStyle>
            </Fragment>
          )}
        </div>
        <div
          style={{ color: 'red', display: visible ? 'inline-block' : 'none', marginLeft: '1px' }}>
          请先选择开始时间
        </div>
      </div>
    );
  }
}

const ButtonStyle = Styled(Button)`
  margin: 0 5px;
`;

export default DateRanges;
