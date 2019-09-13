import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navigation from "./components/Navigation";
import ContestantsList from './components/ContestantsList';
import CreateContestant from './components/CreateContestant';
import EditContestant from './components/EditContestant';
import Home from './components/Home';



function App() {
  return (
    <Router>
      <Navigation/>

      <div className="container p-4">
        <Route path='/' exact component={Home} />
        <Route path='/contestants' exact component={ContestantsList} />
        <Route path='/createcontestant' exact component={CreateContestant} />
        <Route path='/editcontestant/:id' exact component={EditContestant} />

      </div>

    </Router>
  );
}

export default App;
