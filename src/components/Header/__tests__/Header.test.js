import React from 'react';
import '../../Utils/tempPolyfills'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

import Msg from '../../../msg.json';
import Header from '../Header';

describe('<Header />', () => {
    it('renders <Header /> component', () => {
        const tree = renderer.create(<Header msg={ Msg.header } />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('test <Header /> isNavOpen state', () => {
        const wrapper = shallow(<Header msg={ Msg.header } />);
        expect(wrapper.state('isNavOpen')).toEqual(false);
        wrapper.find('NavLink').first().simulate('click');
        expect(wrapper.state('isNavOpen')).toEqual(true);
        wrapper.setState({ isNavOpen: false });
        expect(wrapper.state('isNavOpen')).toEqual(false);
    });
});
