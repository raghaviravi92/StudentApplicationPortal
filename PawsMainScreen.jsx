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

class PawsMainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        term: "",
        dept: "",
    };


    //this.handleSemesterSelection = this.handleSemesterSelection.bind(this);
    this.handleCourse = this.handleCourse.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.handleFees = this.handleFees.bind(this);

  }

  /* This lifecycle hook gets executed when the component mounts */


  
  handleFees(event) {
    event.preventDefault();
    var self = this;
    self.props.history.push({
      pathname: '/viewFees',
      state: {
        email: self.props.location.state.email,
        term: self.props.location.state.term,
        dept: self.props.location.state.dept
      }
    });
  }
  handleCourse(event) {
    event.preventDefault();
    var self = this;
    self.props.history.push({
      pathname: '/addOrDropCourse',
      state: {
        email: self.props.location.state.email,
        term: self.props.location.state.term,
        dept: self.props.location.state.dept
      }
    });
  } 

  handleSchedule(event) {
    event.preventDefault();
    var self = this;
    self.props.history.push({
      pathname: '/courseSchedule',
      state: {
        email: self.props.location.state.email
      }
    });

  }

  render() {
    return (
      <div>
      {this.props.location.state.email}
        {this.props.location.state.term}
        {this.props.location.state.dept}
        <MuiThemeProvider>
          <div>
          <AppBar
             title="GSU PAWS - Home"
             style={
              { 
                background:"#ffb400" //hex color values (yellow)
              }
            }
            titleStyle = {
              {
                color:"#FFFFF" //color of text (black)
              }
            }
             showMenuIconButton={false}
           />
           <p> Welcome        {this.props.location.state.email} </p> 

             <RaisedButton label="Add/Drop Course" primary={true} style={style} onClick={(event) => this.handleCourse(event)}/>
             <br/>
             <RaisedButton label="View Course Schedule" primary={true} style={style} onClick={(event) => this.handleSchedule(event)}/>
             <br/>
             <RaisedButton label="View Fees" primary={true} style={style} onClick={(event) => this.handleFees(event)}/>
             <br/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
 margin: 25,
};


export default withRouter(PawsMainScreen)