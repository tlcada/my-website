import React from 'react';
import '../../Utils/tempPolyfills'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

import Msg from '../../../msg.json';
import Timeline from '../Timeline';

describe('<Timeline />', () => {
    it('renders <Timeline /> component', () => {
        const tree = renderer.create(<Timeline msg={ Msg.timeline } />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
