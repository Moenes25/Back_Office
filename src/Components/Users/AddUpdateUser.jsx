import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Form } from 'semantic-ui-react';
import ADD_USER from '../../Graphql/Mutations/User/createUser';
import UPDATE_USER from '../../Graphql/Mutations/User/updateUser';
import GET_ALL_USER from '../../Graphql/Query/User/querylistuser';

class AddUpdateUser extends Component {
  constructor(props) {
    super(props);
    // if (props.user) {
    //   const {
    //     id,
    //     type,
    //     password,
    //     lastName,
    //     firstName,
    //     email,
    //   } = props.user;
    //   this.state = {
    //     id,
    //     type,
    //     password,
    //     lastName,
    //     firstName,
    //     email,
    //   };
    // } else {
    this.state = {
      id: this.props.user.id || null,
      type: this.props.user.type || '',
      password: '',
      lastName: this.props.user.lastName || '',
      firstName: this.props.user.firstName || '',
      email: this.props.user.email || '',
    };
  }
  // }

  handleChange = (event, { value }) => {
    this.setState({ [event.target.name]: value });
  }

  handleTypeChange = (event, { value }) => {
    this.setState({ type: value });
  }

  createUser = (create, input) => {
    const { close } = this.props;
    create({
      variables: {
        input,
      },
    }).then(() => close());
  }

  updateUser = (update, input) => {
    const { close } = this.props;
    const { id } = this.state;
    update({
      variables: {
        input,
        id,
      },
    }).then(() => close());
  }

  render() {
    const roleOptions = [
      {
        key: 'rh',
        value: 'rh',
        text: 'Resources Humaine',
      },
      {
        key: 'rc',
        value: 'recruiter',
        text: 'Recriteur',
      },
      {
        key: 'ad',
        value: 'admin',
        text: 'Admin',
      },
    ];
    const {
      type, password, lastName, firstName, email,
    } = this.state;
    const { user } = this.props;
    const ACTION = (user) ? 'Modifier' : 'Ajouter';
    const MUTATION = (user) ? UPDATE_USER : ADD_USER;
    const MUTATION_ACTION = (user) ? this.updateUser : this.createUser;
    return (
      <Mutation mutation={MUTATION} refetchQueries={() => [{ query: GET_ALL_USER }]}>
        {(actionUser) => (
          <div>
            <Form>
              <Form.Group>
                <Form.Input placeholder="Nom" onChange={this.handleChange} name="firstName" value={firstName} width={6} />
                <Form.Input placeholder="Prénom" onChange={this.handleChange} name="lastName" value={lastName} width={6} />
              </Form.Group>
              <Form.Group>
                <Form.Input placeholder="Email" autoComplete="false" onChange={this.handleChange} name="email" value={email} width={6} />
                <Form.Input type="password" placeholder="Mot de Passe" onChange={this.handleChange} name="password" width={6} />
              </Form.Group>
              <Form.Group>
                <Form.Select placeholder="Role" width={4} defaultValue={type} onChange={this.handleTypeChange} name="type" options={roleOptions} />
              </Form.Group>
              <Form.Group>
                <Form.Button
                  secondary
                  floated="right"
                  type="button"
                  onClick={() => MUTATION_ACTION(actionUser, {
                    type, password, lastName, firstName, email,
                  })}
                >
                  {
                    ACTION
                  }
                </Form.Button>
              </Form.Group>
            </Form>
          </div>
        )}
      </Mutation>

    );
  }
}

AddUpdateUser.propTypes = {
  user: PropTypes.object,
  close: PropTypes.func,
};

export default AddUpdateUser;
