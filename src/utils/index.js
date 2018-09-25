import moment from 'moment';

export const getUnix = date => {
  if (date) {
    const str = date.format('YYYY-MM-DD HH:mm:ss');
    const d = new Date(str);
    return d.getTime();
  }
  return 0;
};

export const formatNumber = (value = 0) => {
  if (value === 0 || value === '0') {
    return 0;
  }
  let num = value.toString().split('.')[0];
  const decimal = value.toString().split('.')[1];
  const temp = num.length % 3;
  switch (temp) {
    case 1:
      num = `00${num}`;
      break;
    case 2:
      num = `0${num}`;
      break;
    default:
      num = `${num}`;
  }
  const res = num
    .match(/\d{3}/g)
    .join(',')
    .replace(/^0+/, '');
  return decimal ? `${res}.${decimal}` : res;
};

export const getSomeDayAgo = (s = 1, e = 181) => {
  const end = moment().subtract(s, 'days');
  let start = 0;
  if (e === 181) {
    start = moment().subtract(6, 'M');
  } else {
    start = moment().subtract(e, 'days');
  }
  const standardEnd = moment(
    `${end.year()}-${end.month() + 1}-${end.date()} 23:59:59`,
    'YYYY-MM-DD HH:mm:ss'
  );
  const standardStart = moment(
    `${start.year()}-${start.month() + 1}-${start.date()} 00:00:00`,
    'YYYY-MM-DD HH:mm:ss'
  );
  return [getUnix(standardStart), getUnix(standardEnd)];
};

export const isOverHalfYear = (date = [0, 0], month = 6) => {
  const currentStartDate = +date[0];
  const currentEndDate = +date[1];
  if (currentStartDate) {
    const halfYear = moment(currentStartDate).add(month, 'M');
    return currentEndDate > halfYear;
  }
};

export const debounce = (fn, delay) => {
  return args => {
    fn.id && clearTimeout(fn.id);
    fn.id = setTimeout(() => {
      fn.call(this, args);
    }, delay);
  };
};
