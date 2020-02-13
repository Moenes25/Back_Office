import gql from 'graphql-tag';

const UPDATE_KEYWORD = gql`
mutation updateKeyword($input:KeywordInput!,$id:ID!){
  updateKeyword(input:$input,id:$id)
{
  id
 label 
 score 
 }
}
`;
export default UPDATE_KEYWORD;
