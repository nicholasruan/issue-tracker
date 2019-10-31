import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import Project from '../components/Project';
import Meeting from '../components/Meeting';

function MainContainer(props) {
  return (
    <div>
      <Navbar />
      MainContainer
      <Switch>
        <Route exact path="/app" render={(routerProps) => <Dashboard {...routerProps} />} />
        <Route path="/app/:id" render={(routerProps) => <Project {...routerProps} />} />
        <Route path="/app/meetings" render={(routerProps) => <Meeting {...routerProps} />} />
        <Route path="/app/profile" render={(routerProps) => <Profile {...routerProps} />} />
      </Switch>
    </div>
  )
}

export default MainContainer;
