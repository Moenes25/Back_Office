import gql from 'graphql-tag';

const connectQuery = gql`
query connectQuery @client {
 isConnect @client
}
`;
export default connectQuery;
