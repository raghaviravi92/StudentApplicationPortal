import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";
import axios from 'axios'
import { withRouter } from 'react-router-dom'
const { DropDownEditor } = Editors;
const AmountTypes = [
  { id: "a", value: "16000" },
  { id: "b", value: "8000" },
  { id: "c", value: "4000" }
];
const AmountTypeEditor = <DropDownEditor options={AmountTypes} />;
let id = 0;
let tmp = 1;
function createData(sid, term, year,amount) {
  id += 1;
  tmp +=1;
  return { sid, term, year,amount };
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
  { key: "AmountType", name: "Amount", editor: AmountTypeEditor }
];
class Assistantship extends React.Component {
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
      axios.get('http://localhost:5000/ogms/assistantship', {
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
            amount: updated.AmountType,
        }
          axios.post('http://localhost:5000/ogms/updateAssistantship',payload,{
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
        this.state.rows.push(createData(item.sid, item.term, item.year,"0"));
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
  export default withRouter(Assistantship);