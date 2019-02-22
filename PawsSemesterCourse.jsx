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
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class PawsSemesterCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
        termOfAdmission: "",
        selectionterm: 1,
        selectionDept: 1,
        dname: "",
        email: "",

    };
    this.handleDeptChange = this.handleDeptChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  
  handleDeptChange(event, index, value) {
    this.setState({ selectiondept : value});

        //Save program selection
  if( this.state.selectionDept == 1){
      this.setState({dname : "CSC"});
    } else if( this.state.selectionDept == 2) {
      this.setState({dname : "MATH"});
    } else if( this.state.selectionDept == 3) {
        this.setState({dname : "POLS"})
    }
}
handleTermChange(event, index, value) {
    //set selection to the value selected
    this.setState({ selectionterm : value });

        //Save the term selection
        if( this.state.selectionterm == 1){
            this.setState({termOfAdmission : "FA"});
          } else if( this.state.selectionterm == 2) {
            this.setState({termOfAdmission : "SP"});
          } else if( this.state.selectionterm == 3) {
            this.setState({termOfAdmission : "SU"});
          }
  }

  handleSubmit(event) {
    event.preventDefault();
    var self = this;
    self.props.history.push({
      pathname: '/pawsmainscreen',
      state: {
          email: self.props.location.state.email,
          term: self.state.termOfAdmission,
          dept: self.state.dname
        }

    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Select Semester and Department"
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
            <p>Choose a term of admission : </p>
            <DropDownMenu 
              value={this.state.selectionterm} 
              onChange={this.handleTermChange}   
            >
            <MenuItem value={1} primaryText='FA'  />
            <MenuItem value={2} primaryText='SP' />
            <MenuItem value={3} primaryText='SU' />

            </DropDownMenu>     
           <br/>
           <p>Choose a department : </p><br />
           <DropDownMenu 
              value={this.state.selectionDept} 
              onChange={this.handleDeptChange}   
            >
            <MenuItem value={1} primaryText="CSC"  />
            <MenuItem value={2} primaryText="MATH" />
            <MenuItem value={2} primaryText="POLS" />
            </DropDownMenu>     
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
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


export default withRouter(PawsSemesterCourse)