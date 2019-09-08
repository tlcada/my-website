import React from 'react';
import { Glyphicon } from 'react-bootstrap';

import LinkId from '../Utils/LinkId';
import './Timeline.css';

const Timeline = ({ msg }) => {
    const items = msg.cv.map((json, index) => {
        const result = index % 2 === 0;
        const icon = json.icon !== null ? <Glyphicon glyph={ json.icon } /> : "";
        return <div key={ index } className={ result ? "Container Box-Left" : "Container Box-Right" }>
            <div className="Sub-content">
                <h4>{ icon } { json.title }</h4>
                <p>{ json.content }</p>
                <span className={ result ? "Year-right" : "Year-left" }><Glyphicon glyph="time" /> { json.time }</span>
            </div>
        </div>
    });

    return (
        <div id={ LinkId.timeline } className="Timeline">
            <div className="container">
                <h3>{ msg.title }</h3>
                <div className="Main-content">
                    { items }
                    <div className="Container Final-point"></div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
