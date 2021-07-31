import { useQuery } from "@apollo/client";
import { ONE_PER_STORE_QUERY } from "../../queries/queries";
import DealsBoard from "../deals-board/DealsBoard";

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
    <div>
      <DealsBoard dealsData={dealsData} />
    </div>
  );
}
