import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { DEALS_QUERY } from "../../queries/queries";
import DealsBoard from "../deals-board/DealsBoard";

export default function BoardController({ variables, query }) {
  const [dealsArray, setDealsArray] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [getDeals, { data, loading, error }] = useLazyQuery(query);

  useEffect(() => {
    getDeals({ variables: { start: 0, ...variables } });
  }, []);

  useEffect(() => {
    if (data) {
      const { isEnd } = data.deals;

      setShowLoadMore(!isEnd);
      setDealsArray((prevArr) => [...prevArr, ...data.deals.dealsList]);
    }
  }, [data]);

  if (error) {
    return <p>Oops! Something went wrong...</p>;
  }

  if (data && !loading) {
    const start = dealsArray.length;
    return (
      <div>
        <DealsBoard dealsData={dealsArray} />
        {showLoadMore ? (
          <button
            onClick={() => getDeals({ variables: { start, ...variables } })}
          >
            Load More
          </button>
        ) : null}
      </div>
    );
  }

  return <p>Loading...</p>;
}
