/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import {
  Button, Card, Image, Modal, Header, Icon,
} from 'semantic-ui-react';

import AddUser from './AddUpdateUser';
import DELETE_USER from '../../Graphql/Mutations/User/deleteUser';
import GET_ALL_USER from '../../Graphql/Query/User/querylistuser';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  openClose = () => { const { open } = this.state; this.setState({ open: !open }); }

  render() {
    const {
      user: {
        id, firstName, lastName, email, type, password,
      },
    } = this.props;
    const { open } = this.state;
    return (
      <Card>
        <Card.Content>
          <Image floated="right" size="mini" src="/images/avatar.png" />
          <Card.Header>{firstName}</Card.Header>
          <Card.Meta>{lastName}</Card.Meta>
          <Card.Description>
            <div>
              {email}
            </div>
            <strong>{ type }</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green" onClick={this.openClose}>
                  Modifier
            </Button>
            <Mutation
              mutation={DELETE_USER}
              variables={{ id }}
              refetchQueries={() => [{ query: GET_ALL_USER }]}
            >
              {
                (deleteUser) => (
                  <Button basic color="red" onClick={deleteUser}>
                      Supprimer
                  </Button>
                )
              }
            </Mutation>
          </div>
        </Card.Content>
        <Modal open={open}>
          <Icon name="close" onClick={this.openClose} />
          <Header>
            <Icon name="archive" />
                  Modifer utilisateur
          </Header>
          <Modal.Content>
            <AddUser
              close={this.openClose}
              user={{
                id, firstName, lastName, email, type, password,
              }}
            />
          </Modal.Content>
        </Modal>
      </Card>

    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
