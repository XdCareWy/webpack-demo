import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './demo.less';
import WordAdder from './Demo';

const modalRoot = document.getElementById('modal-root');

const Modal = props => {
  const el = document.createElement('div');
  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  });
  return ReactDOM.createPortal(props.children, el);
};

class ModalClass extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

const Child = props => {
  return (
    <div className="modal">
      <button>{props.name}</button>
    </div>
  );
};

const Parent = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div onClick={() => setCounter(counter + 1)}>
      <p>Number of clicks: {counter}</p>
      <p>
        Open up the browser DevTools to observe that the button is not a child of the div with the
        onClick handler.
      </p>
      <Modal>
        <Child name="class" />
      </Modal>
      <ModalClass>
        <Child name="asd" />
      </ModalClass>
    </div>
  );
};

const App = () => {
  return (
    <>
      <WordAdder />
      <Parent />
      <div className="item">asdsd</div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
