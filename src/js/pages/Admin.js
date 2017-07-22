import React from "react";
import $ from "jquery";

export default class Admin extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
      password: "",
      error: ""    
    }
  }

  onChange(key, value){
    let state = {
      ...this.state
    };
    state[key] = value.target.value;

    console.log(state);
    this.setState(state);
    
  }

  onSuccess(response){
    if(response.status === "Failure"){
      this.setState({
        ...this.state,
        error: "Not Admin !" 
      });
      console.log('not admin');
    }else{
      this.setState({
        ...this.state,
        isLoggedIn: true,
        results: response.data 
      });
      console.log(response);
    }
  } 

  getResult(){
		console.log('clicked admin');
	   $.ajax({
      url: 'http://localhost:8080/api/admin',
      method: 'POST',
      headers: {
        'Access-Control-Allowed-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      dataType: 'json',

      data: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password
      }),

      success: (response) => {this.onSuccess(response)},

      error: function(response){
        console.error("error", response);
      }

    });
  }

  renderTableBody(rows){
    return rows.map(
      (row,i)  => {
        return (
          <tr>
            <th scope="row">{i+1}</th>
            <td>{row.fname}</td>
            <td>{row.lname}</td>
            <td>{row.email}</td>
            <td>{row.score}</td>
            <td>{row.totalScore}</td>
          </tr>
        );


    });
  }

  render() {
    const divStyle = {
      marginTop: "20px"
    };


    return (
      <div>
        {!this.state.isLoggedIn &&
          <div class="row">
            <div class="col-lg-12">
              <form class="form_horizontal">
                <fieldset>
                  <legend>Admin Login </legend>

                    <div class="form-group">
                        <label for="inputEmail" class="col-lg-2 control-label" >Email</label>
                        <div class="col-lg-10">
                          <input type="text" class="form-control" id="inputEmail" placeholder="Email" onChange= {(val)=>{this.onChange("username",val)}} />
                        </div>
                    </div>
                    <div class="form-group" >
                      <label for="inputPassword" class="col-lg-2 control-label">Password</label>
                      <div class="col-lg-10">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Password" onChange= {(val)=>{this.onChange("password",val)}} /> 
                      </div>
                    </div>
                    		
                    <div class="col-lg-10 col-lg-offset-2" style = {{"marginTop":"20px"}}>
                      	<button type="submit" class="btn btn-primary" onClick= {() => {this.getResult()}}>Submit</button>
                    </div>
                  </fieldset>
                  { this.state.error !== "" &&
                      <div><br />
                        <div class="alert alert-danger" role="alert">
                            <label for="error" class="row" style = {{"paddingLeft":"10px"}} >{this.state.error}</label>
                        </div> 
                      </div>
                  }
              </form>
            </div>
          </div>
      }
      { this.state.isLoggedIn &&
        <table class="table">
          <thead class="thead-inverse">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email id</th>
              <th>Score</th>
              <th>Total Score</th> 
            </tr>
          </thead>
          <tbody>
            {this.renderTableBody(this.state.results)}
          </tbody>
        </table>


      }

      </div>
    );
  }
}
