import React from 'react';
import '../../Utils/tempPolyfills'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

import Msg from '../../../msg.json';
import Footer from '../Footer';

describe('<Footer />', () => {
    it('renders <Footer /> component', () => {
        const tree = renderer.create(<Footer msg={ Msg.footer } />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
