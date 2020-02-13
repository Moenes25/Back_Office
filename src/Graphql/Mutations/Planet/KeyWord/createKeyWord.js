import gql from 'graphql-tag';

const ADD_KEYWORD = gql`
  mutation createKeyword($input: KeywordInput!) {
    createKeyword(input: $input) { 
     id
     label
     score
  }
  }
`;
export default ADD_KEYWORD;
