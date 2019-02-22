import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
});

let id = 0;
let tmp = 1;
function createData(sid, email, sType, fname, lname) {
  id += 1;
  tmp +=1;
  return { sid, email, sType, fname, lname };
}


class SimpleTable extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    data: [],
    isLoaded: false,
    dataRows: [],
  };  
}
  componentDidMount(){
    axios.get('http://localhost:5000/ogms/students', {
   }).then(res => {
       this.setState({
           isLoaded: true,
           data : res.data.students
       })
   }).catch(error => {
       this.setState({isLoaded: false});
   });
   }
  render() {
    const { classes } = this.props;
    if(tmp == 1){
      this.state.data.forEach((item, i) => {
      this.state.dataRows.push(createData(item.sid, item.email, item.sType, item.fname, item.lname));
      var apiBaseUrl = "http://localhost:5000/ogms/studentsenroll";
      var payload = {
          email: item.email,
          sid: item.sid,
          sType: item.sType,
          fname: item.fname,
          lname: item.lname
      }
      axios.post(apiBaseUrl, payload).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    });}
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Student ID</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Degree</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.dataRows.map(row => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.sid}</TableCell>
              <TableCell align="left">{row.fname}</TableCell>
              <TableCell align="left">{row.lname}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.sType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
}
SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SimpleTable));
