import React from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Link, Redirect } from "react-router";
import $ from "jquery";

export default class Webpage extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      error: ""
    }
	}

  onChange(key, value){
    let state = {
      ...this.state
    };
    state[key] = value.target.value;

    this.setState(state);
    
  }

  onSuccess(response){
    if(response.status === "Already registered"){
      this.setState({
        ...this.state,
        error: "This email id is already registered, Please enter a different id." 
      });
    }else{
      this.props.history.push("/main?fname=" + this.state.fname + "&lname=" + this.state.lname + "&email=" + this.state.email);
    }
  }

 		
 onRegister(){
    $.ajax({
      url: 'http://localhost:8080/api/register',
      method: 'POST',
      headers: {
        'Access-Control-Allowed-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      dataType: 'json',

      data: JSON.stringify({
        'fname': this.state.fname,
        'lname': this.state.lname,
        'email': this.state.email
      }),

      success: (response) => {this.onSuccess(response)},

      error: function(response){
        console.error("error", response);
      }

    });
      
  }

  render() {
 
 	const divStyle = {
      marginTop: "20px"
    };


    return (
      <div>
        <div class="row">
          <div class="col-lg-12">
            <form class="form_horizontal">
              <fieldset>
                <legend>Sign up</legend>
                  <div class="form-group">
                    <label for="inputFname" class="col-lg-2 control-label" >First Name</label>
                    <div class="col-lg-10">
                      <input type="text" class="form-control" id="inputFname" placeholder="First Name" onChange= {(val)=>{this.onChange("fname",val)}} />
                    </div>
                  	</div>
					          <div class="form-group">
                      <label for="inputLname" class="col-lg-2 control-label" >Last Name</label>
                      <div class="col-lg-10">
                        <input type="text" class="form-control" id="inputLname" placeholder="Last Name" onChange= {(val)=>{this.onChange("lname",val)}} />
                      </div>
                  	</div>

                  <div class="form-group">
                      <label for="inputEmail" class="col-lg-2 control-label" >Email</label>
                      <div class="col-lg-10">
                        <input type="text" class="form-control" id="inputEmail" placeholder="Email" onChange= {(val)=>{this.onChange("email",val)}} />
                      </div>
                  </div>
                  		
                  <div class="col-lg-10 col-lg-offset-2" style={divStyle}>
                    	<button type="submit" class="btn btn-primary" onClick= {() => {this.onRegister()}}>Submit</button>
                  </div>
                </fieldset>
                { this.state.error !== "" &&
                  <div class="form-group"><br />
                    <div class="alert alert-danger" role="alert">
                        <label for="error" class="row" style = {{"paddingLeft":"10px"}} >{this.state.error}</label>
                    </div> 
                  </div>
                }
            </form>
          </div>
        </div>
      </div>
    );
  }
}

