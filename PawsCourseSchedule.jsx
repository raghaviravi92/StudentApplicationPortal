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
function createData(sid, term, year, crn,grade) {
  id += 1;
  tmp +=1;
  return { sid, term, year, crn,grade };
}

class PawsCourseSchedule extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    data: [],
    isLoaded: false,
    dataRows: [],
  };  
}
  componentDidMount(){
    var apiBaseUrl = "http://localhost:5000/paws/courseSchedule";
    var payload = {
        email: this.props.location.state.email,
    }
    axios.post(apiBaseUrl,payload,{
    }).then(res => {
        console.log(res);
        this.setState({
            isLoaded: true,
            data : res.data.students
        })    
    }).catch(error => {
        console.log(error);
    });
   }
  render() {
    const { classes } = this.props;
    if (this.state.isLoaded == false) return null;
    if(tmp == 1){
      this.state.data.forEach((item, i) => {
      this.state.dataRows.push(createData(item.sid, item.term, item.year, item.crn, item.grade));
      });}
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Student ID</TableCell>
            <TableCell align="left">Term</TableCell>
            <TableCell align="left">Year</TableCell>
            <TableCell align="left">CRN</TableCell>
            <TableCell align="left">Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.dataRows.map(row => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.sid}</TableCell>
              <TableCell align="left">{row.term}</TableCell>
              <TableCell align="left">{row.year}</TableCell>
              <TableCell align="left">{row.crn}</TableCell>
              <TableCell align="left">{row.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
}
PawsCourseSchedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PawsCourseSchedule));