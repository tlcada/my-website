import React from 'react';
import '../../Utils/tempPolyfills'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

import Msg from '../../../msg.json';
import Details from '../Details';

describe('<Details />', () => {
    it('renders <Details /> component', () => {
        const tree = renderer.create(<Details msg={ Msg.details } />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
