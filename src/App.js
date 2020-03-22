import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import WorldMap from './components/worldmap/WorldMap'
import Timeseries from './components/timeseries/Timeseries'
import Sanitiser from './components/sanitiser/Sanitiser'
import Alert from './components/layout/Alert'

import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Route render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                timeout={200}
                classNames='fade'
                key={location.key}
              >
                <Switch location={location}>
                  {/* <Switch> */}
                  <Route path='/' exact component={Landing} />
                  <Route path='/world-map' exact component={WorldMap} />
                  <Route path='/timeseries' exact component={Timeseries} />
                  <Route path='/ohwow' exact component={Sanitiser} />
                  {/* <Route component={Routes} /> */}
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )} />

        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
