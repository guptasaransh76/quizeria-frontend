import React from "react";
import $ from "jquery";

import Question from "../components/Question";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user:{
        fname: this.props.location.query.fname,
        lname: this.props.location.query.lname,
        email: this.props.location.query.email
      },
      isSubmitted: false,
      message: ""
    };  
  }

  componentWillMount() {
    $.ajax({
      url: 'http://localhost:8080/api/questions',
      method: 'GET',
      headers: {
        'Access-Control-Allowed-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },

      success: (response) => {this.onSuccess(response)},

      error: function(response){
        console.error("error", response);
      }

    });
  }

  onSuccess(response){
   this.setState({
    ...this.state,
    data: response.data
   });  

  }

  onOpChange(id, index){
    let state =  this.state;
    for(var i = 0; i < state.data.length; i++){
      const question = state.data[i];
      if(question.id == id){
        state.data[i].choice = index + 1 ;
        break;
      }
    }
    this.setState(state);
    console.log(this.state);
  }

  onSubmitCallback(response){
    let success = false;
    let message = '';
    if(response.status === 'Already registered'){
      message = 'This user is already registered please use a different email id.';
    }else{
      success = true;
      message = 'You scored ' + response.data.score + ' out of ' + response.data.totalScore;
    }
    this.setState({
        ...this.state,
        message,
        isSubmitted: true,
        success
    });
  }

  onSubmit(){
    let request = {
      user: this.state.user,
      questions: this.state.data
    };

    $.ajax({
      url: 'http://localhost:8080/api/complete',
      method: 'POST',
      headers: {
        'Access-Control-Allowed-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      dataType: 'json',

      data: JSON.stringify(request),

      success: (response) => {this.onSubmitCallback(response)},

      error: function(response){
        console.error("error", response);
      }

    });

  }

  render() {
    const { query } = this.props.location;
    const { params } = this.props;


    const btnStyle={
      margin: "10px"
    };
    
    const Questions = this.state.data.map((question, i) => <Question key={i} question={question} onOpChange={(id,index)=>this.onOpChange(id,index)} /> );


    return (
      <div>
        { !this.state.isSubmitted &&
          <div>
            <h1>Quiz</h1>
            <div>{Questions}</div>
            <div>
              <a class="btn btn-success" onClick={()=> this.onSubmit()}  >Submit</a>
            </div>
          </div>
        }
        {
          this.state.isSubmitted &&
          <div class="jumbotron">
            {
              this.state.success && 
               <h1>Congratulations!</h1>
            }
            {
              !this.state.success && 
               <h1>Oops..</h1>
            }
            <p>{this.state.message}</p>
          </div>
        }
      </div>
    );
  }
}
