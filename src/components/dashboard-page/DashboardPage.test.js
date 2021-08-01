import { fireEvent, render, screen } from "@testing-library/react";
import DashboardPage from "./DashboardPage";
import { MockedProvider } from "@apollo/client/testing";
import { DEALS_QUERY } from "../../queries/queries";
import { BrowserRouter } from "react-router-dom";

const mock0 = {
  request: {
    query: DEALS_QUERY,
    variables: {
      start: 0,
    },
  },
  result: {
    data: {
      deals: {
        dealsList: [
          {
            title: "Path Maker",
            salePrice: 0.59,
            normalPrice: 0.99,
            storeID: "1",
            dealID: "D7iMn6gc37FBW12tFfiFtWdEKTKQd7huAO937A6Vdmg%3D",
            thumb:
              "https://cdn.cloudflare.steamstatic.com/steam/apps/1412250/capsule_sm_120.jpg?t=1615823281",
          },
          {
            title: "Pill Puzzle: One Move",
            salePrice: 0.79,
            normalPrice: 0.99,
            storeID: "1",
            dealID: "cQV0inlzw%2B5685cup0N%2F7RQ15Q8WbIjXxHDtF9l%2BdoY%3D",
            thumb:
              "https://cdn.cloudflare.steamstatic.com/steam/apps/1697080/capsule_sm_120.jpg?t=1627549331",
          },
          {
            title: "One thousand baht simulator",
            salePrice: 0.59,
            normalPrice: 0.99,
            storeID: "1",
            dealID: "AHydQQD0WUWAShgKZS5C2Nvh7Orb1ZcDFbOiBoz%2B0Ig%3D",
            thumb:
              "https://cdn.cloudflare.steamstatic.com/steam/apps/1691380/capsule_sm_120.jpg?t=1627545524",
          },
          {
            title: "Tank Ball",
            salePrice: 0.49,
            normalPrice: 0.99,
            storeID: "1",
            dealID: "pJHNA9%2FxJ2v%2FUu%2F4mv9kmSbiVQ49R9t7x1qHEXm9x%2FY%3D",
            thumb:
              "https://cdn.cloudflare.steamstatic.com/steam/apps/1214460/capsule_sm_120.jpg?t=1584539033",
          },
          {
            title: "LaserZone",
            salePrice: 12.59,
            normalPrice: 13.99,
            storeID: "1",
            dealID: "%2Fy8bYw%2F3E4aUfiiNgsErfg%2BR%2FqozsaI2qUq1aLBOXv0%3D",
            thumb:
              "https://cdn.cloudflare.steamstatic.com/steam/apps/1125880/capsule_sm_120.jpg?t=1627558588",
          },
          {
            title: "Maze",
            salePrice: 0.99,
            normalPrice: 9.99,
            storeID: "1",
            dealID: "ynZFmT3qhF5EPuG00m%2BB8rP%2Fmkz4J7LNKjFcy%2BDk1IQ%3D",
            thumb:
              "https://cdn.cloudflare.steamstatic.com/steam/apps/1330160/capsule_sm_120.jpg?t=1592402890",
          },
          {
            title: "Skydrift Infinity",
            salePrice: 8.99,
            normalPrice: 9.99,
            storeID: "1",
            dealID: "3PIfTOPKdj2MEVBaitgBmgI0vEhZCu5Pedso7MkqsaU%3D",
            thumb:
              "https://cdn.cloudflare.steamstatic.com/steam/apps/827330/capsule_sm_120.jpg?t=1627563961",
          },
          {
            title: "Try To Survive",
            salePrice: 0.49,
            normalPrice: 0.99,
            storeID: "1",
            dealID: "eDdNgUI5DLT59T50B4n56YMD0zdGXKNVVMIWs%2FRYmeE%3D",
            thumb:
              "https://cdn.cloudflare.steamstatic.com/steam/apps/1051250/capsule_sm_120.jpg?t=1554305764",
          },
        ],
        isEnd: false,
      },
    },
  },
};

