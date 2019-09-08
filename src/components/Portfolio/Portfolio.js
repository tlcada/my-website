import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { OutboundLink } from 'react-ga';

import LinkId from '../Utils/LinkId';
import './Portfolio.css';

const References = ({ url, name, icon, description, className, size }) => {
    return <Col md={ size[0] } sm={ size[1] }>
        <OutboundLink eventLabel={ name } title={ name } rel="noopener noreferrer" to={ url } target="_blank">
            <div className={ className }>
                <div className={ className + '-content' }>
                    <h4>{ typeof icon  === 'undefined' ? "" : <Glyphicon glyph={ icon } /> } { name }</h4>
                    <p>{ description }</p>
                </div>
            </div>
        </OutboundLink>
    </Col>
};

const Portfolio = ({ msg }) => {
    return (
        <div id={ LinkId.portfolio } className="Portfolio">
            <Grid className="container">
                <h3>{ msg.title }</h3>
                <span className="Title-description">{ msg.titleDescription }</span>
                <Row className="show-grid">
                    <References url={ msg.mainObject.url } name={ msg.mainObject.name } icon={ msg.mainObject.icon } description={ msg.mainObject.description } className="Rectangle" size={ [12, 12] } />
                </Row>
                <Row className="show-grid">
                    {
                        msg.subObject.map((json, index) => {
                            return <References key={ index } url={ json.url } name={ json.name } icon={ json.icon } className="Square" size={ [3, 6] } />
                        })
                    }
                </Row>
            </Grid>
        </div>
    );
};

export default Portfolio;
