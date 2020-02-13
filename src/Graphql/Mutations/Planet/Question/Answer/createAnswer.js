import gql from 'graphql-tag';

const ADD_ANSWER = gql`
  mutation createQuestion($input: AnswerInput!) {
    createAnswer(input: $input) { 
     id
     label
     score
    }
  }
`;
export default ADD_ANSWER;
