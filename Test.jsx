// import React,{Component} from "react";
 import axios from "axios";
// import { withRouter } from 'react-router-dom'

// class Test extends Component{
// constructor(){
// super();
// this.state={
//     students: [{
//         admissionStatus: null,
//         termOfAdmission: null,
//         dname: null,
//         university: null,
//         yearOfAdmission: null,
//         program: null,
//         email: null
//     }]}
// }
// // async componentDidMount() {
// //     //this.setState({ userMsg: "chk" });

// //     const res = await axios.get('http://localhost:5000/slate/filterApplicantions', {});
// //     //this.setState({userMsg:res.data.students[0]});
// //     console.log(res.data.students[0]);
// //     this.setState({userMsg:res.data});

// // }
// // async componentDidMount(){
// // const res = await axios.get("http://localhost:5000/slate/filterApplicantions",{}).then((res)=>{
// // //on success
// // this.setState({
// // userMsg:res.data
// // });
// // }).catch((error)=>{
// // //on error
// // alert("There is an error in API call.");
// // });
// // }
// // async componentDidMount() {
// //     this.setState({ userMsg: [] });
// //     let samarr = [];
// //     const res = await axios.get('http://localhost:5000/slate/filterApplicantions', {
// //     });
// //     samarr = await res.data;

// //     this.setState({userMsg : samarr});
// // }
// componentWillMount() {
//     const request = {
//         method: 'GET',
//         URL: 'http://localhost:5000/slate/filterApplicantions'
//     };
//     console.log('Calling fetch....', this.state);

//         fetch('http://localhost:5000/slate/filterApplicantions')
//           .then(response => response.json())
//           .then(data => this.setState({ students : data }));
//     // fetch(request)
//     // .then((request.data) => {
//     //     console.log("Data recieved!", data);
//     //      this.setState(
//     //                  { students : data });
//     // });
// }
// render(){
// return(
// // this.state.userMsg!=null &&
// <div>
// {/* <h2>{this.state.userMsg.title}</h2> */}
// <p>{this.state.students}</p>
// </div>
// );
// }
// }  
// export default withRouter(Test)

import React from 'react';
import { withRouter } from 'react-router-dom'
class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      students: []
    };
  }

  componentDidMount() {
    // fetch('http://localhost:5000/slate/filterApplicantions')
    // .then(
    //     (result) => {
    //       this.setState({
    //         isLoaded: true,
    //         students: result.data
    //       });
    //     },
    //     // error handler
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )
    axios.get('http://localhost:5000/slate/filterApplicantions', {
    }).then(res => {
        this.setState({
            isLoaded: true,
            students : res.data.students
        })
    }).catch(error => {
        this.setState({isLogged: false});
    });
    console.log(this.state.students);
  }

  render() {

    const { error, isLoaded, students } = this.state;

    if (error) {
      return (
        <div className="col">
          Error: {error.message}
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="col">
          Loading...
        </div>
      );
    } else {
        return (
            <div className="col">
              <h1>Mi Casa</h1>
              <p>This is my house y&apos;all!</p>
              {students.map(student => <div>{student.university}</div>)}
            </div>
          );
    }
  }
}

export default withRouter(Test)