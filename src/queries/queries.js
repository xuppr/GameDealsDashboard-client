import { gql } from "@apollo/client";

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

export { ONE_PER_STORE_QUERY };
