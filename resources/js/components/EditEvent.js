import React, { Component }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
DialogTitle} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';



export default class EditEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        name: '',
        fromDate:'',
        toDate:'',
    };
  }
  componentDidMount(){
    this.getEventDetail()
  }

  getEventDetail = ()=> {
    axios.get('/api/event/' + this.props.data.id)
    .then(resp=>{
        const {name, fromDate, toDate} = resp.data
        this.setState({
            name: name,
            fromDate: fromDate,
            toDate: toDate
        })
    })

    
  }

  handleClose = () => {
      this.props.finishEditing()
    this.setState({open : false});
  };


  confirmEditing = () => {
    const newEvent = {
        name: this.state.name,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate
    }
      axios.post('/api/event/' + this.props.data.id + '/edit', newEvent)
      .then(resp=>{
        this.props.finishEditing()
      })
    this.handleClose()
  }

  handleChange = (name, event) => {
    this.setState({
        [name] : event.target.value
    })
  }

  render() {

      const {data, editing} = this.props
      

        return (
            <div>
          <Dialog open={editing} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please edit the name and date of the event below.
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
              <Button onClick={this.confirmEditing} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
          ) 
    
 
}
  
}
