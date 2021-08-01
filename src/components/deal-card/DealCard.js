import { Link } from "react-router-dom";
import "./DealCard.css";

const storeClassMap = {
  1: "steam-class",
  7: "gog-class",
  11: "humble-class",
};

const DealCard = ({ dealData }) => {
  const { title, storeID, salePrice, normalPrice, thumb, dealID } = dealData;
  const storeClass = storeClassMap[storeID];
  const linkClass = dealID ? "link-class" : "";

  const content = (
    <div className={`${storeClass} ${linkClass} deal-card`}>
      <div className="thumb-container">
        <img src={thumb} alt={title + " image"}></img>
      </div>
      <h3>{title}</h3>
      <h1>{salePrice}$</h1>
      <p>Instead of {normalPrice}$</p>
    </div>
  );

  return dealID ? (
    <Link to={`/detail/${dealID}`} style={{ textDecoration: "none" }}>
      {content}
    </Link>
  ) : (
    content
  );
};

export default DealCard;
