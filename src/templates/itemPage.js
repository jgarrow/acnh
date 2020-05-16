import React from "react"
import { graphql, Link } from "gatsby"

import { replaceSpacesWithHyphens } from "../utils/replaceSpacesWithHyphens"
import { capitalizeFirstLetters } from "../utils/capitalizeFirstLetters"

const ItemPage = ({ pageContext: { id, name }, data }) => {
  const item = data.itemsJson
  const recipePath = replaceSpacesWithHyphens(item.name) + "-recipe"

  const cost = item.variants[0].buy > -1 ? item.variants[0].buy : "N/A"

  console.log("id: ", id)
  console.log("name: ", name)

  return (
    <div>
      <h2>{capitalizeFirstLetters(item.name)}</h2>
      {item.variants &&
        item.variants.map(variant => (
          <img
            key={variant.uniqueEntryId}
            src={variant.image}
            alt={`${variant.colors[0]} and ${variant.colors[1]} ${item.name}`}
          />
        ))}
      <p>Cost: {cost}</p>
      <p>Sell: {item.variants[0].sell}</p>
      <p>Catalog: {item.catalog}</p>
      {item.customizationKitCost && (
        <p>Customization Kit Cost: {item.customizationKitCost}</p>
      )}
      <p>Size: {item.size}</p>
      {item.diy && <Link to={`${recipePath}`}>DIY Recipe</Link>}
    </div>
  )
}

export const data = graphql`
  query($id: String!) {
    itemsJson(id: { eq: $id }) {
      id
      catalog
      name
      diy
      customize
      customizationKitCost
      sourceSheet
      tag
      series
      set
      size
      variants {
        image
        colors
        buy
        sell
        uniqueEntryId
      }
    }
  }
`

export default ItemPage
