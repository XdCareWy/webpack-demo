import { connect } from 'react-redux';
import { Counter } from '../components/Counter';
import { increase, decrease } from '../action/Counter';

const mapStateToProps = state => {
  return {
    value: state.counter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increase: () => dispatch(increase()),
    decrease: () => dispatch(decrease()),
    increaseAsync: () => dispatch({ type: 'INCREASE_ASYNC' }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
