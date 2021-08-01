import { gql } from "@apollo/client";

// AnonymousDashboard
const ONE_PER_STORE_QUERY = gql`
  {
    onePerStore {
      title
      storeID
      salePrice
      normalPrice
      thumb
    }
  }
`;

// DefaultContent
const DEALS_QUERY = gql`
  query deals($start: Int, $storeID: String, $lowPrice: Float, $highPrice: Float, $sortBy: String) {
    deals(start: $start, storeID: $storeID, lowPrice: $lowPrice, highPrice: $highPrice, sortBy: $sortBy) {
      dealsList {
        title
        storeID
        dealID
        salePrice
        normalPrice
        thumb
      }
      isEnd
    }
  }
`;

const DEAL_BY_ID_QUERY = gql`
  query dealById($id: String) {
    dealById(id: $id) {
      title
      storeID
      dealID
      thumb
      releaseDate
      steamRatingText
      dealRating
      salePrice
      normalPrice
    }
  }
`

const WHOAMI_QUERY = gql`
  query {
    whoami
  }
`;

const TOKEN_AUTH_MUTATION = gql`
    mutation TokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password){
            token
            payload
        }
    }
`

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($username: String!, $password: String!){
        createUser(username: $username, password: $password){
            userCreationConfirm
        }
    }
`


export { 
  ONE_PER_STORE_QUERY, 
  DEALS_QUERY,
  WHOAMI_QUERY,
  TOKEN_AUTH_MUTATION,
  CREATE_USER_MUTATION,
  DEAL_BY_ID_QUERY
};
