import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { animateScroll } from 'react-scroll';

import './App.css';
import Msg from '../../msg.json';
import Header from '../Header/Header';
import Details from '../Details/Details';
import Portfolio from '../Portfolio/Portfolio';
import Timeline from '../Timeline/Timeline';
import Referees from '../Referees/Referees';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';

const scrollToTop = () => {
    animateScroll.scrollToTop();
};

const App = ({ reactGA }) => {
    return (
        <div>
            <Header msg={ Msg.header } reactGA={ reactGA } />
            <Details msg={ Msg.details } />
            <Portfolio msg={ Msg.portfolio } />
            <Timeline msg={ Msg.timeline } />
            <Referees msg={ Msg.referees } />
            <Contact msg={ Msg.contact } />
            <Footer msg={ Msg.footer } />
            <p onClick={scrollToTop} className="Return-to-top"><Glyphicon glyph="chevron-up" /></p>
        </div>
    );
};

export default App;
