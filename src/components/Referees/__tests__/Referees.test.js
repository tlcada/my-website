import React from 'react';
import '../../Utils/tempPolyfills'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

import Msg from '../../../msg.json';
import Referees from '../Referees';

describe('<Referees />', () => {
    it('renders <Referees /> component', () => {
        const tree = renderer.create(<Referees msg={ Msg.referees } />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
