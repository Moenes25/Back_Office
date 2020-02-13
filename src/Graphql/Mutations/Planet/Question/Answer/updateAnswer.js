import gql from 'graphql-tag';

const UPDATE_ANSWER = gql`
mutation updateAnswer($input:AnswerInput!,$id:ID!){
  updateAnswer(input:$input,id:$id)
{
  id
 label 
 score 
 }
}
`;
export default UPDATE_ANSWER;
