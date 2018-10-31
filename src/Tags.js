import React from 'react';
import styled from 'styled-components';

export const Tags = ({ tags = [], onRemove }) =>
  tags.map((item, index) => <Tag key={index} value={item} id={index} onRemove={onRemove} />);

export const Tag = ({ value = '', onRemove, id }) => (
  <TagCss>
    {value} <Close onClick={() => onRemove(id)} />
  </TagCss>
);

const TagCss = styled.div`
  border: 1px solid #dfdfdf;
  margin: 0 4px 4px 0;
  padding: 0 4px;
  border-radius: 3px;
  height: 22px;
`;

const Close = styled.span`
  ::after {
    content: ' ×';
    cursor: pointer;
  }
`;
