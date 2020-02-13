import gql from 'graphql-tag';

const ADD_USER = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) { 
      firstName
      lastName
      email
      password
      type
    }
  }
`;
export default ADD_USER;
