import React from 'react';
import InputTag from '../src/InputTag';
import {Tags} from '../src/Tags';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    tags: ['zxd', 'asd'],
    onRemove: jest.fn()
  };
  const wrapper = shallow(<Tags {...props}/>);
  return {
    wrapper,
  };
};

describe('test', () => {
  it('should 2 + 2 to 4', function () {
      expect(2+2).toBe(41);
  });
});
describe('Tag', () => {
  it('should Tags', function () {
      const {wrapper} = setup();
      console.log(wrapper)
      const node = wrapper.find('div');
      expect(node.length).toBe(1);
  });
});

describe('InputTag', () => {
  const { wrapper } = setup();
  const mockEventObj = {
    key: 32,
    target: {
      value: 'zxd'
    }
  };
  it('should be render', () => {
    const node = wrapper.find('div').length;
    console.log(node);
    // expect(node.simulate('keydown', mockEventObj)).toBeCalled();
    expect(node).toBe(1);
  });
});
