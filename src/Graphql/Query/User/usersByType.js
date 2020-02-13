import gql from 'graphql-tag';

// eslint-disable-next-line camelcase
const GET_ALL_USER_By_Type = gql`
query usersByType($type: userType) {
  usersByType(type: $type){
     id
     firstName
     lastName
     email
     password
     type
    }
 }
`;
// eslint-disable-next-line camelcase
export default GET_ALL_USER_By_Type;
