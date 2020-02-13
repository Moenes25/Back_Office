/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Query } from 'react-apollo';
import {
  Card,
  Icon,
  Popup,
} from 'semantic-ui-react';
import GET_ALL_PLANET from '../../Graphql/Query/Planet/querylistplanet';

import Planet from './Planet';

const PlanetList = () => (
  <div>
    <NavLink to="add-planet">
      <Popup trigger={<Icon name="add" size="big" />} content="Ajouter Planète" />
    </NavLink>
    <Query query={GET_ALL_PLANET} fetchPolicy="cache-and-network">
      {
        ({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) return <h4>Error `${error}</h4>;
          const planets = data.planets.map((element) => <Planet key={element.id} planet={element} />);
          return (
            <Card.Group itemsPerRow={3}>
              {planets}
            </Card.Group>
          );
        }
      }
    </Query>
  </div>

);

export default PlanetList;
