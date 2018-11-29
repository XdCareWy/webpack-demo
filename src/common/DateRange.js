import React, { Component, Fragment } from 'react';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
import Styled from 'styled-components';
import { getSomeDayAgo, isOverHalfYear, getUnix } from '../utils';

class DateRange extends Component {
  static getBtnCheckedByDate(start = 0, end = 0) {
    const seven = getSomeDayAgo(1, 7);
    const fifteen = getSomeDayAgo(1, 15);
    const thirty = getSomeDayAgo(1, 30);
    if (start === seven[0] && end === seven[1]) {
      return {
        sevenChecked: true,
        fifteenChecked: false,
        thirtyChecked: false,
      };
    }
    if (start === fifteen[0] && end === fifteen[1]) {
      return {
        sevenChecked: false,
        fifteenChecked: true,
        thirtyChecked: false,
      };
    }
    if (start === thirty[0] && end === thirty[1]) {
      return {
        sevenChecked: false,
        fifteenChecked: false,
        thirtyChecked: true,
      };
    }
  }

  constructor(props) {
    super(props);
    const v = getSomeDayAgo(1, 181);
    this.state = {
      value: [moment(v[0]), moment(v[1])],
      isError: false,
      sevenChecked: false,
      fifteenChecked: false,
      thirtyChecked: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      let isError = false;
      const { value = [] } = nextProps;
      const startValue = value[0] ? moment(value[0]) : null;
      const endValue = value[1] ? moment(value[1]) : null;
      const checked = DateRange.getBtnCheckedByDate(value[0], value[1]);
      if (startValue && endValue) {
        isError = isOverHalfYear([startValue, endValue]);
      }
      return { value: [startValue, endValue], isError: isError, ...checked };
    }
    return null;
  }

  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  disabledDate = current => {
    const today = moment();
    const todayStr = `${today.year()}-${today.month() + 1}-${today.date()}`;
    return current && current >= moment(todayStr);
  };

  disabledRangeTime = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    }
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
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
      value: value,
      sevenChecked: sevenChecked,
      fifteenChecked: fifteenChecked,
      thirtyChecked: thirtyChecked,
    });
    this.triggerChange(value);
  };

  handleChange = dates => {
    let isError = false;
    if (dates && dates[0] && dates[1]) {
      isError = isOverHalfYear(dates);
    }
    this.setState({
      value: dates,
      isError: isError,
      sevenChecked: false,
      fifteenChecked: false,
      thirtyChecked: false,
    });
    this.triggerChange(dates);
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    const start = changedValue[0];
    const end = changedValue[1];
    const v = [getUnix(moment(start)), getUnix(moment(end))];
    onChange && onChange(v);
  };

  render() {
    const { hiddenBtn = false, hiddenError = true } = this.props;
    const { value, sevenChecked, fifteenChecked, thirtyChecked, isError } = this.state;
    return (
      <Content>
        <div>
          <DatePicker.RangePicker
            allowClear={false}
            value={[moment(value[0]), moment(value[1])]}
            disabledDate={this.disabledDate}
            disabledTime={this.disabledRangeTime}
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
            }}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={(dates, dateStrings) => this.handleChange(dates, dateStrings)}
          />
          {!hiddenBtn && (
            <Fragment>
              <ButtonStyle
                name="seven"
                type={sevenChecked ? 'primary' : 'default'}
                onClick={e => this.handleDay(e)}
              >
                近7天
              </ButtonStyle>
              <ButtonStyle
                name="fifteen"
                type={fifteenChecked ? 'primary' : 'default'}
                onClick={e => this.handleDay(e)}
              >
                近15天
              </ButtonStyle>
              <ButtonStyle
                name="thirty"
                type={thirtyChecked ? 'primary' : 'default'}
                onClick={e => this.handleDay(e)}
              >
                近30天
              </ButtonStyle>
            </Fragment>
          )}
        </div>
        {hiddenError && isError && <Msg>选取的时间段超过6个月，请重新选择</Msg>}
      </Content>
    );
  }
}

export default DateRange;

const Content = Styled.div`
  position: relative;
`;
const ButtonStyle = Styled(Button)`
  margin: 0 5px;
`;
const Msg = Styled.div`
  position: absolute;
  top: 25px;
  left: 5px;
  color: red;
`;
