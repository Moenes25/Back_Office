/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {
  Card, Icon, Modal, Header,
} from 'semantic-ui-react';
import AddUser from './AddUpdateUser';
import User from './User';
import GET_ALL_USER from '../../Graphql/Query/User/querylistuser';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  openClose = () => { const { open } = this.state; this.setState({ open: !open }); }

  render() {
    const { open } = this.state;
    return (
      <div style={{ width: '50%', marginLeft: '30%' }}>
        <Icon name="user plus" size="big" style={{ marginLeft: '95%', marginBottom: '25px' }} onClick={this.openClose} />
        <Modal open={open}>
          <Icon name="close" onClick={this.openClose} />
          <Header>
            <Icon name="archive" />
            Ajouter Un nouveau utilisateur
          </Header>
          <Modal.Content>
            <AddUser close={this.openClose} />
          </Modal.Content>
        </Modal>
        <Query query={GET_ALL_USER} fetchPolicy="cache-and-network">
          {
            ({ loading, error, data }) => {
              if (loading) return <h4>Loading...</h4>;
              if (error) return <h4>Error `${error}`</h4>;
              const users = data.users.map((element) => <User key={element.id} user={element} />);
              return (
                <Card.Group itemsPerRow={3}>
                  {users}
                </Card.Group>
              );
            }
          }
        </Query>
      </div>
    );
  }
}
export default UsersList;
