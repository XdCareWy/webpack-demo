import React, { Component } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

class DateRanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startStatus: false,
      endStatus: false,
      startValue: null,
      endValue: null,
      visible: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if ('value' in nextProps) {
      const { value = [] } = nextProps;
      const { startValue: start, endValue: end } = prevState;
      const startValue = value[0] ? moment(value[0]) : start;
      const endValue = value[1] ? moment(value[1]) : end;
      const mid = moment(startValue);
      const last = mid.add(6, 'M');
      return { last: last, startValue: startValue, endValue: endValue };
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

  render() {
    const { isDate = true, isTime = true } = this.props;
    const { startStatus, endStatus, startValue = null, endValue = null, visible } = this.state;

    return (
      <div style={{ position: 'relative', height: '54px' }}>
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
        <div
          style={{ color: 'red', display: visible ? 'inline-block' : 'none', marginLeft: '1px' }}>
          请先选择开始时间
        </div>
      </div>
    );
  }
}

export default DateRanges;
