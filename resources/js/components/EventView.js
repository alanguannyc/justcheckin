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
          { title: 'Notes ', field: 'note'},
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

    deleteAttendee = (oldData) => {

        axios.delete('/api/attendee/' + oldData.id)
        .then(resp =>{
            this.updateAttendeeList()
        })
    }

    updateAttendee = (newData, oldData) => {
        axios.post('/api/attendee/' + oldData.id + '/edit', newData)
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
            exportButton: true,
            pageSize: 10,
          }}
          editable={{ 
            onRowAdd: newData => new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            }).then(this.addAttendee(newData)),
            
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve("success")
                }, 1000)
              }).then( resp=>{
                this.updateAttendee(newData, oldData)
              }
                  
              ),

            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve()
                }, 1000)
              }).then(
                  this.deleteAttendee(oldData)
              ),
          }}
        />
      )
    }
  }