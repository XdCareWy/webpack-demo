import React from 'react';
import InputTag from '../src/InputTag';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const setup = () => {
  const wrapper = shallow(<InputTag />);
  return {
    wrapper,
  };
};

describe('InputTag', () => {
  const { wrapper } = setup();
  it('should be render', function() {
    expect(wrapper.find('input').exists());
  });
});
