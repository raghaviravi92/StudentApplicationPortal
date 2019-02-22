import React, { Component } from "react";
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom'

let counter = 0;
let tmp = 1;
function createData(fname,lname,password,addressone,addresstwo,city,state,zip,grev,greq,toefl) {

    counter += 1;
    tmp +=1;
    return {fname,lname,password,addressone,addresstwo,city,state,zip,grev,greq,toefl };
  }

class SlateUpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fname: "",
        lname: "",
        password: "",
        addressone: "",
        addresstwo: "",
        city: "",
        state: "",
        zip: 0,
        grev: 0,
        greq: 0,
        grea: 0,
        toefl: 0,
        student: [],
        isLoaded: false,
        studentprofile: [],
        email: this.props.location.state.email,
    };
    this.handleFormSubmitFinal = this.handleFormSubmitFinal.bind(this);
  }

  componentDidMount(){
    var apiBaseUrl = "http://localhost:5000/slate/studentprofile";
    var payload = {
        email: this.props.location.state.email
    }
    axios.post(apiBaseUrl,payload,{
    }).then(res => {
        console.log(res);
        this.setState({
            isLoaded: true,
            student : res.data.students
        })    
    }).catch(error => {
        console.log(error);
    });
    }
  /* This lifecycle hook gets executed when the component mounts */

  handleFormSubmitFinal(event) {
    var apiBaseUrl = "http://localhost:5000/slate/updatestudentprofile";
    var self = this;
    // this.state.studentprofile.forEach((item,i) => {
    //     this.setState({
    //         fname: item.fname,
    //         lname: item.lname,
    //         password: item.password,
    //         addressone: item.addressone,
    //         addresstwo: item.addresstwo,
    //         city: item.city,
    //         state: item.state,
    //         zip: item.zip,
    //         grev: item.grev,
    //         greq: item.greq,
    // //        grea: item.grea,
    //         toefl: item.toefl,            
    //     })

    // });
    var payload = {
     fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      addressone: this.state.addressone,
      addresstwo: this.state.addresstwo,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      grev: this.state.grev,
      greq: this.state.greq,
      grea: this.state.grea,
      toefl: this.state.toefl,
    }
    axios.post(apiBaseUrl, payload).then(function (response) {
      console.log(response);
          if(response.status == 200)
          {
            console.log("Student Profile Updated Successfully");
            alert("Student Profile Updated Successfully")
            self.props.history.push({
                pathname: '/'
              });
          }
        
        else {
          alert("Error : Student Profile Could Not Be Updated");
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
    const { isLoaded } = this.state
    if (isLoaded == false) return null;
    if(tmp == 1){
    this.state.student.forEach((item, i) => {
        this.state.studentprofile.push(createData(item.fname,item.lname,item.password,item.address1,item.address2,item.city,item.state,item.zip,item.grev,item.greq,item.toefl));
        });
    }
  return (
    <div>
      <MuiThemeProvider>
        <div>
        <AppBar
           title="Slate Update Your Information"
           showMenuIconButton={false}
         />
           <p> Welcome        {this.props.location.state.email} </p> 
        <p>Email : </p>
         <TextField
           hintText="Enter your registered email"
           label="Disabled"
           floatingLabelText=" Email (*) " 
           defaultValue={this.props.location.state.email}
           onChange = {(event,newValue) => this.setState({email:newValue})}
           /><br />
         <p>Enter your Name : </p><br />
         <TextField
           hintText="Enter your first name"
           floatingLabelText=" Firstname (*) " 
           label="Required"
           defaultValue={this.state.studentprofile[0].fname}
           onChange = {(event,newValue) => this.setState({fname:newValue})}
           />
           <TextField
             type="lastname"
             hintText="Enter your last name"
             label="Required"
             floatingLabelText=" Lastname (*) "
             defaultValue={this.state.studentprofile[0].lname}
             onChange = {(event,newValue) => this.setState({lname:newValue})}
             />
           <br/>
           <p>Choose a new password : </p><br />
           <TextField
             type="password"
             hintText="Choose a password"
             floatingLabelText="Password (*) "
             defaultValue={this.state.studentprofile[0].password}
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
             defaultValue={this.state.studentprofile[0].addressone}
             onChange = {(event,newValue) => this.setState({addressone:newValue})}
             />
           <TextField
             type="address2"
             hintText="Address2"
             floatingLabelText="Address 2 "
             defaultValue={this.state.studentprofile[0].addresstwo}
             onChange = {(event,newValue) => this.setState({addresstwo:newValue})}
             />             
           <br/>
           <TextField
             type="city"
             hintText="city"
             floatingLabelText="City"
             defaultValue={this.state.studentprofile[0].city}
             onChange = {(event,newValue) => this.setState({city:newValue})}
             />
           <TextField
             type="state"
             hintText="state"
             floatingLabelText="State "
             defaultValue={this.state.studentprofile[0].state}
             onChange = {(event,newValue) => this.setState({state:newValue})}
             />
           <TextField
             type="zip"
             hintText="zip"
             floatingLabelText="zip "
             defaultValue={this.state.studentprofile[0].zip}
             onChange = {(event,newValue) => this.setState({zip:newValue})}
             />             
           <br/>
           <p>Enter your GRE Scores : </p>
           <br/>
           <TextField
             type="grev"
             hintText="grev"
             floatingLabelText="GRE-V "
             defaultValue={this.state.studentprofile[0].grev}
             onChange = {(event,newValue) => this.setState({grev:newValue})}
             />
           <TextField
             type="greq"
             hintText="greq"
             floatingLabelText="GRE-Q "
             defaultValue={this.state.studentprofile[0].greq}
             onChange = {(event,newValue) => this.setState({greq:newValue})}
             />
           <TextField
             type="grea"
             hintText="grea"
             floatingLabelText="GRE-A "
             defaultValue={this.state.grea}
             onChange = {(event,newValue) => this.setState({grea:newValue})}
             />             
           <br/>
           <p>Enter your TOEFL Score: </p>
           <TextField
             type="toefl"
             hintText="toefl"
             floatingLabelText="TOEFL "
             defaultValue={this.state.studentprofile[0].toefl}
             onChange = {(event,newValue) => this.setState({toefl:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleFormSubmitFinal(event)}/>
       </div>
       </MuiThemeProvider>
    </div>
  );
}
}
const style = {
margin: 25,
};

export default withRouter(SlateUpdateProfile)