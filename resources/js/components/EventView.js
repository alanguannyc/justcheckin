import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable, { MTableToolbar } from 'material-table'
import { backup, ThreeDRotation } from '@material-ui/icons';
import {Paper,Table, TableBody, TableCell, TableHead, TableRow, Fab, CircularProgress, Button,} from '@material-ui/core';
import Papa from 'papaparse';
import moment from 'moment';



export default class EventView extends Component{
    constructor(props) {
      super(props);

      this.state = {
        eventName:'',
        uploads:'',
        columns: [
          { title: 'First Name', field: 'firstName' },
          { title: 'Last Name', field: 'lastName' },
          { title: 'Company', field: 'company' },
          { title: 'Title', field: 'title' },
          { title: 'Email', field: 'email' },
          { title: 'Checked in', field: 'checkin',
          render: rowData => {return rowData.checkin? <div>YES</div> : <div>NO</div> },
          lookup: { 0: 'NO', 1: 'YES' }
          }, 
          { title: 'Date ', field: 'checkedin_at', type: 'date' },
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

    uploadAttendees(data){
      axios.post('/api/event/' + this.props.match.params.id + '/bulk', data)
      .then(resp =>{

      })
    }

    removeAll=(evt, data)=>{
      axios.delete('/api/event/' + this.props.match.params.id + '/bulk')
      .then(resp => {
        this.updateAttendeeList()
      })
    }

    handleCapture = (e) => {
      
      
      // var app = this
      Papa.parse(e.target.files[0], {complete: function(results, file) {
        const uploadsData = []

        results.data.slice(1).map(attendee => {
          
          var firstName = attendee[0]
          var lastName = attendee[1]
          var email = attendee[2]
          var company = attendee[3]
          var title = attendee[4]
          var now = moment().format("YYYY-MM-DD HH:mm:ss")

          const attendeeToUpload = {
            event_id: this.props.match.params.id,
            firstName : firstName,
            lastName : lastName,
            email: email,
            company : company,
            title : title,
            created_at: now,
            checkin: false,
          }
          
          uploadsData.push(attendeeToUpload)

        })


        
        axios.post('/api/event/' + this.props.match.params.id + '/bulk', uploadsData)
        .then(resp =>{
          this.updateAttendeeList()
        })

      }.bind(this)});

      

      
      
    }
  
    render() {
      return (
        <div style={{'margin':'5px 20px'}}>
        <MaterialTable
        style={{'width': '100%', 'margin':'auto'}}
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
        <input
        accept="csv/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={this.handleCapture}
        />
        <label htmlFor="raised-button-file">
        <Fab color="primary" aria-label="backup" 
        style={{'bottom':'55px','right':'40px','position':'absolute'}}
        component="span"

        >
        
        <i className="material-icons" component="span">
        backup
        </i>

            </Fab>
        </label> 
            
            
            
        </div>
        
      )
    }
  }
