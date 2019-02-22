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
function createData(cprefix, cno, ctitle, chours) {
  id += 1;
  tmp +=1;
  return { cprefix, cno, ctitle, chours };
}

class SimpleCourse extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    data: [],
    isLoaded: false,
    dataRows: [],
  };  
}
  componentDidMount(){
    axios.get('http://localhost:5000/ogms/course', {
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
      this.state.dataRows.push(createData(item.cprefix, item.cno, item.ctitle, item.chours));
      });}
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Course Prefix</TableCell>
            <TableCell align="left">Course Number</TableCell>
            <TableCell align="left">Course Title</TableCell>
            <TableCell align="left">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.dataRows.map(row => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.cprefix}</TableCell>
              <TableCell align="left">{row.cno}</TableCell>
              <TableCell align="left">{row.ctitle}</TableCell>
              <TableCell align="left">{row.chours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
}
SimpleCourse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SimpleCourse));
