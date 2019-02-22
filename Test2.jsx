import axios from "axios";
import React from 'react';
import { withRouter } from 'react-router-dom'

class Test2 extends React.Component {
    // State will apply to the posts object which is set to loading by default
    state = {
      students: [],
      isLoading: true,
      errors: null
    };
    // Now we're going to make a request for data using axios
    getPosts() {
      axios
        // This is where the data is hosted
        .get("http://localhost:5000/slate/filterApplicantions")
        // Once we get a response and store data, let's change the loading state
        .then(response => {
          this.setState({
            students: response.data.students,
            isLoading: false
          });
        })
        // If we catch any errors connecting, let's update accordingly
        .catch(error => this.setState({ error, isLoading: false }));
    }
    // Let's our app know we're ready to render the data
    componentDidMount() {
      this.getPosts();
      console.log(this.state.students);
    }
    // Putting that data to use
    render() {
      const { isLoading, students } = this.state;
      return (
        <React.Fragment>
          <h2>Random Post</h2>
          <div>
            {!isLoading ? (
              students.map(post => {
                const { admissionStatus,termOfAdmission,dname,university,yearOfAdmission,program,email } = post;
                return (
                  <div key={email}>
                    <h2>{dname}</h2>
                    <p>{university}</p>
                    <hr />
                  </div>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </React.Fragment>
      );
    }
  }
  export default withRouter(Test2)