
import gql from 'graphql-tag';

const UPDATE_PLANET = gql`
mutation updatePlanet($input: PlanetInput, $id:ID!){
  updatePlanet(input:$input,id:$id){
    id
    labelPlanet 
    scoreMinKeyword
    scoreMinQuestion
    level
    slot
    humainResource {
      id 
      firstName 
      lastName 
      }
    recruiter {
      id
     firstName
      lastName 
      }
    questions {
      id 
      level 
      questionLabel 
    answers {
      id 
      label 
      score 
      }
      }
    keywords{
      id 
      label 
      score
      }
  }
}
`;
export default UPDATE_PLANET;
