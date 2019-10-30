import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import MainContainer from './containers/MainContainer';
import Landing from './containers/Landing';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={(routerProps) => <Landing {...routerProps} />} />
        <Route path="/app" render={(routerProps) => <MainContainer {...routerProps} />} />
      </Switch>
    </div>
  );
}

export default App;
