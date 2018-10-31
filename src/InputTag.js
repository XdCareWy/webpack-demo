import React, { Component } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

class InputTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      value: '',
    };
  }
  handleKeyDown = e => {
    const key = e.keyCode;
    console.log(key);
    const { value, tags } = this.state;
    if (key === 32) {
      if (value) {
        this.setState({ value: '', tags: [...tags, value] });
      }
    } else if (key === 8 && value === '' && tags.length) {
      const newTag = [...tags];
      newTag.pop();
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
    const { tags } = this.state;
    const newTags = [...tags];
    newTags.splice(id, 1);
    this.setState({ tags: newTags });
  };
  render() {
    const { value, tags } = this.state;
    console.log(tags);
    return (
      <Section>
        <Tags tags={tags} onRemove={this.onRemove} />
        <InputCss value={value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
      </Section>
    );
  }
}

const Tags = ({ tags = [], onRemove }) =>
  tags.map((item, index) => <Tag key={index} value={item} id={index} onRemove={onRemove} />);

const Tag = ({ value = '', onRemove, id }) => (
  <TagCss>
    {value} <Close onClick={() => onRemove(id)} />
  </TagCss>
);

const InputCss = styled(Input)`
  width: 78px;
  border: 0;
  height: inherit;
  padding: 0;
  line-height: inherit;
  margin-top: -4px;
  :focus {
    outline: none;
    box-shadow: none;
  }
`;

const Section = styled.div`
  min-height: 33px;
  margin: 5px;
  padding: 4px 0 0 4px;
  border: 1px solid #dfdfdf;
  display: flex;
  flex-wrap: wrap;
`;

const TagCss = styled.div`
  border: 1px solid #dfdfdf;
  margin: 0 4px 4px 0;
  padding: 0 4px;
  border-radius: 3px;
`;

const Close = styled.span`
  ::after {
    content: ' ×';
    cursor: pointer;
  }
`;

export default InputTag;
