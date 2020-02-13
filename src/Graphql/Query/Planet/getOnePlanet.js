import gql from 'graphql-tag';

const GET_ONE_PLANET = gql`
query planet($id:ID!){
  planet(id:$id)
  {
    id 
    labelPlanet 
    
    }
    }
`;
export default GET_ONE_PLANET;
