import gql from 'graphql-tag';

const UPDATE_USER = gql`
  mutation updateUser($input: UserInput!, $id: ID!) {
    updateUser(input: $input, id: $id) { 
      firstName
      lastName
      email
      password
      type
    }
  }
`;
export default UPDATE_USER;
