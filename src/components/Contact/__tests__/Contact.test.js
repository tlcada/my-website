import React from 'react';
import '../../Utils/tempPolyfills'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

import Msg from '../../../msg.json';
import Contact from '../Contact';

// TODO: Create more tests
describe('<Contact />', () => {
    it('renders <Contact /> component', () => {
        const tree = renderer.create(<Contact msg={ Msg.contact } />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
