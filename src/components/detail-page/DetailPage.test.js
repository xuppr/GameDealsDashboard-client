import { render, screen } from "@testing-library/react";
import { BrowserRouter, Router, Route } from "react-router-dom";
import DetailPage from "./DetailPage";
import { MockedProvider } from "@apollo/client/testing";
import { DEAL_BY_ID_QUERY } from "../../queries/queries";
import { GraphQLError } from "graphql";
import { createMemoryHistory } from "history";

describe("DetailPage cases", () => {
  it("shows loading message on loading", () => {
    const component = (
      <MockedProvider mocks={[]} addTypename={false}>
        <BrowserRouter>
          <DetailPage />
        </BrowserRouter>
      </MockedProvider>
    );

    render(component);

    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("show error message on error", async () => {
    const mock = {
      request: {
        query: DEAL_BY_ID_QUERY,
      },
      result: {
        errors: [new GraphQLError()],
      },
    };

    const component = (
      <MockedProvider mocks={[mock]} addTypename={false}>
        <BrowserRouter>
          <DetailPage />
        </BrowserRouter>
      </MockedProvider>
    );

    render(component);

    await new Promise((resolve) => setTimeout(resolve, 0));

    const errorElement = screen.getByText("Oops! Something went wrong...");
    expect(errorElement).toBeInTheDocument();
  });

  function renderWithRouterMatch(
    ui,
    {
      path = "/",
      route = "/",
      history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
  ) {
    return {
      ...render(
        <Router history={history}>
          <Route path={path}>{ui}</Route>
        </Router>
      ),
    };
  }

  it("renders the data after the query", async () => {
    const mock = {
      request: {
        query: DEAL_BY_ID_QUERY,
        variables: {
          id: "Qvi8qFhhjW%2F6qACmivQV9MKTzMac%2B38KZj5TTw%2FV8f0%3D",
        },
      },

      result: {
        data: {
          dealById: {
            title: "The Inevitability",
            storeID: "1",
            dealID: "Qvi8qFhhjW%2F6qACmivQV9MKTzMac%2B38KZj5TTw%2FV8f0%3D",
            thumb:
              "https://cdn.cloudflare.steamstatic.com/steam/apps/619740/capsule_sm_120.jpg?t=1530789304",
            salePrice: 0.49,
            normalPrice: 4.99,
            releaseDate: 1492387200,
            steamRatingText: "Mixed",
            dealRating: 5.1,
          },
        },
      },
    };

    const history = createMemoryHistory();
    history.push(
      "/detail/Qvi8qFhhjW%2F6qACmivQV9MKTzMac%2B38KZj5TTw%2FV8f0%3D"
    );

    const component = (
      <MockedProvider mocks={[mock]} addTypename={false}>
        <Router history={history}>
          <Route path="/detail/:id">
            <DetailPage />
          </Route>
        </Router>
      </MockedProvider>
    );

    render(component);

    await new Promise((resolve) => setTimeout(resolve, 50));

    const elements = [
      screen.getByText("The Inevitability"),
      screen.getByRole("img"),
      screen.getByText(`Released: ${new Date(1492387200).getFullYear()}`),
      screen.getByText(`Deal rating: 5.1`),
      screen.getByText(`Price: 0.49$`),
      screen.getByText("Instead of 4.99$"),
      screen.getByText("on Steam"),
    ];

    elements.forEach((e) => expect(e).toBeInTheDocument());

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });
});
