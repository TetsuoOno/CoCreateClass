import React from 'react';
import Top from './components/top';
import './App.css';
import { Switch, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Top} />
    </Switch>
  );
}

export default App;
