import React, { Component } from "react";
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class PawsRegister extends Component {
  constructor(props) {
    super(props);

   // this.state = {
   //   newUser: {
   //     fname: "",
   //     email: "",
   //     lname: "",
   //     password: ""
   //
   //   }, chk: ""
   // };

    this.state = {
        fname: "",
        email: "",
        lname: "",
        password: "",
        addressone: "",
        addresstwo: "",
        city: "",
        state: "",
        zip: "",
        sType: "",
        majorDept: "",
        gradAssistant: "N",
        selectionDept: 1,
        selectionStype: 1    };

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleDeptChange = this.handleDeptChange.bind(this);
    this.handleStypeChange = this.handleStypeChange.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleFirstName(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          name: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleLastName(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          name: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleEmail(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          name: value
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
          name: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleStypeChange(event, index, value) {
    //set selection to the value selected
    this.setState({ selectionStype : value });

        //Save the term selection
        if( this.state.selectionStype == 1){
            this.setState({sType : "MS"});
          } else if( this.state.selectionStype == 2) {
            this.setState({sType : "PhD"});
          } else if( this.state.selectionStype == 3) {
            this.setState({sType : "UGRAD"});
          }
  }

  handleDeptChange(event, index, value) {
      this.setState({ selectionDept : value});

          //Save program selection
    if( this.state.selectionDept == 1){
        this.setState({majorDept : "CSC"});
      } else if( this.state.selectionDept == 2) {
        this.setState({majorDept : "MATH"});
      } else if( this.state.selectionDept == 3) {
          this.setState({majorDept : "POLS"});
      } else if( this.state.selectionDept == 4) {
        this.setState({majorDept : "HIST"});
    }
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
    var apiBaseUrl = "http://localhost:5000/paws/register";
    var self = this.state;
    var payload = {
        fname: self.fname,
        lname: self.lname,
        email: self.email,
        password: self.password,
        addressone: self.addressone,
        addresstwo: self.addresstwo,
        city: self.city,
        state: self.state,
        zip: self.zip,
        sType: self.sType,
        gradAssistant: self.gradAssistant,
        majorDept: self.majorDept,
    }
    axios.post(apiBaseUrl, payload).then(function (response) {
      console.log(response);
         let successmessage = response.data.Success;
        if (successmessage == "Applicant Registered Successfully") {
          if(response.status == 200)
          {
            console.log("Applicant Registered Successfully");
            alert("Success : Applicant Registered Successfully")
            self.props.history.push({
                pathname: '/plogin'
              });
          }
        }
        else {
          alert("Error : Applicant Could Not Be Registered");
        self.props.history.push({
          pathname: '/plogin'
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
      <MuiThemeProvider>
        <div>
        <AppBar
           title="Paws Registeration Portal"
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
         <p>Enter your Name : </p><br />
         <TextField
           hintText="Enter your first name"
           floatingLabelText=" Firstname (*) " 
           label="Required"
           onChange = {(event,newValue) => this.setState({fname:newValue})}
           />
           <TextField
             type="lastname"
             hintText="Enter your last name"
             label="Required"
             floatingLabelText=" Lastname (*) "
             onChange = {(event,newValue) => this.setState({lname:newValue})}
             />
           <br/>
           <p>Enter your Email and Choose a password : </p><br />
           <TextField
             type="email"
             hintText="Enter your email address"
             floatingLabelText="Email (*) "
             label="Required"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <TextField
             type="password"
             hintText="Choose a password"
             floatingLabelText="Password (*) "
             label="Required"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>  
           <p>Enter your Address : </p>
           <br/>
           <TextField
             type="address1"
             hintText="Address1"
             floatingLabelText="Address 1 "
             onChange = {(event,newValue) => this.setState({addressone:newValue})}
             />
           <TextField
             type="address2"
             hintText="Address2"
             floatingLabelText="Address 2 "
             onChange = {(event,newValue) => this.setState({addresstwo:newValue})}
             />             
           <br/>
           <TextField
             type="city"
             hintText="city"
             floatingLabelText="City"
             onChange = {(event,newValue) => this.setState({city:newValue})}
             />
           <TextField
             type="state"
             hintText="state"
             floatingLabelText="State "
             onChange = {(event,newValue) => this.setState({state:newValue})}
             />
           <TextField
             type="zip"
             hintText="zip"
             floatingLabelText="zip "
             onChange = {(event,newValue) => this.setState({zip:newValue})}
             />             
           <br/>
           <p>Choose course type : </p>
            <DropDownMenu 
              value={this.state.selectionStype} 
              onChange={this.handleStypeChange}   
            >
            <MenuItem value={1} primaryText='MS'  />
            <MenuItem value={2} primaryText='PhD' />
            <MenuItem value={3} primaryText='UGRAD' />

            </DropDownMenu>     
           <br/>
           <p>Choose a Department of admission : </p>
            <DropDownMenu 
              value={this.state.selectionDept} 
              onChange={this.handleDeptChange}   
            >
            <MenuItem value={1} primaryText='CSC'  />
            <MenuItem value={2} primaryText='MATH' />
            <MenuItem value={3} primaryText='POLS' />
            <MenuItem value={4} primaryText='HIST' />

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

export default withRouter(PawsRegister)