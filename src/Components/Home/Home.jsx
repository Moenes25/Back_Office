/* eslint-disable no-unused-expressions */
import React from 'react';
import { Query } from 'react-apollo';
import connectQuery from '../../Graphql/Query/Route/QueryPrivateRoute';
import WithStyleHome from './WithStyleHome';

const Home = ({ className }) => (
  <div className={className}>
    <Query query={connectQuery}>
      {
        ({ data, loading }) => {
          console.log(loading);
          console.log(data);
          return (
            <div>
              <img className="landing__background" src="/images/accueil.png" alt="logo in white" />
            </div>
          );
        }}
    </Query>
  </div>

);


export default WithStyleHome(Home);
