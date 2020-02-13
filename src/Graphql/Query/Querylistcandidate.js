import gql from 'graphql-tag';

const GET_ALL_CANDIDATE = gql`
 query candidatesByType
 { 
   candidatesByType(type: spontaneous) 
 {
    firstName
    lastName
    oldPost 
    yearExperience
   }
 }
`;
export default GET_ALL_CANDIDATE;
