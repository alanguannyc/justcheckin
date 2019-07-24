import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import EventsDashboard from './EventsDashboard';
import EventView from './EventView';

export default class Routes extends Component {
  render() {
    const UsersPage = () => <div>Users Page</div>
    return (
      <Switch >
        <Redirect
          exact
          from="/dashboard"
          to="/"
        />

        <Route
          component={EventsDashboard}
          exact
          path="/"
        />

        <Route
          component={EventView}
          path='/event/:id/attendees'
        />
        {/*
        
        <Route
          component={UnderDevelopment}
          exact
          path="/under-development"
        />
        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
         <Redirect to="/not-found" /> */}
      </Switch>
    );
  }
}
