import React from 'react';
import Top from './components/top';
import Question from './components/question';
import './App.css';
import { Switch, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Top} />
      <Route exact path='/Question' component={Question} />
    </Switch>
  );
}

export default App;
