import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { DEAL_BY_ID_QUERY } from "../../queries/queries";

const STORE_BASE_URL = "https://www.cheapshark.com/redirect?dealID=";

export default function DetailPage() {
  const { id } = useParams();
  const { loading, data, error } = useQuery(DEAL_BY_ID_QUERY, {
    variables: { id },
  });

  if (error) {
    console.log(error);
    return <p>Oops! Something went wrong...</p>;
  }

  if (data) {
    const {
      title,
      storeID,
      thumb,
      salePrice,
      normalPrice,
      steamRatingText,
      releaseDate,
      dealRating,
    } = data.dealById;

    return (
      <div>
        <img src={thumb} />
        <h1>{title}</h1>
        <h3>on {{ 1: "Steam", 2: "Gog", 3: "Humble Store" }[storeID]}</h3>

        <div>
          <ul>
            <li>Price: {salePrice}$</li> <p>Instead of {normalPrice}$</p>
            <li>Deal rating: {dealRating}</li>
            <li>Game rating: {steamRatingText}</li>
            <li>Released: {new Date(releaseDate).getFullYear()}</li>
          </ul>
        </div>

        <div>
          <button>
            <Link to="/">Back to list</Link>
          </button>
          <button>
            <a href={`${STORE_BASE_URL}${id}`}>Go to store page</a>
          </button>
        </div>
      </div>
    );
  }

  return <p>Loading... </p>;
}
