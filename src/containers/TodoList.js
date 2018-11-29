import { connect } from 'react-redux';
import { TodoList } from '../components/TodoList';
import { toggleTodo, removeTodo } from '../action/Todos';

const mapStateToProps = state => {
  return {
    list: state.todos,
  };
};

const mapDispatchProps = dispatch => {
  return {
    onRemove: id => dispatch(removeTodo(id)),
    onChecked: id => dispatch(toggleTodo(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(TodoList);
