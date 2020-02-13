/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import Login from './Components/Login/Login';
import Menu from './Components/Menu/Menu';
import Header from './Components/Header/Header';
import UsersList from './Components/Users/UsersList';
import Planetes from './Components/Planet/PlanetList';
import AddPlanet from './Components/Planet/AddPlanet';
import CandidateList from './Components/Candidate/candidatelist';
import CandidateListNormal from './Components/Candidate/candidatelistnormal';
import Home from './Components/Home/Home';
import connectQuery from './Graphql/Query/Route/QueryPrivateRoute';
import PrivateRoute from './Components/Route/PrivateRouter';


function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route
              path="/app"
              render={() => (
                <Fragment>
                  <Header />
                  <Menu />
                  <div>
                    <Query query={connectQuery}>
                      {
                        ({ loading, error, data }) => {
                          if (loading) return (<h4>loading...</h4>);
                          if (error) return (`${error}`);
                          const { isConnect } = data;
                          console.log(isConnect);
                          return (
                            <Switch>
                              {<Route path="/app/planetes-list" isAuthenticated={isConnect} component={Planetes} /> }
                              <Route path="/app/add-planet" isAuthenticated={isConnect} component={AddPlanet} />
                              <Route path="/app/update-planet/:planetId" render={({match:{ params: { planetId } }}) => <PrivateRoute isAuthenticated={isConnect} planetId={planetId} component={AddPlanet} /> } />
                              <Route path="/app/user-list" isAuthenticated={isConnect} component={UsersList} />
                              <Route path="/app/Menu" isAuthenticated={isConnect} component={Menu} />
                              <Route path="/app/candidateList" isAuthenticated={isConnect} component={CandidateList} />
                              <Route path="/app/CandidateListNormal" isAuthenticated={isConnect} component={CandidateListNormal} />
                              <Route path="/app/Home" isAuthenticated={isConnect} component={Home} />
                            </Switch>
                          );
                        }}
                    </Query>
                  </div>
                </Fragment>
              )}
            />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
}


export default App;
