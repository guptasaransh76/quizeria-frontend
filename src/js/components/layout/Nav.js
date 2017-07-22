import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const loginClass = location.pathname === "/" ? "active" : "";
    const mainClass = location.pathname.match(/^\/main/) ? "active" : "";
    const adminClass = location.pathname.match(/^\/admin/) ? "active" : "";
     const webpageClass = location.pathname.match(/^\/webpage/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li class={webpageClass} >
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Take Survey
                </IndexLink>
              </li>
              
              <li class={adminClass}>
                <Link to="admin" onClick={this.toggleCollapse.bind(this)}>Admin</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}