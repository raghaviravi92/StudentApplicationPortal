import React, { Component } from "react";
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom'
class RegisterFinalContainer extends Component {
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
        chk: "",
        addressone: "",
        addresstwo: "",
        city: "",
        state: "",
        zip: 0,
        grev: 0,
        greq: 0,
        grea: 0,
        toefl: 0
    };

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  //  this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormSubmitFinal = this.handleFormSubmitFinal.bind(this);
    this.handleInput = this.handleInput.bind(this);
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
  handleFormSubmitFinal(event) {
    if(this.state.fname && this.state.lname && this.state.email && this.state.password){
    var apiBaseUrl = "http://localhost:5000/register";
    var self = this;
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
            console.log("Applicant Registered Successfully");
            alert("Applicant Registered Successfully")
            self.props.history.push({
                pathname: '/'
              });
          }
        
        else {
          alert("Error : Applicant Could Not Be Registered");
        self.props.history.push({
          pathname: '/'
        });
        }
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }else{
    alert("Missing one of these mandatory fields : FirstName, LastName, Email and Password");
  }
  }

  // handleFormSubmitFinal(e){
  //   e.preventDefault();
  //   let userData = this.state.newUser;

  //   axios({
  //     method: "POST",
  //     url: "http://localhost:5000/register",
  //     headers: {
  //       'Content-Type': 'text/plain',
  //       'Access-Control-Allow-Credentials':'true'
  //     },   

  //      data: {
  //       fname: userData.fname,
  //       lname: userData.lname,
  //       email: userData.email,
  //       password: userData.password,
  //       addressone: userData.addressone,
  //       addresstwo: userData.addresstwo,
  //       city: userData.city,
  //       state: userData.state,
  //       zip: userData.zip,
  //       grev: userData.grev,
  //       greq: userData.greq,
  //       grea: userData.grea,
  //       toefl: userData.toefl
  //      }
  //   })
  //     .then(res => {
  //       console.log("res", res.data.message);
    
  //     })
  //     .catch(err => {
  //       console.log("error in request", err);
  //     });
  // }
  // handleFormSubmit(e) {
  //   e.preventDefault();
  //   var config = { headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*'}
  // }

  //  // let userData = this.state.newUser;
  //   //axios.get('http://localhost:5000/empdb/test/GSU')
  //   //axios.get('https://api.github.com/users/maecapozzi')
  //     //.then(response => this.setState({username: response.data}))
  //   //  .then(response => this.setState({username: response.data.students[0].dname}))

  //   axios.post('http://localhost:5000/register', {
  //    fname: this.state.fname,
  //     lname: this.state.lname,
  //     email: this.state.email,
  //     password: this.state.password,
  //     addressone: this.state.addressone,
  //     addresstwo: this.state.addresstwo,
  //     city: this.state.city,
  //     state: this.state.state,
  //     zip: this.state.zip,
  //     grev: this.state.grev,
  //     greq: this.state.greq,
  //     grea: this.state.grea,
  //     toefl: this.state.toefl
  //   },config).then(response => this.setState({chk: "success"}))
  //   //.then(function (response) {
  //   //  console.log(response);
  //   //})
  //   //.catch(function (error) {
  //    // console.log(error);
  //   //});
  // }
        
  //   //fetch("http://localhost:5000/empdb/testt/StudentRegister", {
  //    // method: "POST",
  //     //body: JSON.stringify(userData),
  //     //headers: {
  //     //  Accept: "application/json",
  //     //  "Content-Type": "application/json"
  //     //}
  //  // });
  //   //}

  // handleClearForm(e) {
  //   e.preventDefault();
  //   this.setState({
  //       fname: "",
  //       lname: "",
  //       email: "",
  //       password: "",
  //       addressone: "",
  //       addresstwo : "",
  //       city: "",
  //       state: "",
  //       zip: "",
  //       grea: "",
  //       greq: "",
  //       grev: "",
  //       toefl: ""
  //   });
  // }

 // render() {
 //   return (
 //     <form className="container-fluid" onSubmit={this.handleFormSubmit}>
 //       <Input
 //         inputType={"text"}
 //         title={"First Name "}
 //         name={"fname"}
 //         value={this.state.newUser.fname}
 //         placeholder={"Enter your first name"}
 //         handleChange={this.handleInput}
 //       />{" "}
 //       {/* fname */}
 //       <Input
 //         inputType={"text"}
 //         name={"lname"}
 //         title={"Last Name "}
 //         value={this.state.newUser.lname}
 //         placeholder={"Enter your last name"}
 //         handleChange={this.handleInput}
 //       />{" "}
 //       {/* lname */}
 //       <Input
 //         inputType={"text"}
 //         name={"email"}
 //         title={"Email Address "}
 //         value={this.state.newUser.email}
 //         placeholder={"Enter your email address"}
 //         handleChange={this.handleInput}
 //       />{" "}
 //       {/* email address */}
 //       <Input
 //         inputType={"text"}
 //         name={"password"}
 //         title={"Password  "}
 //         value={this.state.newUser.password}
 //         placeholder={"Choose a password"}
 //         handleChange={this.handleInput}
 //       />{" "}
 //       {/* Password */}
 //       <Button
 //         action={this.handleFormSubmitFinal}
 //         type={"primary"}
 //         title={"Submit"}
 //         style={buttonStyle}
 //       />{" "}
 //       {/*Submit */}
 //       <Button
 //         action={this.handleClearForm}
 //         type={"secondary"}
 //         title={"Clear"}
 //         style={buttonStyle}
 //       />{" "}
 //       {/* Clear the form */}
 //       <p>{this.state.username}</p>
 //     </form>
 //   );
 // }
//}

//const buttonStyle = {
//  margin: "10px 10px 10px 10px"
//};

//export default withRouter(RegisterFinalContainer);

render() {
  return (
    <div>
      <MuiThemeProvider>
        <div>
        <AppBar
           title="Slate Registeration Portal"
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
           <p>Enter your GRE Scores : </p>
           <br/>
           <TextField
             type="grev"
             hintText="grev"
             floatingLabelText="GRE-V "
             onChange = {(event,newValue) => this.setState({grev:newValue})}
             />
           <TextField
             type="greq"
             hintText="greq"
             floatingLabelText="GRE-Q "
             onChange = {(event,newValue) => this.setState({greq:newValue})}
             />
           <TextField
             type="grea"
             hintText="grea"
             floatingLabelText="GRE-A "
             onChange = {(event,newValue) => this.setState({grea:newValue})}
             />             
           <br/>
           <p>Enter your TOEFL Score: </p>
           <TextField
             type="toefl"
             hintText="toefl"
             floatingLabelText="TOEFL "
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

export default withRouter(RegisterFinalContainer)