const setupDashboardPageWithVariables = (variables) => {
  const mock0 = {
    request: {
      query: DEALS_QUERY,
      variables: {
        start: 0,
      },
    },
    result: {
      data: {
        deals: {
          dealsList: [
            {
              title: "Path Maker",
              salePrice: 0.59,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "D7iMn6gc37FBW12tFfiFtWdEKTKQd7huAO937A6Vdmg%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1412250/capsule_sm_120.jpg?t=1615823281",
            },
            {
              title: "Pill Puzzle: One Move",
              salePrice: 0.79,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "cQV0inlzw%2B5685cup0N%2F7RQ15Q8WbIjXxHDtF9l%2BdoY%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1697080/capsule_sm_120.jpg?t=1627549331",
            },
            {
              title: "One thousand baht simulator",
              salePrice: 0.59,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "AHydQQD0WUWAShgKZS5C2Nvh7Orb1ZcDFbOiBoz%2B0Ig%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1691380/capsule_sm_120.jpg?t=1627545524",
            },
            {
              title: "Tank Ball",
              salePrice: 0.49,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "pJHNA9%2FxJ2v%2FUu%2F4mv9kmSbiVQ49R9t7x1qHEXm9x%2FY%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1214460/capsule_sm_120.jpg?t=1584539033",
            },
            {
              title: "LaserZone",
              salePrice: 12.59,
              normalPrice: 13.99,
              storeID: "1",
              dealID: "%2Fy8bYw%2F3E4aUfiiNgsErfg%2BR%2FqozsaI2qUq1aLBOXv0%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1125880/capsule_sm_120.jpg?t=1627558588",
            },
            {
              title: "Maze",
              salePrice: 0.99,
              normalPrice: 9.99,
              storeID: "1",
              dealID: "ynZFmT3qhF5EPuG00m%2BB8rP%2Fmkz4J7LNKjFcy%2BDk1IQ%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1330160/capsule_sm_120.jpg?t=1592402890",
            },
            {
              title: "Skydrift Infinity",
              salePrice: 8.99,
              normalPrice: 9.99,
              storeID: "1",
              dealID: "3PIfTOPKdj2MEVBaitgBmgI0vEhZCu5Pedso7MkqsaU%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/827330/capsule_sm_120.jpg?t=1627563961",
            },
            {
              title: "Try To Survive",
              salePrice: 0.49,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "eDdNgUI5DLT59T50B4n56YMD0zdGXKNVVMIWs%2FRYmeE%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1051250/capsule_sm_120.jpg?t=1554305764",
            },
          ],
          isEnd: false,
        },
      },
    },
  };

  const mock1 = {
    request: {
      query: DEALS_QUERY,
      variables: {
        start: 0,
        ...variables,
      },
    },
    result: {
      data: {
        deals: {
          dealsList: [
            {
              title: "Fake Name1",
              salePrice: 0.59,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "D7iMn6gc37FBW12tFfiFtWdEKTKQd7huAO937A6Vdmg%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1412250/capsule_sm_120.jpg?t=1615823281",
            },
            {
              title: "Fake Name 2",
              salePrice: 0.79,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "cQV0inlzw%2B5685cup0N%2F7RQ15Q8WbIjXxHDtF9l%2BdoY%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1697080/capsule_sm_120.jpg?t=1627549331",
            },
            {
              title: "Fake Name 3",
              salePrice: 0.59,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "AHydQQD0WUWAShgKZS5C2Nvh7Orb1ZcDFbOiBoz%2B0Ig%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1691380/capsule_sm_120.jpg?t=1627545524",
            },
            {
              title: "Fake Name 4",
              salePrice: 0.49,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "pJHNA9%2FxJ2v%2FUu%2F4mv9kmSbiVQ49R9t7x1qHEXm9x%2FY%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1214460/capsule_sm_120.jpg?t=1584539033",
            },
            {
              title: "Fake Name 5",
              salePrice: 12.59,
              normalPrice: 13.99,
              storeID: "1",
              dealID: "%2Fy8bYw%2F3E4aUfiiNgsErfg%2BR%2FqozsaI2qUq1aLBOXv0%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1125880/capsule_sm_120.jpg?t=1627558588",
            },
            {
              title: "Fake Name 6",
              salePrice: 0.99,
              normalPrice: 9.99,
              storeID: "1",
              dealID: "ynZFmT3qhF5EPuG00m%2BB8rP%2Fmkz4J7LNKjFcy%2BDk1IQ%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1330160/capsule_sm_120.jpg?t=1592402890",
            },
            {
              title: "Fake Name 7",
              salePrice: 8.99,
              normalPrice: 9.99,
              storeID: "1",
              dealID: "3PIfTOPKdj2MEVBaitgBmgI0vEhZCu5Pedso7MkqsaU%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/827330/capsule_sm_120.jpg?t=1627563961",
            },
            {
              title: "Fake Name 8",
              salePrice: 0.49,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "eDdNgUI5DLT59T50B4n56YMD0zdGXKNVVMIWs%2FRYmeE%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1051250/capsule_sm_120.jpg?t=1554305764",
            },
          ],
          isEnd: false,
        },
      },
    },
  };

  const component = (
    <MockedProvider mocks={[mock0, mock1]} addTypename={false}>
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    </MockedProvider>
  );

  render(component);

  return mock1.result.data.deals.dealsList;
};

const checkCardsByTitle = (dealsList) => {
  dealsList.forEach((data) => {
    const titleElement = screen.getByText(data["title"]);
    expect(titleElement).toBeInTheDocument();
  });
};

describe("default", () => {
  beforeEach(() => {
    const component = (
      <MockedProvider mocks={[mock0]} addTypename={false}>
        <BrowserRouter>
          <DashboardPage />
        </BrowserRouter>
      </MockedProvider>
    );

    render(component);
  });

  it("renders the selection and filter buttons", () => {
    const selectElements = screen.getAllByText("Any");

    expect(selectElements.length).toBe(3);

    selectElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("renders the cards by default", async () => {
    const dealsList = mock0.result.data.deals.dealsList;

    await new Promise((resolve) => setTimeout(resolve, 0));

    checkCardsByTitle(dealsList);
  });
});

describe("filtering", () => {
  it("makes a query with correct varaibles when store filter is selected", async () => {
    const dealsList = setupDashboardPageWithVariables({ storeID: "1" });

    await new Promise((resolve) => setTimeout(resolve, 0));

    const storeFilter = screen.getByTestId("store-filter");

    fireEvent.change(storeFilter, { target: { value: "1" } });

    await new Promise((resolve) => setTimeout(resolve, 0));

    checkCardsByTitle(dealsList);
  });

  it("makes a query with correct variables when price range filter is selected", async () => {
    const dealsList = setupDashboardPageWithVariables({
      lowPrice: 0,
      highPrice: 5,
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    const priceFilter = screen.getByTestId("price-filter");

    fireEvent.change(priceFilter, { target: { value: "1" } });

    await new Promise((resolve) => setTimeout(resolve, 0));

    checkCardsByTitle(dealsList);
  });
});

describe("sorting", () => {
  it("makes a query with correct variables when sort by price is selected", async () => {
    const dealsList = setupDashboardPageWithVariables({
      sortBy: "price",
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    const sortSelect = screen.getByTestId("sort");

    fireEvent.change(sortSelect, { target: { value: "price" } });

    await new Promise((resolve) => setTimeout(resolve, 0));

    checkCardsByTitle(dealsList);
  });
});
