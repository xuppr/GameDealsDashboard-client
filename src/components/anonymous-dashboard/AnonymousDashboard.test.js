import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import AnonymousDashboard from "./AnonymousDashboard";
import { ONE_PER_STORE_QUERY } from "../../queries/queries";
import { GraphQLError } from "graphql";

const mocks = [];

it("shows loading text before query has resolved", async () => {
  const mocks = [];

  const component = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AnonymousDashboard />
    </MockedProvider>
  );

  render(component);

  const loadingElement = screen.getByText("Loading...");
  expect(loadingElement).toBeInTheDocument();
});

it("show a message error when a GraphQLError occurred", async () => {
  const mocks = [
    {
      request: {
        query: ONE_PER_STORE_QUERY,
      },
      result: {
        errors: [new GraphQLError()],
      },
    },
  ];

  const component = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AnonymousDashboard />
    </MockedProvider>
  );

  render(component);

  await new Promise((resolve) => setTimeout(resolve, 0));

  const errorElement = screen.getByText("Ops! An error occurred...");
  expect(errorElement).toBeInTheDocument();
});

it("shows a message error when a generic error occurred", async () => {
  const mocks = [
    {
      request: {
        query: ONE_PER_STORE_QUERY,
      },
      result: {
        error: new Error(),
      },
    },
  ];

  const component = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AnonymousDashboard />
    </MockedProvider>
  );

  render(component);

  await new Promise((resolve) => setTimeout(resolve, 0));

  const errorElement = screen.getByText("Ops! An error occurred...");
  expect(errorElement).toBeInTheDocument();
});

it("shows the correct cards when data is ready", async () => {
  const mocks = [
    {
      request: {
        query: ONE_PER_STORE_QUERY,
      },

      result: {
        data: {
          onePerStore: [
            {
              title: "Path Maker",
              storeID: "1",
              salePrice: 0.59,
              normalPrice: 0.99,
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1412250/capsule_sm_120.jpg?t=1615823281",
            },
            {
              title: "Banners of Ruin",
              storeID: "7",
              salePrice: 15.99,
              normalPrice: 19.99,
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1075740/capsule_sm_120.jpg?t=1627383830",
            },
            {
              title: "Banners of Ruin",
              storeID: "11",
              salePrice: 15.99,
              normalPrice: 19.99,
              thumb:
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1075740/capsule_sm_120.jpg?t=1627383830",
            },
          ],
        },
      },
    },
  ];

  const component = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AnonymousDashboard />
    </MockedProvider>
  );

  render(component);

  await new Promise((resolve) => setTimeout(resolve, 0));

  const steamTitle = screen.getByText("Path Maker");
  const gogAndHumbleTitles = screen.getAllByText("Banners of Ruin");

  expect(steamTitle).toBeInTheDocument();
  expect(gogAndHumbleTitles.length).toEqual(2);
  expect(gogAndHumbleTitles[0]).toBeInTheDocument();
  expect(gogAndHumbleTitles[1]).toBeInTheDocument();
});
