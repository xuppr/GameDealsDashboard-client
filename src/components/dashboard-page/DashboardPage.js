import { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import "./DashboardPage.css";

export default function DashboardPage() {
  const [storeFilterVars, setStoreFilterVars] = useState({});
  const [priceFilterVars, setPriceFilterVars] = useState({});
  const [sortByVars, setSortByVars] = useState({});

  const handleStoreFilterChange = (e) => {
    const value = e.target.value;

    console.log("STORE VALUE: ", value);

    if (value === "default") {
      setStoreFilterVars({});
    } else {
      setStoreFilterVars({ storeID: value });
    }
  };

  const handlePriceFilterChange = (e) => {
    const value = e.target.value;

    if (value === "default") {
      setPriceFilterVars({});
    } else {
      const varMap = {
        1: [0, 5],
        2: [5, 25],
        3: [25, 400],
      };
      setPriceFilterVars({
        lowPrice: varMap[value][0],
        highPrice: varMap[value][1],
      });
    }
  };

  const handleSortByChange = (e) => {
    const value = e.target.value;

    if (value === "default") {
      setSortByVars({});
    } else {
      setSortByVars({ sortBy: value });
    }
  };

  return (
    <div>
      <div className="dashboard-selection-container">
        <div>
          <label htmlFor="store-filter">Store:</label>
          <select
            data-testid="store-filter"
            id="store-filter"
            onChange={handleStoreFilterChange}
          >
            <option value="default">Any</option>
            <option value="1">Steam</option>
            <option value="7">Gog</option>
            <option value="11">Humble Store</option>
          </select>
        </div>

        <div>
          <label htmlFor="price-filter">Price:</label>
          <select
            id="price-filter"
            data-testid="price-filter"
            onChange={handlePriceFilterChange}
          >
            <option value="default">Any</option>
            <option value="1">0$ - 5$</option>
            <option value="2">5$ - 25$</option>
            <option value="3">more than 25$</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort-by">Sort:</label>
          <select id="sort-by" data-testid="sort" onChange={handleSortByChange}>
            <option value="default">Any</option>
            <option value="price">price</option>
            <option value="savings">savings</option>
            <option value="dealRating">deal rating</option>
          </select>
        </div>
      </div>
      <div className="dashboard-container">
        <Dashboard
          variables={{ ...storeFilterVars, ...priceFilterVars, ...sortByVars }}
        />
      </div>
    </div>
  );
}
