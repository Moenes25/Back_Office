
import gql from 'graphql-tag';

const UPDATE_QUESTION = gql`
mutation updateQuestion($input:QuestionInput!,$id:ID!){
  updateQuestion(input:$input,id:$id)
  {
    id
     level
      questionLabel
       answers {
         id  
         label
         score
         }
         }
}
`;
export default UPDATE_QUESTION;
