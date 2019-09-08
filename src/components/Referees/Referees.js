import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import LinkId from '../Utils/LinkId';
import './Referees.css';

const Picture = ({ name }) => {
    const graphImage = require(`../../assets/img/${name}`);
    return <img src={graphImage} alt=""/>
};

const Referees = ({ msg }) => {
    return (
        <div id={ LinkId.referees } className="Referees">
            <Grid className="container">
                <h3>{ msg.title }</h3>
                <span className="Title-description">{ msg.titleDescription }</span>
                <Row className="show-grid">
                    {
                        msg.persons.map((json, index) =>
                            <Col key={ index } className="Referees-content" md={4}>
                                <Picture name={ json.img } />
                                <h5>{ json.name }</h5>
                                <a href={ json.url } title={ json.company } rel="noopener noreferrer" target="_blank">{ json.company }</a>
                            </Col>
                        )
                    }
                </Row>
            </Grid>
        </div>
    );
};

export default Referees;
