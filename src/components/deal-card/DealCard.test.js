import { render, screen } from '@testing-library/react';
import DealCard from './DealCard'

describe('DealCard data', () => {

  it('shows the data passed as prop', () => {
  
    const dealData = {
      title: "Deus Ex: Human Revolution - Director's Cut",
      storeID: "11",
      salePrice: 2.99,
      normalPrice: 19.99,
      thumb: "https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/238010\/capsule_sm_120.jpg?t=1619788192"
    }
  
    render(<DealCard dealData={dealData}/>)
  
    const titleElement = screen.getByText(/Deus Ex: Human Revolution - Director's Cut/i)
    expect(titleElement).toBeInTheDocument()
  
    const salePriceElement = screen.getByText("2.99$")
    expect(salePriceElement).toBeInTheDocument()
  
    const normalPriceElement = screen.getByText("Instead of 19.99$")
    expect(normalPriceElement).toBeInTheDocument()
  
    const imgElement = screen.getByRole('img')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement.src).toEqual(
      "https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/238010\/capsule_sm_120.jpg?t=1619788192")
    
  })
})


describe('DealCard style',() => {

  it('sets the correct color for steam', () => {
    const steamData = {
      title: "Tumblestone",
      storeID: "1",
      salePrice: 3.74,
      normalPrice : 24.99,
      thumb : "https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/269710\/capsule_sm_120.jpg?t=1625169247"
    }

    const { container } = render(<DealCard dealData={steamData} />)

    expect(container.firstChild).toHaveClass('steam-class')
    expect(container.firstChild.classList.contains('gog-class')).toBe(false)
    expect(container.firstChild.classList.contains('humble-class')).toBe(false)

    
  })

  it('sets the correct color for gog', () => {
    const gogData = {
      "title": "Freedom Force",
      "storeID": "7",
      "salePrice": "1.49",
      "normalPrice": "5.99",
      "thumb": "https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/8880\/capsule_sm_120.jpg?t=1569012854"
    }

    const { container } = render(<DealCard dealData={gogData} />)

    expect(container.firstChild).toHaveClass('gog-class')
    expect(container.firstChild.classList.contains('steam-class')).toBe(false)
    expect(container.firstChild.classList.contains('humble-class')).toBe(false)
  })

  it('sets the correct color for humble store', () => {
    const humbleData = {
      title: "Deus Ex: Human Revolution - Director's Cut",
      storeID: "11",
      salePrice: 2.99,
      normalPrice: 19.99,
      thumb: "https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/238010\/capsule_sm_120.jpg?t=1619788192"
    }

    const { container } = render(<DealCard dealData={humbleData} />)

    expect(container.firstChild).toHaveClass('humble-class')
    expect(container.firstChild.classList.contains('steam-class')).toBe(false)
    expect(container.firstChild.classList.contains('gog-class')).toBe(false)
  })

  it('is hoverable when dealData contains a dealID', () => {
    const dealData = {
      title: "Deus Ex: Human Revolution - Director's Cut",
      dealID: "mU%2FbH6z0MsHtcyqBBnv1C29aei%2FU0ZcsW0tNaZjC3xQ%3D",
      storeID: "11",
      salePrice: 2.99,
      normalPrice: 19.99,
      thumb: "https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/238010\/capsule_sm_120.jpg?t=1619788192"
    }

    const { container } = render(<DealCard dealData={dealData}/>)
    expect(container.firstChild).toHaveClass('link-class')
  })

  it('is not hoverable when dealData has  dealID', () => {
    const dealData = {
      title: "Deus Ex: Human Revolution - Director's Cut",
      storeID: "11",
      salePrice: 2.99,
      normalPrice: 19.99,
      thumb: "https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/238010\/capsule_sm_120.jpg?t=1619788192"
    }
     
    const { container } = render(<DealCard dealData={dealData} />)
    expect(container.firstChild.classList.contains('link-class')).toBe(false)
  })


})
