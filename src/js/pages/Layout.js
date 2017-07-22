import React from "react";
import { Link, Redirect } from "react-router";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import Webpage from "./Webpage"

export default class Layout extends React.Component {
  constructor(){
    super();
    console.log('in constructor')
    this.state = {
      login: false,
      fname:"",
      lname:"",
      email:""
      };


  }

  onLogin(fname,lname,email){
    this.setState({
      ...this.state,
      fname,
      lname,
      email
    });
  }

  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    return (
      <div>
        <div>
        <Nav location= { location } />
        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">
              <h1></h1>
              
              {this.props.children}

            </div>
          </div>
          <Footer/>
        </div>
        </div>
      </div>


    );
  }
}
