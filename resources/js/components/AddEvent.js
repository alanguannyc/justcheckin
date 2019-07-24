import React, { Component }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
DialogTitle} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';



export default class AddEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        name: '',
        fromDate:'2019-05-24T10:30',
        toDate:'2019-05-24T11:30',
    };
  }

  handleOpen = () => {
    this.setState({open : true});
  };

  handleClose = () => {
    this.setState({open : false});
  };

  addEvent = () => {
      const newEvent = {
          name: this.state.name,
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
      }
    axios.post('/api/events', newEvent)
    .then(resp => {
        this.props.updateEvent()
        this.handleClose()
    })
  }

  handleChange = (name, event) => {
    this.setState({
        [name] : event.target.value
    })
}

  render() {
      const {open} = this.state
    return (
        

        <div>
        <AddIcon onClick={this.handleOpen.bind(this)} />

      <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add an event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please input the name and date of the event below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Event Name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange.bind(this, "name")}
            fullWidth
          />
          
          <TextField
            id="fromdatetime-local"
            label="From"
            type="datetime-local"

            value={this.state.fromDate}
            onChange={this.handleChange.bind(this, "fromDate")}
            InputLabelProps={{
            shrink: true,
            }}
        />
          <TextField
            id="todatetime-local"
            label="To"
            type="datetime-local"

            value={this.state.toDate}
            onChange={this.handleChange.bind(this, "toDate")}
            InputLabelProps={{
            shrink: true,
            }}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.addEvent} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      );
  }
  
}
