import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'

export default class EventView extends Component{
    constructor(props) {
      super(props);
      this.state = {
        eventName:'',
        columns: [
          { title: 'First Name', field: 'firstName' },
          { title: 'Last Name', field: 'lastName' },
          { title: 'Company', field: 'company' },
          { title: 'Title', field: 'title' },
          { title: 'Date ', field: 'time', type: 'date' },
         
        ],
        data: [
        ]
      }
    }

    componentDidMount(){
        this.updateAttendeeList()
        

    }

    updateAttendeeList = ()=>{
        axios.get('/api/event/' + this.props.match.params.id)
        .then(resp=>{
            this.setState({
                data:resp.data.attendees,
                eventName: resp.data.name
            })
        })
    }

    addAttendee = (newData) => {
        newData.event_id = this.props.match.params.id
        axios.post('/api/attendees', newData)
        .then(resp =>{
            this.updateAttendeeList()
        })
    }
  
    render() {
      return (
        <MaterialTable
          title={this.state.eventName + " attendees"}
          columns={this.state.columns}
          data={this.state.data}
          options={{
            exportButton: true
          }}
          editable={{
            onRowAdd: this.addAttendee,
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.data;
                    const index = data.indexOf(oldData);
                    data[index] = newData;
                    this.setState({ data }, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    let data = this.state.data;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
                    this.setState({ data }, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
          }}
        />
      )
    }
  }