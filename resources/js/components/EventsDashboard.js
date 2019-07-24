import React, { Component }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table, TableBody, TableCell, TableHead, TableRow, Fab} from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import EventModal from './AddEvent';
import MaterialTable from 'material-table'
import Axios from 'axios';
import ConfirmDialog from './ConfirmationDialog.js';
import EditEvent from './EditEvent'


class EventsDashboard extends Component {

    constructor(props) {
      super(props);
      this.child = React.createRef();
      this.state = {
        data: [],
        editing:false,
        eventData:'',
        openDialog:false,
        confirmed:false,
      }
    }

    componentDidMount() {
      this.updateEventList()
    }
   

    updateEventList = () => {
      Axios.get('/api/events')
      .then((resp)=>{

        this.setState({
          data : resp.data
        })

      })
    }

    handleSelection = (rows)=>{

    }

    handleDelete = (evt, data) => {
        const eventID = data[0].id
        Axios.delete('/api/event/' + eventID)
        .then(resp => {
          this.updateEventList()
          this.setState({confirmed: false})
        })
    }

    handleUpdate = (evt, data) => {
      this.updateEventList()
      this.setState({
        eventData: data[0],
        editing: true
      })
      // this.child.current.getEventDetail();
      const eventID = data[0].id
      
  }

    confirmDelete = (evt, data) => {
      this.setState({
        openDialog:true
      })


    }

    finishEditing = () => {
      this.updateEventList()
      this.setState({
        editing: false
      })
      
    }

    onOpenConfirmation = () => {

      this.setState({openDialog: false, confirmed: true})

    }

    onCancelConfirmation = () => {
      this.setState({openDialog: false})
    }

    render(){
        return (
          <div>
            <Paper >
            <ConfirmDialog onOpen={this.state.openDialog} onComfirmation={this.onOpenConfirmation} onCancel={this.onCancelConfirmation}/>
              <MaterialTable
              title="HANYC Events"
              columns={[
                { title: 'Name', field: 'name', 
                render: rowData => <Link to={'/event/' + rowData.id + '/attendees'} style={{width: 40, borderRadius: '50%'}}> {rowData.name} </Link> },

                { title: 'Date', field: 'fromDate' },
                { title: 'RSVP', field: 'numberOfRSVP' },

              ]}
              data={this.state.data}  
              options={{
                selection: true,
                sorting: true

              }}
              actions={[
                {
                  tooltip: 'Remove All Selected Users',
                  icon: 'delete',
                  onClick: this.handleDelete
                },
                {
                  tooltip: 'Edit selected event',
                  icon: 'edit',
                  onClick: this.handleUpdate
                }
              ]}
              onSelectionChange={this.handleSelection}
            />
            </Paper>
            
            <Fab color="primary" aria-label="Add" style={{'bottom':'55px','right':'40px','position':'absolute'}}>
           <EventModal updateEvent={this.updateEventList} />
            </Fab>
            {this.state.editing ? <EditEvent  data={this.state.eventData} editing={this.state.editing} finishEditing={this.finishEditing} /> : <div></div>}
              

            </div>
          );
    }
  
}

export default EventsDashboard;