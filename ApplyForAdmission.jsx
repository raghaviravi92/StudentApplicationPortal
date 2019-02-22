import React, { Component } from "react";

/* Import Components */
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker'

import { Link } from 'react-router-dom'

class ApplyForAdmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        university: "GSU",
        dname: "",
        program: "",
        dateOfApp: new Date() ,
        termOfAdmission: "",
        yearOfAdmission: "",
        admissionStatus: "PENDING",
        dataSentToPaws: "No",
        selectionterm: 1,
        selectionyear: 1,
        selectionprogram: 1,
        selectiondept: 1,

        date : new Date()
    };
    this.handleTermChange = this.handleTermChange.bind(this); 
    this.handleYearChange = this.handleYearChange.bind(this); 
    this.handleProgramChange = this.handleProgramChange.bind(this); 
    this.handleDeptChange = this.handleDeptChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDatechange = this.handleDatechange.bind(this);
    this.handleProgramChange = this.handleProgramChange.bind(this);
  console.log(this.props.location.state.username);
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

  handleProgramChange(event, index, value) {
      this.setState({ selectionprogram : value});

          //Save program selection
    if( this.state.selectionprogram == 1){
        this.setState({program : "MS"});
      } else if( this.state.selectionprogram == 2) {
        this.setState({program : "PhD"});
      }
  }

  handleDeptChange(event, index, value) {
    this.setState({ selectiondept : value});

        //Save program selection
  if( this.state.selectiondept == 1){
      this.setState({dname : "CSC"});
    } else if( this.state.selectiondept == 2) {
      this.setState({dname : "PHYS"});
    }
}

  handleYearChange(event, index, value) {
    //set selection to the value selected
    this.setState({ selectionyear : value });
        //Save year selection
        if( this.state.selectionyear == 1){
            this.setState({yearOfAdmission : "2019"});
          } else if( this.state.selectionyear == 2) {
            this.setState({yearOfAdmission : "2020"});
          } else if( this.state.selectionyear == 3) {
            this.setState({yearOfAdmission : "2021"});
          } else if( this.state.selectionyear == 4) {
            this.setState({yearOfAdmission : "2022"});
          }
  }

  pageControl(){
    //Save the term selection
    if( this.state.selectionterm == 1){
        this.setState({termOfAdmission : "FA"});
      } else if( this.state.selection == 2) {
        this.setState({termOfAdmission : "SP"});
      } else if( this.state.selection == 3) {
        this.setState({termOfAdmission : "SU"});
      }
    //Save program selection
    if( this.state.selectionprogram == 1){
        this.setState({termOfAdmission : "MS"});
      } else if( this.state.selection == 2) {
        this.setState({termOfAdmission : "PhD"});
      }
    //Save year selection
    if( this.state.selectionyear == 1){
        this.setState({termOfAdmission : "2019"});
      } else if( this.state.selection == 2) {
        this.setState({termOfAdmission : "2020"});
      } else if( this.state.selection == 3) {
        this.setState({termOfAdmission : "2021"});
      } else if( this.state.selection == 4) {
        this.setState({termOfAdmission : "2022"});
      }
  }
  handleUpdate(event) {
    var self = this;
    self.props.history.push({
      pathname: '/slateUpdate',
      state: {
        email: self.props.location.state.email
      }
    });
  }
  handleDatechange(event, index, value) {
      this.setState({ dateOfApp : new Date() });
      }

      handleSubmit(event) {
        var apiBaseUrl = "http://localhost:5000/applyForAdmission";
        var self = this;
        var payload = {
            email: this.state.email,
            university: this.state.university,
            dname: this.state.dname,
            program: this.state.program,
            dateOfApp: this.state.dateOfApp,
            termOfAdmission: this.state.termOfAdmission,
            yearOfAdmission: this.state.yearOfAdmission,
            admissionStatus: this.state.admissionStatus,
            dataSentToPaws: this.state.dataSentToPaws,
        }
        axios.post(apiBaseUrl, payload).then(function (response) {
          console.log(response);
             let successmessage = response.data.Success;
            if (successmessage == "Application Submitted Successfully") {
              if(response.status == 200)
              {
                console.log("Application Submitted Successfully");
                alert("Success : Application Submitted Successfully")
                self.props.history.push({
                    pathname: '/'
                  });
              }
            }
            else {
              alert("Error : Application Could Not Be Submitted");
            self.props.history.push({
              pathname: '/'
            });
            }
        })
        .catch(function (error) {
          console.log(error);
        });
        event.preventDefault();
      }

render() {
  return (
    <div>
      {/* {
        this.props.location.state.username
      } */}
      <MuiThemeProvider>
        <div>
        <AppBar
           title="Students Application Portal"
           showMenuIconButton={false}
         />
         <RaisedButton label="Update Profile" primary={true} style={style} onClick={(event) => this.handleUpdate(event)}/>
         <p>Enter your Email : </p>
         <TextField
           hintText="Enter your registered email"
           label="Disabled"
           floatingLabelText=" Email (*) " 
           defaultValue={this.props.location.state.email}
           onChange = {(event,newValue) => this.setState({email:newValue})}
           /><br />
           <TextField
             type="university"
             label="Disabled"
             defaultValue="GSU"
             floatingLabelText=" University (*) "
             onChange = {(event,newValue) => this.setState({university:newValue})}
             />
           <br/>
           <p>Choose a department : </p><br />
           <DropDownMenu 
              value={this.state.selectiondept} 
              onChange={this.handleDeptChange}   
            >
            <MenuItem value={1} primaryText="CSC"  />
            <MenuItem value={2} primaryText="PHYS" />
            </DropDownMenu>     
           <br/>
           <p>Choose a program : </p><br />
           <DropDownMenu 
              value={this.state.selectionprogram} 
              onChange={this.handleProgramChange}   
            >
            <MenuItem value={1} primaryText="MS"  />
            <MenuItem value={2} primaryText="PhD" />
            </DropDownMenu>     
           <br/>
           <br />
           <p>Enter Date : </p><br />
           <DatePicker
            autoOk={true}
            hintText="Select Date"
            value={this.state.date}
            onChange={this.handleDatechange}
            />
            <br />
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
           <p>Choose a year of admission : </p>
            <DropDownMenu 
              value={this.state.selectionyear} 
              onChange={this.handleYearChange}   
            >
            <MenuItem value={1} primaryText='2019'  />
            <MenuItem value={2} primaryText='2020' />
            <MenuItem value={3} primaryText='2021' />
            <MenuItem value={4} primaryText='2022' />
            </DropDownMenu>     
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
       </div>
       </MuiThemeProvider>
    </div>
  );
}
}
const style = {
margin: 25,
};

export default withRouter(ApplyForAdmission)