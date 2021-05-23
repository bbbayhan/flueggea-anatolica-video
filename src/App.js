import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import EyeDetection from './EyeDetection';
import TurkeyMap from './Map';

function App() {

  return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" render={()=> (<EyeDetection/>)}/>
            <Route path="/turkey" render={() => (<TurkeyMap/>)}/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
