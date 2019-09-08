import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import LinkId from '../Utils/LinkId';
import './Details.css';

const Details = ({ msg }) => {
    return (
        <div id={ LinkId.details } className="Details">
            <Grid className="container">
                <Row className="show-grid">
                    {
                        msg.map((json, index) =>
                            <Col key={ index } md={ 4 }>
                                <h5><Glyphicon className="Glyphicon-color" glyph={ json.icon } />&nbsp; { json.title }</h5>
                                <p>{ json.description }</p>
                            </Col>
                        )
                    }
                </Row>
            </Grid>
        </div>
    );
};

export default Details;
