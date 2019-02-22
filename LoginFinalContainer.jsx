import React, { Component } from "react";
/* Import Components */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import ApplyForAdmission from "./ApplyForAdmission";

class LoginFinalContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        username: "",
        password: ""
      },
      referrer: null
    };
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleClear = this.handleClear.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleInput = this.handleInput.bind(this);


  }

  /* This lifecycle hook gets executed when the component mounts */


  handleUserName(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          username: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handlePassword(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          pass: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleSubmit(event) {
    var apiBaseUrl = "http://localhost:5000/slate";
    var self = this;
    var payload = {
      "email":this.state.username,
      "password":this.state.password
    }
    axios.post(apiBaseUrl+'/authenticate', payload).then(function (response) {
      console.log(response);
         let errormessage = response.data.error;
        if (errormessage != "Invalid email or password") {
          if(response.status == 200)
          {
            self.props.history.push({
              pathname: '/applyForAdmission',
              state: {email: self.state.username}
            });
          }
        }
        if (errormessage == "Invalid email or password") {
        //  alert("Invalid credentials");
        //  self.props.history("Invalid credentials");
        console.log("Username password do not match");
        alert("ERROR : Incorrect username or password")
        self.props.history.push({
          pathname: '/',
          state: {email: self.state.email}
        });
        }
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }
  handleAdmin(e) {
    e.preventDefault();
    var self = this;
    self.props.history.push({
      pathname: '/applicationViewerFinal'
    });
  } 

  handleRegister(e) {
    console.log('Button is cliked!');
    e.preventDefault();
    //this.props.history.push({ pathname: "/registerfinal"});
    //<Link to="/register">Register</Link>
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Welcome to GSU Slate - Login"
             showMenuIconButton={false}
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
             <RaisedButton label="Admin" primary={true} style={style} onClick={(event) => this.handleAdmin(event)}/>

             <br/>

             <p />
              First time? <Link to="/register">Register</Link>             
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
 margin: 25,
};


export default withRouter(LoginFinalContainer)