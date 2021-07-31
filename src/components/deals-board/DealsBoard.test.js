import { getAllByRole, render, screen } from "@testing-library/react";
import DealsBoard from "./DealsBoard";

function checkIfDataInTheDocument(dealsData) {
  dealsData.forEach((data) => {
    const title = screen.getByText(data.title);
    const price = screen.getByText(`${data.salePrice}$`);
    const normalPriceInfo = screen.getByText(`Instead of ${data.normalPrice}$`);
    const image = screen.getByAltText(data.title + " image");

    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(normalPriceInfo).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
}

it("shows a grid of deals card", () => {
  const dealsData = [
    {
      title: "Tumblestone",
      storeID: "1",
      salePrice: 3.74,
      normalPrice: 24.99,
      thumb:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/269710/capsule_sm_120.jpg?t=1625169247",
    },
    {
      title: "Freedom Force",
      storeID: "7",
      salePrice: 1.49,
      normalPrice: 5.99,
      thumb:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/8880/capsule_sm_120.jpg?t=1569012854",
    },
    {
      title: "Deus Ex: Human Revolution - Director's Cut",
      storeID: "11",
      salePrice: 2.99,
      normalPrice: 19.99,
      thumb:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/238010/capsule_sm_120.jpg?t=1619788192",
    },
  ];

  render(<DealsBoard dealsData={dealsData} />);

  checkIfDataInTheDocument(dealsData);
});

it("can set the number of grid columns to 4 when dealsData length is greater than 3", () => {
  const dealsData = [
    {
      title: "Tumblestone",
      storeID: "1",
      salePrice: 3.74,
      normalPrice: 24.99,
      thumb:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/269710/capsule_sm_120.jpg?t=1625169247",
    },
    {
      title: "Freedom Force",
      storeID: "7",
      salePrice: 1.49,
      normalPrice: 5.99,
      thumb:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/8880/capsule_sm_120.jpg?t=1569012854",
    },
    {
      title: "Deus Ex: Human Revolution - Director's Cut",
      storeID: "11",
      salePrice: 2.99,
      normalPrice: 19.99,
      thumb:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/238010/capsule_sm_120.jpg?t=1619788192",
    },
    {
      title: "Just Cause 2",
      storeID: "11",
      salePrice: "1.49",
      normalPrice: "14.99",
      thumb:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/8190/capsule_sm_120.jpg?t=1593180404",
    },
    {
      title: "Zombie Night Terror",
      storeID: "1",
      salePrice: "1.29",
      normalPrice: "12.99",
      thumb:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/416680/capsule_sm_120.jpg?t=1582640712",
    },
    {
      title: "Redneck Ed: Astro Monsters Show",
      storeID: "1",
      salePrice: "1.99",
      normalPrice: "19.99",
      thumb:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1237490/capsule_sm_120.jpg?t=1624543511",
    },
  ];

  const { container } = render(<DealsBoard dealsData={dealsData} />);
  expect(container.firstChild).toHaveClass("dealsboard-4");
});

it("can set the number of grid columns to 4 when dealsData length is lower or equal than 3", () => {
  const dealsData = [
    {
      title: "Tumblestone",
      storeID: "1",
      salePrice: 3.74,
      normalPrice: 24.99,
      thumb:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/269710/capsule_sm_120.jpg?t=1625169247",
    },
    {
      title: "Freedom Force",
      storeID: "7",
      salePrice: 1.49,
      normalPrice: 5.99,
      thumb:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/8880/capsule_sm_120.jpg?t=1569012854",
    },
    {
      title: "Deus Ex: Human Revolution - Director's Cut",
      storeID: "11",
      salePrice: 2.99,
      normalPrice: 19.99,
      thumb:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/238010/capsule_sm_120.jpg?t=1619788192",
    },
  ];

  const { container } = render(<DealsBoard dealsData={dealsData} />);
  expect(container.firstChild).toHaveClass("dealsboard-3");
});
