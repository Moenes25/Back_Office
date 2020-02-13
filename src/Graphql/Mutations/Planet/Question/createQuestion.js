import gql from 'graphql-tag';

const ADD_QUESTION = gql`
  mutation createQuestion($input: QuestionInput!) {
    createQuestion(input: $input) { 
     id
     level
     questionLabel
     answers  {
         id
         label
         score
     }
    }
  }
`;
export default ADD_QUESTION;
