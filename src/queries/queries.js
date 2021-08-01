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

const WHOAMI_QUERY = gql`
  query {
    whoami
  }
`;


export { 
  ONE_PER_STORE_QUERY, 
  DEALS_QUERY,
  WHOAMI_QUERY
};
