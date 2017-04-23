import * as React from "react";
import { Link, PlainRoute } from "react-router";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface Props {
  path: string;
  routes: PlainRoute[];
}

const TopNav: React.StatelessComponent<Props> = ({ path }) => {
  return (<Navbar bsStyle="default">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/"><span className="brand-title">Proverb</span></Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav activeHref={ path }>
        <LinkContainer to="/dashboard">
          <NavItem eventKey={0}><i className="fa fa-dashboard" /> Dashboard</NavItem>
        </LinkContainer>
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
  </Navbar>
  );
};

export default TopNav;
