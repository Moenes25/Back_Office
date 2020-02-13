import gql from 'graphql-tag';

const GET_ALL_PLANET = gql`
 query planets {
   planets {
     id
    labelPlanet
    }
 }
`;
export default GET_ALL_PLANET;
