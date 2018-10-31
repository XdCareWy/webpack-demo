import React, { Component } from 'react';
import styled from 'styled-components';
import { Tags } from './Tags';

class InputTag extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      tags: [],
      value: '',
    };
  }
  handleKeyDown = e => {
    const { onChange } = this.props;
    const key = e.keyCode;
    const { value, tags } = this.state;
    if (key === 32) {
      if (value) {
        const newTag = [...tags, value];
        onChange && onChange(newTag);
        this.setState({ value: '', tags: newTag });
      }
    } else if (key === 8 && value === '' && tags.length) {
      const newTag = [...tags];
      newTag.pop();
      onChange && onChange(newTag);
      this.setState({ tags: newTag });
    }
  };
  handleChange = e => {
    const value = e.target.value;
    if (value !== ' ') {
      this.setState({ value: value });
    }
  };
  onRemove = id => {
    const { onChange } = this.props;
    const { tags } = this.state;
    const newTag = [...tags];
    newTag.splice(id, 1);
    onChange && onChange(newTag);
    this.setState({ tags: newTag });
  };
  render() {
    const { style } = this.props;
    const { value, tags } = this.state;
    return (
      <Section style={style} onClick={() => this.inputRef.current.focus()}>
        <Tags tags={tags} onRemove={this.onRemove} />
        <InputCss
          ref={this.inputRef}
          value={value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </Section>
    );
  }
}

const InputCss = styled.input`
  width: 78px;
  border: 0;
  height: 32px;
  padding: 0;
  line-height: inherit;
  margin-top: -4px;
  font-size: inherit;
  :focus {
    outline: none;
    box-shadow: none;
  }
`;

const Section = styled.div`
  width: 200px;
  margin: 5px;
  padding: 4px 0 0 4px;
  border: 1px solid #dfdfdf;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
`;

export default InputTag;
