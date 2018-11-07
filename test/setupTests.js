import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const setup = () => {
  const wrapper = shallow(<InputTag />);
  return {
    wrapper,
  };
};