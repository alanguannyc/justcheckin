import React, { Component, useRef }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table, TableBody, TableCell, TableHead, TableRow, Fab, CircularProgress} from '@material-ui/core';
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
      this.childRef = React.createRef();
      this.state = {
        data: [],
        editing:false,
        selectedEvent:'',
        askForConfirmation:false,
        confirmed:false,
        isLoading:false
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

    handleDelete = (evt, data) => {
      
        this.setState({
          selectedEvent: data[0]
        })
        this.childRef.current.handleClickOpen()
        
    }

    handleUpdate = (evt, data) => {
      this.updateEventList()
      this.setState({
        eventData: data[0],
        editing: true
      })
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

    onDeleteConfirmation = () => {
      this.setState({
        isLoading:true
      })
      setTimeout(()=>{
        Axios.delete('/api/event/' + this.state.selectedEvent.id)
        .then(resp => {
          this.updateEventList()
          this.setState({isLoading: false})
        })
    }, 500)
      

    }

    onCancelConfirmation = () => {
      this.setState({openDialog: false})
    }

    render(){
      
        const progressStyle = {
         
            'position': 'absolute',
            'zIndex':'999',
            'margin':'auto',
            'left': '50%',
            'top': '50%',
          
        }
        return (
          <div>
            <Paper >
            {this.state.isLoading ? <CircularProgress style={progressStyle} /> : <div></div>}
            
            <ConfirmDialog ref={this.childRef} onComfirmation={this.onDeleteConfirmation} onCancel={this.onCancelConfirmation}/>
              <MaterialTable
              title="HANYC Events"
              columns={[
                { title: 'Name', field: 'name', 
                render: rowData => <Link to={'/event/' + rowData.id + '/attendees'} style={{width: 40, borderRadius: '50%'}}> {rowData.name} </Link> },

                { title: 'Date', field: 'fromDate',
                render: rowData => {
                  var fromDate = rowData.fromDate.split("T")
                  var toDate = rowData.toDate.split("T")
                  if(fromDate[0] == toDate[0]){
                    return <div> {rowData.fromDate.split("T").join(" ") + " - "+ toDate[1]} </div> 
                  } else {
                    return <div> {rowData.fromDate.split("T").join(" ") + " - "+ toDate.join(" ")} </div> 
                  }
                }
                
                
              },
            
                { title: 'RSVP', field: 'attendees',
                render: rowData => <div>{rowData.attendees.length}</div> },

              ]}
              data={this.state.data}
              options={{
                selection: true,
                sorting: true,
                pageSize: 10,

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