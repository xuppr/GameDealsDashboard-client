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

const DEALS_FILTERED_BY_STORE_QUERY = gql`
  query dealsFilteredByStore($start: Int, $storeID: String) {
    dealsFilteredByStore(start: $start, storeID: $storeID) {
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

const DEALS_FILTERED_BY_PRICE_RANGE_QUERY = gql`
  query dealsFilteredByPriceRange($start: Int, $lowPrice: Float, $highPrice: Float) {
    dealsFilteredByPriceRange(start: $start, lowPrice: $lowPrice, highPrice: $highPrice) {
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

const DEALS_SORTED_BY_PRICE_QUERY = gql`
  query dealsSortedByPrice($start: Int) {
    dealsSortedByPrice(start: $start) {
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

const DEALS_SORTED_BY_SAVINGS_QUERY = gql`
  query dealsSortedBySavings($start: Int) {
    dealsSortedBySavings(start: $start) {
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

const DEALS_SORTED_BY_DEAL_RATING_QUERY = gql`
  query dealsSortedByDealRating($start: Int) {
    dealsSortedByDealRating(start: $start) {
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



export { 
  ONE_PER_STORE_QUERY, 
  DEALS_QUERY,
  DEALS_FILTERED_BY_STORE_QUERY,
  DEALS_FILTERED_BY_PRICE_RANGE_QUERY,
  DEALS_SORTED_BY_PRICE_QUERY,
  DEALS_SORTED_BY_SAVINGS_QUERY,
  DEALS_SORTED_BY_DEAL_RATING_QUERY 
};
