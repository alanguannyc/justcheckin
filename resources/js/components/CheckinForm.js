import React, { Component } from 'react';
import {Button, TextField, Paper} from '@material-ui/core';
import moment from 'moment'

export default class CheckinForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      firstName:'',
      lastName:'',
      company:'',
      title:'',
      email:'',
      checkin:false,
      checkedin_at:'',
    }
  }
  handleChange = (name, event) => {
    this.setState({
      [name] : event.target.value
    })
  }
  checkin = () => {
    
    var attendee = this.state
    attendee.event_id = this.props.eventID
    attendee.checkin = true
    attendee.checkedin_at = moment().format("YYYY-MM-DD HH:mm:ss")


    axios.post('/api/attendees', attendee)
      .then(resp =>{
        this.props.showSuccess()
        this.setState({
          firstName:'',
          lastName:'',
          company:'',
          title:'',
          email:'',
          checkin:false,
          checkedin_at:'',
        })
      })
  }
  render() {
    return (
      <Paper className="checkin-form">
        <form >
        
        <TextField
        style={{'width':'50%'}}
        required
        id="outlined-required"
        label="first name"
        margin="normal"
        variant="outlined"
        value={this.state.firstName}
        onChange={this.handleChange.bind(this, 'firstName')}
      />
      <TextField
      style={{'width':'50%'}}
        required
        id="outlined-required"
        label="last name"
        margin="normal"
        variant="outlined"
        value={this.state.lastName}
        onChange={this.handleChange.bind(this, 'lastName')}
      />
      <TextField
        fullWidth
        required
        id="outlined-required"
        label="company"
        margin="normal"
        variant="outlined"
        value={this.state.company}
        onChange={this.handleChange.bind(this, 'company')}
      />
      <TextField
        fullWidth
        required
        id="outlined-required"
        label="title"
        margin="normal"
        variant="outlined"
        value={this.state.title}
        onChange={this.handleChange.bind(this, 'title')}
      />
      <TextField
        fullWidth
        required
        id="outlined-required"
        label="email"
        type="email"
        margin="normal"
        variant="outlined"
        value={this.state.email}
        onChange={this.handleChange.bind(this, 'email')}
      />
      <div className="checkin-button" >
      <Button variant="contained" color="primary" onClick={this.checkin} >Check me in</Button>
      </div>
      
        </form>
      </Paper>
    )
  }
}
