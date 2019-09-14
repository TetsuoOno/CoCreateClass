import React from 'react';
import Top from './components/top';
import QuestionPage from './components/question';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login';
import Class from './components/class'

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Top} />
      <Route path='/login' component={Login} />
      <Route path='/question/:questionId' component={QuestionPage} />
      <Route path='/class' component={Class}/>
    </Switch>
  );
}

export default App;
 
//      <Route path='/question/:questionID' component={QuestionPage} />
