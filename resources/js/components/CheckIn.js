import React, { Component }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
DialogTitle} from '@material-ui/core';
import moment from 'moment';
import Autosuggest from 'react-autosuggest';
import Axios from 'axios';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckinForm from './CheckinForm';

  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  
  
  function getSuggestionValue(suggestion) {
    return `${suggestion.firstName} ${suggestion.lastName}`;
  }
  
  function renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.firstName} ${suggestion.lastName} `;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
  
    return (
      <span className={'suggestion-content'}>
        <span className="name">

          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;
  
              return (
                
                
                <span className={className} key={index}>{part.text}</span>
                
              );
            })
          }
          
          {suggestion.checkin ? <div className="suggestion-hint">{suggestion.title} at {suggestion.company} <div style={{'color':'green'}}>Already Checked in </div></div> : 
          <div className="suggestion-hint">{suggestion.title} at {suggestion.company} </div>}
          
        </span>
      </span>
    );
  }
  
  class CheckIn extends React.Component {
    constructor() {
      super();
  
      this.state = {
        event:'',
        value: '',
        suggestions: [],
        showCheckinButton: false,
        contacts:[],
        isLoading: false,
        attendeeToCheckin:'',
        isSuccess:false,
        showAddMoreButton: false,
        addMore:false,
      };    
    }


    onSuggestionSelected=(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method })=>{
        var now = moment().format("YYYY-MM-DD HH:mm:ss")
        var id = suggestion.id
        const attendee = suggestion
        attendee.checkin = true
        attendee.checkedin_at = now

        this.setState({
            attendeeToCheckin: suggestion,
            showCheckinButton: true,
        })
        
        
        
      }

    componentWillMount(){
        Axios.get('/api/event/' + this.props.match.params.id + '/checkin', this.props.match.params.id)
        .then((resp)=>{
            
            this.setState({
                event: resp.data,
                contacts: resp.data.attendees
            })


        })
    }

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        
        if (escapedValue === '') {
          return [];
        }
      
        const regex = new RegExp('\\b' + escapedValue, 'i');
        
        return this.state.contacts.filter(person => regex.test(getSuggestionValue(person)));
      }

    onChange = (event, { newValue, method }) => {
        if(event.target.value == ''){
            this.setState({
                    
                showAddMoreButton: false,
            })
        }
        this.setState({
          value: newValue
        });

      };
      
      onSuggestionsFetchRequested = ({ value }) => {
        if(value.length == 0){
            console.log('0')
        }
        if(this.getSuggestions(value).length == 0 && value != ''){
            this.setState({
                    
                isLoading: true,
            })
            setTimeout(() => {
                this.setState({
                    isLoading: false,
                    showAddMoreButton: true,
                })
            }, 1000);
            
        }
        this.setState({
          suggestions: this.getSuggestions(value)
        });
      };
    
      onSuggestionsClearRequested = () => {

        this.setState({

          suggestions: []
        });
      };

      checkinButtonedn = () => {
          
        this.setState({
            isLoading : true,
            
        })

        Axios.post('/api/attendee/' + this.state.attendeeToCheckin.id + '/edit', this.state.attendeeToCheckin)
        .then(resp =>{
            setTimeout(() => {
                this.setState({

                    isSuccess: true,
                    
                })
            }, 1000);
            setTimeout(() => {
                this.setState({
                    isLoading : false,
                    
                    value:'',
                    showCheckinButton: false,
                    showAddMoreButton: false,
                })
            }, 1200);
        })

      }

      handleClose = () =>{
          this.setState({
              isSuccess: false
          })
      }
      addMore = () => {
          this.setState({
            addMore:true
          })
      }
      showSuccessIndicator = () => {

        this.setState({
            isLoading : true,
            isSuccess: true,
        })

        setTimeout(() => {
            this.setState({
                isLoading : false,
                isSuccess: false,
                value:'',
                addMore:false,
                showCheckinButton: false,
                showAddMoreButton: false,
            })
        }, 1000);


      }
      
      

    
      render() {
       
        const { value, suggestions } = this.state;
        const inputProps = {
          placeholder: "Type Your Name",
          value,
          onChange: this.onChange
        };
    
        return (
            <div className="checkin-container">
            <h1 className="checkin-page-header">{this.state.event.name} Self CheckIn</h1>

            {
                this.state.isLoading ? <CircularProgress className="progress-indicator"  />
                :
                <div></div>
            }

            <Snackbar
                anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
                }}
                open={this.state.isSuccess}
                autoHideDuration={1000}
                onClose={this.handleClose}
            >
                <SnackbarContent
                onClose={this.handleClose}
                style={{'backgroundColor': 'green'}}
                message="Thank you! You're all set! "
                />
            </Snackbar>
            

            <Autosuggest 
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                onSuggestionSelected={this.onSuggestionSelected}
                inputProps={inputProps} 
            />

            {this.state.showCheckinButton ? 
                <div className="checkin-button" >
                <Button variant="contained" color="primary" onClick={this.checkinButtonedn}>Check me in</Button>
                </div>
                 : <div></div>}
            {this.state.showAddMoreButton ? 
                <div className="checkin-button" >
                <p>Cannot find your name? Add your name below</p>
                <Button variant="contained" color="primary" onClick={this.addMore}>Add</Button>
                </div>
                : <div></div>}

            {this.state.addMore ? 
                <CheckinForm eventID={this.props.match.params.id} showSuccess={this.showSuccessIndicator} />  : <div></div>
            }
                   
            </div>
          
        );
    }
  }

  export default CheckIn