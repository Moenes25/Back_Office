import gql from 'graphql-tag';

const DELETE_PLANET = gql`
  mutation deletePlanet($id: ID!) {
    deletePlanet(id: $id) 
  }
`;
export default DELETE_PLANET;
