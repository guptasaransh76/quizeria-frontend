import React from "react";


export default class Footer extends React.Component {

  render() {
    const containerStyle = {
        marginTop: "auto"
    };
    return (
      <footer>
        <div class="row">
          <div class="col-lg-12" style={containerStyle} >
            <p>Copyright &copy; quizeria.net</p>
          </div>
        </div>
      </footer>
    );
  }
}
