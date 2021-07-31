import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import BoardController from "./BoardController";
import { DEALS_QUERY } from "../../queries/queries";
import { GraphQLError } from "graphql";

it("shows loading text before query has resolved", () => {
  const component = (
    <MockedProvider mocks={[]} addTypename={false}>
      <BoardController query={DEALS_QUERY} />
    </MockedProvider>
  );

  render(component);

  const loadingElement = screen.getByText("Loading...");
  expect(loadingElement).toBeInTheDocument();
});

it("shows an error message if an occurred", async () => {
  const mock = {
    request: {
      query: DEALS_QUERY,
    },
    result: {
      errors: [new GraphQLError()],
    },
  };

  const component = (
    <MockedProvider mocks={[mock]} addTypename={false}>
      <BoardController query={DEALS_QUERY} />
    </MockedProvider>
  );

  render(component);

  await new Promise((resolve) => setTimeout(resolve, 50));

  const errorElement = screen.getByText("Oops! Something went wrong...");
  expect(errorElement).toBeInTheDocument();
});

const checkCardsByTitle = (dealsList) => {
  dealsList.forEach((data) => {
    const titleElement = screen.getByText(data["title"]);
    expect(titleElement).toBeInTheDocument();
  });
};

it("renders the correct data after the query is completed", async () => {
  const mock = {
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

  const component = (
    <MockedProvider mocks={[mock]} addTypename={false}>
      <BoardController query={DEALS_QUERY} />
    </MockedProvider>
  );

  render(component);

  await new Promise((resolve) => setTimeout(resolve, 50));

  checkCardsByTitle(mock.result.data.deals.dealsList);
});

it("show the load more button after the query is completed", async () => {
  const mock = {
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

  const component = (
    <MockedProvider mocks={[mock]} addTypename={false}>
      <BoardController query={DEALS_QUERY} />
    </MockedProvider>
  );

  render(component);

  await new Promise((resolve) => setTimeout(resolve, 50));

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

it("not shows the load more button if isEnd is true", async () => {
  const mock = {
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
          isEnd: true,
        },
      },
    },
  };

  const component = (
    <MockedProvider mocks={[mock]} addTypename={false}>
      <BoardController query={DEALS_QUERY} />
    </MockedProvider>
  );

  render(component);

  await new Promise((resolve) => setTimeout(resolve, 50));

  const button = screen.queryByRole("button");
  expect(button).toBeNull();
});

it("loads more data when load more button is clicked", async () => {
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
        start: 8,
      },
    },
    result: {
      data: {
        deals: {
          dealsList: [
            {
              title: "Reptiles: In Hunt",
              salePrice: 8.49,
              normalPrice: 9.99,
              storeID: "1",
              dealID: "6byIVn%2BbKHsD5lEo4zctqKcwUK9LPzYTXHq%2FAbrsnro%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/897380/capsule_sm_120.jpg?t=1627562895",
            },
            {
              title: "The Cyclist: Tactics",
              salePrice: 16.19,
              normalPrice: 17.99,
              storeID: "1",
              dealID: "CO8riO3bpIFPEJLXDiH6Sorgw9BoAoDL2MxJJfQ6dKE%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1237070/capsule_sm_120.jpg?t=1627556432",
            },
            {
              title: "the Line",
              salePrice: 0.99,
              normalPrice: 4.99,
              storeID: "1",
              dealID: "4QEv0ov0PF2Slfszs7AdZ43B%2BvzygoZQ%2BLPtzm7sSEE%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1368770/capsule_sm_120.jpg?t=1597994858",
            },
            {
              title: "Wind Angel",
              salePrice: 2.39,
              normalPrice: 3.99,
              storeID: "1",
              dealID: "j62uATe%2FDt%2FImiIvNiQbT%2FMlMjNEc%2FF3FXUlPXZOOz0%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1578980/capsule_sm_120.jpg?t=1618470795",
            },
            {
              title: "Yinyang",
              salePrice: 0.74,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "spGSu0BR%2BkxbOM5%2FXSz0XOAQkIa%2B12%2BeeDDamYplMDc%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1501090/capsule_sm_120.jpg?t=1619359302",
            },
            {
              title: "eBall",
              salePrice: 0.49,
              normalPrice: 4.99,
              storeID: "1",
              dealID: "s8dxFrWdgOq85U1WkNY4Ca2xS%2BtFgxe5oVUGOr%2BVZ4E%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/987950/capsule_sm_120.jpg?t=1588378521",
            },
            {
              title: "Space Wars",
              salePrice: 0.49,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "geA6UAC56cztvo3EIE%2BdxDc%2BLzvccekCbeNeQF2EFS0%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1176160/capsule_sm_120.jpg?t=1588331063",
            },
            {
              title: "WayOut",
              salePrice: 0.49,
              normalPrice: 0.99,
              storeID: "1",
              dealID: "B0JLYVd4N8TdU4mLrZfUr8%2FtVeTcZBBssAR10KhQai4%3D",
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/551110/capsule_sm_120.jpg?t=1599559544",
            },
          ],
          isEnd: false,
        },
      },
    },
  };

  const component = (
    <MockedProvider mocks={[mock0, mock1]} addTypename={false}>
      <BoardController query={DEALS_QUERY} />
    </MockedProvider>
  );

  render(component);

  await new Promise((resolve) => setTimeout(resolve, 50));

  fireEvent.click(screen.getByRole("button"));

  await new Promise((resolve) => setTimeout(resolve, 50));

  checkCardsByTitle([
    ...mock0.result.data.deals.dealsList,
    ...mock1.result.data.deals.dealsList,
  ]);
});
