import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-scroll';

import LinkId from '../Utils/LinkId';
import logo from '../../assets/img/logo.png';
import './Header.css';

const NavLink = ({ ...props }) => {
    return <Link { ...props } duration={500} smooth={true}>{ props.name }</Link>;
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.msg = this.props.msg;
        this.reactGA = this.props.reactGA;
        this.state = { isNavOpen: false };

        this.collapseNav = this.collapseNav.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    collapseNav(linkName) {
        const isOpen = this.state.isNavOpen === false;
        this.setState({ isNavOpen: isOpen });
        if (linkName !== null && this.reactGA) {
            this.reactGA.event({ category: 'Navbar', action: linkName.toString() });
        }
    }

    handleScroll(event) {
        const backToTopElement = document.getElementsByClassName("Return-to-top")[0];
        if (event.pageY < 550) {
            backToTopElement.setAttribute("style", "display: none;");
        } else {
            backToTopElement.setAttribute("style", "display: inline;");
        }
    }

    render() {
        return (
            <div>
                <Navbar className="Navbar-style" onToggle={ () => this.collapseNav(null) } expanded={ this.state.isNavOpen }>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <p><img src={ logo } alt=""/> { this.msg.title }</p>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {/* Use Bootstrap styles to custom navbar element */}
                        <ul className="nav navbar-nav navbar-right">
                            <li><NavLink onClick={ () => this.collapseNav(LinkId.details) } to={ LinkId.details } name={ this.msg.navbar[0] } /></li>
                            <li><NavLink onClick={ () => this.collapseNav(LinkId.portfolio) } to={ LinkId.portfolio } name={ this.msg.navbar[1] } /></li>
                            <li><NavLink onClick={ () => this.collapseNav(LinkId.timeline) } to={ LinkId.timeline } name={ this.msg.navbar[2] } /></li>
                            <li><NavLink onClick={ () => this.collapseNav(LinkId.referees) } to={ LinkId.referees } name={ this.msg.navbar[3] } /></li>
                            <li><NavLink onClick={ () => this.collapseNav(LinkId.contact) } to={ LinkId.contact } name={ this.msg.navbar[4] } /></li>
                        </ul>
                    </Navbar.Collapse>
                </Navbar>
                <div className="Header">
                    <div className="Header-content">
                        <h3>{ this.msg.subTitle }</h3>
                        <p>{ this.msg.technologies }</p>
                        <a href={ this.msg.seeMore.url } rel="noopener noreferrer" target="_blank" title={ this.msg.seeMore.title }>{ this.msg.seeMore.title }</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
