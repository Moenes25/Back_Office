import gql from 'graphql-tag';

const GET_ALL_USER = gql`
 query users {
   users {
     id
     firstName
     lastName
     email
     password
     type
    }
 }
`;
export default GET_ALL_USER;
