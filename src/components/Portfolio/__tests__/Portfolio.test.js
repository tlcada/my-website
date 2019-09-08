import React from 'react';
import '../../Utils/tempPolyfills'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

import Msg from '../../../msg.json';
import Portfolio from '../Portfolio';

describe('<Portfolio />', () => {
    it('renders <Portfolio /> component', () => {
        const tree = renderer.create(<Portfolio msg={ Msg.portfolio } />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
