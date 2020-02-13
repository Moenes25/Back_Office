import gql from 'graphql-tag';

const loginMutation = gql`
  mutation login($email: String! , $password: String! ) {
    login(email: $email, password: $password) { 
      user {
        email
        password
        type
      }
     token
    }
  }
`;
export default loginMutation;
