import * as React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const TopNav: React.SFC<void> = _ =>
  <Navbar bsStyle="default">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/"><span className="brand-title">Proverb</span></Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/sages">
          <NavItem eventKey={1}><i className="fa fa-users" /> Sages</NavItem>
        </LinkContainer>
        <LinkContainer to="/sayings">
          <NavItem eventKey={2}><i className="fa fa-comment" /> Sayings</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <LinkContainer to="/about">
          <NavItem eventKey={1}>About</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;

export default TopNav;
