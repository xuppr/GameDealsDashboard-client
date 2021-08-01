import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { ONE_PER_STORE_QUERY } from "../../queries/queries";
import DealsBoard from "../deals-board/DealsBoard";
import "./AnonymousDashboard.css";

export default function AnonymousDashboard() {
  const { data, error, loading } = useQuery(ONE_PER_STORE_QUERY);

  if (loading) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h4>Ops! An error occurred...</h4>
      </div>
    );
  }

  const dealsData = data["onePerStore"];
  return (
    <div className="anonymous-dashboard">
      <DealsBoard dealsData={dealsData} />
      <div className="buttons-container">
        <button className="link-button">
          <Link to="/login">Login</Link>
        </button>

        <button className="link-button">
          <Link to="/register">Register</Link>
        </button>
      </div>
    </div>
  );
}
