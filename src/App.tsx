import React from 'react';
import Top from './components/top';
import QuestionPage from './components/question';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Top} />
      <Route path='/login' component={Login} />
      <Route exact path='/question' component={QuestionPage} />
    </Switch>
  );
}

export default App;
