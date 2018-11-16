import React from 'react';

class ListOfWords extends React.PureComponent {
  render() {
    console.log(this.props.words);
    return <div>{this.props.words.join(',')}</div>;
  }
}

export default class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar'],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This section is bad style and causes a bug
    this.setState({ words: [...this.state.words, 'marklar'] });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
