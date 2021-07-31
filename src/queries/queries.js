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
  query deals($start: Int) {
    deals(start: $start) {
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

export { ONE_PER_STORE_QUERY, DEALS_QUERY };
