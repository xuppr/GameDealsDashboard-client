import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { DEAL_BY_ID_QUERY } from "../../queries/queries";

import "./DetailPage.css";

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
      <div className="detail-page-content">
        <img src={thumb} width="200px" />
        <h1>{title}</h1>
        <h3>on {{ 1: "Steam", 2: "Gog", 3: "Humble Store" }[storeID]}</h3>

        <div className="info-block">
          <div className="flex-wrapper">
            <p>
              Price: {salePrice}$ <span>Instead of {normalPrice}$</span>
            </p>

            <p>Deal rating: {dealRating}</p>
            <p>Game rating: {steamRatingText}</p>
            {releaseDate > 0 ? (
              <p>
                Released:{" "}
                {new Date(releaseDate * 1000).toLocaleDateString("en-US")}
              </p>
            ) : null}
          </div>
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
