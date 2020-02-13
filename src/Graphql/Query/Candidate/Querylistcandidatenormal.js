
import gql from 'graphql-tag';
const GET_ALL_CANDIDATE = gql`
 query candidatesByType
 { 
   candidatesByType(type: normal) 
 {
    firstName
    lastName
    createdAt
   }
 }
`;
export default GET_ALL_CANDIDATE;
