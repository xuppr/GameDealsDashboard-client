import { useQuery } from "@apollo/client";
import { DEALS_QUERY } from "../../queries/queries";
import DealsBoard from "../deals-board/DealsBoard";

export default function Dashboard({ variables }) {
  const { data, loading, error, fetchMore } = useQuery(DEALS_QUERY, {
    variables: {
      start: 0,
      ...variables,
    },
  });

  // console.log("VARIABLES : ", variables);

  const onFetchMore = (start) => {
    fetchMore({
      variables: { start, ...variables },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          deals: {
            dealsList: [
              ...previousResult.deals.dealsList,
              ...fetchMoreResult.deals.dealsList,
            ],
            isEnd: fetchMoreResult.deals.isEnd,
          },
        };
      },
    });
  };

  if (error) {
    return <p>Oops! Something went wrong...</p>;
  }

  if (data) {
    const { dealsList, isEnd } = data.deals;

    return (
      <div>
        <DealsBoard dealsData={dealsList} />
        {!isEnd ? (
          <button onClick={() => onFetchMore(dealsList.length)}>
            Load More
          </button>
        ) : null}
      </div>
    );
  }

  return <p>Loading...</p>;
}
