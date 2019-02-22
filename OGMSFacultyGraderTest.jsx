import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";
import axios from 'axios'
import { withRouter } from 'react-router-dom'
const { DropDownEditor } = Editors;
const GradeTypes = [
  { id: "a", value: "A" },
  { id: "b", value: "B" },
  { id: "c", value: "C" },
  { id: "d", value: "D" },
  { id: "f", value: "F" },
  { id: "i", value: "I" },
  { id: "ip", value: "IP" },
  { id: "s", value: "S" },
  { id: "u", value: "U" }
];
const GradeTypeEditor = <DropDownEditor options={GradeTypes} />;
let id = 0;
let tmp = 1;
function createData(sid, term, year, crn,grade) {
  id += 1;
  tmp +=1;
  return { sid, term, year, crn,grade };
}
const columns = [
  { key: "sid", name: "Student ID", editable: function(rowData) {
    return rowData.allowEdit === false;
  }},
  { key: "term", name: "Term", editable: function(rowData) {
    return rowData.allowEdit === false;
  } },
  { key: "year", name: "Year", editable: function(rowData) {
    return rowData.allowEdit === false;
  } },
  { key: "crn", name: "CRN", editable: function(rowData) {
    return rowData.allowEdit === false;
  } },
  { key: "GradeType", name: "Grade", editor: GradeTypeEditor }
];
class MyComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      rows: [],
      isLoaded : false,
    }
    this.rowGetter = this.rowGetter.bind(this);     //here
}
  
    componentDidMount() {
      axios.get('http://localhost:5000/ogms/enroll', {
      }).then(res => {
          this.setState({
              isLoaded: true,
              data : res.data.students
          })
      }).catch(error => {
          this.setState({isLoaded: false});
      });
    }
    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
      this.setState(state => {

        const rows = state.rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
          rows[i] = { ...rows[i], ...updated };
          var payload = {
            sid: this.state.rows[i].sid,
            crn: this.state.rows[i].crn,
            year: this.state.rows[i].year,
            term: this.state.rows[i].term,
            grade: updated.GradeType,
        }
          axios.post('http://localhost:5000/ogms/grader',payload,{
          }).then(res => {
            console.log(res);
          }).catch(error => {
              this.setState({isLoaded: false});
          });
        }
        return { rows };
      });

    };
    rowGetter = (i) => {
      return this.state.rows[i];
    }
    render() {
      if(tmp == 1){
        this.state.data.forEach((item, i) => {
        this.state.rows.push(createData(item.sid, item.term, item.year, item.crn, item.grade));
        });}
    return (
      <div>
        <ReactDataGrid
          columns={columns}
          rowGetter={this.rowGetter.bind(this)}
          rowsCount={this.state.rows.length}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
        />
      </div>
    );    }
  }
  export default withRouter(MyComponent);