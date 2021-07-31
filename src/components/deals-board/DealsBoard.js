import DealCard from "../deal-card/DealCard";
import "./DealsBoard.css";

export default function DealsBoard({ dealsData }) {
  const gridClass = dealsData.length > 3 ? "dealsboard-4" : "dealsboard-3";

  return (
    <div className={`dealsboard ${gridClass}`}>
      {dealsData.map((data) => (
        <DealCard key={data.title + data.storeID} dealData={data} />
      ))}
    </div>
  );
}
