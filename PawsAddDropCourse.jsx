import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

let counter = 0;
let tmp = 1;
function createData(crn,year,ctitile,section,days,startTime,endTime,room,cap,instructor,auth) {

    counter += 1;
    tmp +=1;
    return { id: counter,crn,year,ctitile,section,days,startTime,endTime,room,cap,instructor,auth };
  }

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'crn', numeric: false, disablePadding: true,  label: 'CRN' },
    { id: 'ctitile', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'section', numeric: false, disablePadding: false, label: 'Section' },
    { id: 'days', numeric: false, disablePadding: false, label: 'Days' },
    { id: 'startTime', numeric: false, disablePadding: false, label: 'StartTime' },
    { id: 'endTime', numeric: true, disablePadding: false, label: 'EndTime' },
    { id: 'room', numeric: true, disablePadding: false, label: 'Room' },
    { id: 'cap', numeric: true, disablePadding: false, label: 'Cap' },
    { id: 'instructor', numeric: true, disablePadding: false, label: 'Instructor' },
    { id: 'auth', numeric: true, disablePadding: false, label: 'Auth' },
  ];

class PawsEnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

PawsEnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let PawsEnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  function handleButtonClick(event) {
    console.log("Hello World");
    //console.log(this.state.selected);

  }

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Add or Drop Courses

          </Typography>
        )}
        <p><Link to="/">Logout</Link>             </p>
      </div>
    </Toolbar>
  );
};

PawsEnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

PawsEnhancedTableToolbar = withStyles(toolbarStyles)(PawsEnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '96%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
})

class PawsEnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'crn',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 10,
    isLoaded: false,
    isLoadedtwo: false,
    dataRows: [],
    selectedcrn: [],
    term: "",
    dept: "",
    email: "",
    tempcrn: [],
  };

  componentDidMount(){
    var apiBaseUrl = "http://localhost:5000/paws/addordropcourse";
    var payload = {
        email: this.props.location.state.email,
        term: this.props.location.state.term,
        dept: this.props.location.state.dept,
    }
    axios.post("http://localhost:5000/paws/selectedCourses",payload,{
    }).then(res => {
        console.log(res);
        this.setState({
            isLoadedtwo: true,
            tempcrn : res.data.students
        })    
    }).catch(error => {
        console.log(error);
    });
    axios.post(apiBaseUrl, payload, {
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

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.dataRow.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
   // if (this.state.selected && this.state.selected.length) {
        if (this.state.selected.indexOf(id) > -1) {
            this.state.dataRows.map( n => {
                if(id == n.id){
                    var apiBaseUrl = "http://localhost:5000/paws/disenroll";
                    var crn = n.crn;
                    var year = n.year;
                    var payload = {
                        email: this.props.location.state.email,
                        term: this.props.location.state.term,
                        crn: crn,
                        year: year,
                    }
                    axios.post(apiBaseUrl, payload).then(function (response) {
                      console.log(response);
                         let successmessage = response.data.Success;
                        if (successmessage == "Course Dropped Successfully") {
                          if(response.status == 200)
                          {
                            console.log("Course Dropped Successfully");
                            alert("Success : Course Dropped Successfully")
                          }
                        }
                        else {
                          alert("Error : Course Could Not be Dropped");
                        }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                    event.preventDefault();
                }
            })
        }   
    //} 
    else{
        this.state.dataRows.map( n => {
            if(id == n.id){
                var apiBaseUrl = "http://localhost:5000/paws/enroll";
                var crn = n.crn;
                var year = n.year;
                var payload = {
                    email: this.props.location.state.email,
                    term: this.props.location.state.term,
                    crn: crn,
                    year: year,
                }
                axios.post(apiBaseUrl, payload).then(function (response) {
                  console.log(response);
                     let successmessage = response.data.Success;
                    if (successmessage == "Course Enrolled successfully") {
                      if(response.status == 200)
                      {
                        console.log("Course Enrolled successfully");
                        alert("Success : Course Enrolled successfully")
                      }
                    }
                    else {
                      alert("Error : Course Enrollment Failed");
                    }
                })
                .catch(function (error) {
                  console.log(error);
                });
                event.preventDefault();
            }
        })
    }

    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  
  //isSelected = crn => this.state.selectedcrn.indexOf(crn) !== -1;
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { isLoaded, isLoadedtwo } = this.state
    if (isLoaded == false || isLoadedtwo == false) return null;


    if(tmp == 1){
        this.state.data.forEach((item, i) => {
            this.state.dataRows.push(createData(item.crn,item.year,item.ctitile,item.section,item.days,item.startTime,item.endTime,item.room,item.cap,item.instructor,item.auth));
            });
        this.state.tempcrn.forEach((item, i) => {
            this.state.selectedcrn.push(item.crn);
        });
        if(this.state.selectedcrn && this.state.selectedcrn.length){
            this.state.dataRows.map( n => {
                if(this.state.selectedcrn.indexOf(n.crn) > -1){
                    this.state.selected.push(n.id);
                }

            })
        }
        }
    const { classes } = this.props;
    const { dataRows, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataRows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <PawsEnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
        {this.props.location.state.email}
        {this.props.location.state.term}
        {this.props.location.state.dept}
          <Table className={classes.table} aria-labelledby="tableTitle">
            <PawsEnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={dataRows.length}
            />
            <TableBody>
              {stableSort(dataRows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell align="right">{n.crn}</TableCell>
                      <TableCell align="right">{n.ctitile}</TableCell>
                      <TableCell align="right">{n.section}</TableCell>
                      <TableCell align="right">{n.days}</TableCell>
                      <TableCell align="right">{n.startTime}</TableCell>
                      <TableCell align="right">{n.endTime}</TableCell>
                      <TableCell align="right">{n.room}</TableCell>
                      <TableCell align="right">{n.cap}</TableCell>
                      <TableCell align="right">{n.instructor}</TableCell>
                      <TableCell align="right">{n.auth}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />

      </Paper>
    );
  }
}

PawsEnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const style = {
    margin: 25,
    };
export default withRouter(withStyles(styles)(PawsEnhancedTable));
