/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Card, Image, Button,
} from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import DELETE_PLANET from '../../Graphql/Mutations/Planet/deletePlanet';
import GET_ALL_PLANET from '../../Graphql/Query/Planet/querylistplanet';
class Planet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      planet: {
        labelPlanet,
        id,
      },
    } = this.props;
    return (
      <Card>
        <Card.Content>
          <Image floated="right" size="mini" src="/images/planet.png" />
          <Card.Header>{labelPlanet}</Card.Header>
        </Card.Content>
        <div className="ui two buttons">
          <NavLink to={`/app/update-planet/${id}`}><Button basic color="green"> Modifier</Button></NavLink>
          <Mutation
            mutation={DELETE_PLANET}
            variables={{ id }}
            refetchQueries={() => [{ query: GET_ALL_PLANET }]}
          >
            {
              (deletePlanet) => (
                <Button basic color="red" onClick={deletePlanet}>
                      Supprimer
                </Button>
              )
            }
          </Mutation>
        </div>
      </Card>
    );
  }
}

export default Planet;
