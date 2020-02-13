import gql from 'graphql-tag';

const ADD_PLANET = gql`
  mutation createPlanet($input: PlanetInput!) {
    createPlanet(input: $input) { 
     labelPlanet
      level
      humainResource {
        id
      }
      recruiter {
        id
      }
      scoreMinKeyword
      scoreMinQuestion
      slot
      questions {
        id
      }
      keywords {
        id
      }
     
    }
  }
`;
export default ADD_PLANET;
