import React from 'react';

import './Footer.css';

const Footer = ({ msg }) => {
    return (
        <div className="Footer">
            <div className="container">
                <p>{ msg.me }</p>
                <p>&#169; { new Date().getFullYear() }. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
