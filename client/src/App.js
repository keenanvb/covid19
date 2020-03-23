import React, { Fragment, useEffect } from 'react';
import ReactGA from 'react-ga'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import WorldMap from './components/worldmap/WorldMap'
import Timeseries from './components/timeseries/Timeseries'
import Sanitiser from './components/sanitiser/Sanitiser'
import Alert from './components/layout/Alert'
import NotFound from './components/layout/NotFound'

import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const App = () => {
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_REACT_GOOGLE_ANALYTICS);
    ReactGA.pageview(window.location.pathname);
  }, [])

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
                  <Route path='/sanitiser' exact component={Sanitiser} />
                  <Route component={NotFound} />
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
