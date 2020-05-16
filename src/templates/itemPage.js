import React from "react"
import { graphql, Link } from "gatsby"

const ItemPage = ({ pageContext: { id, name }, data }) => {
  const item = data.itemsJson
  const recipe = data.recipesJson
  const recipePath = item.name.replace(/\s+/g, "-") + "-recipe"

  const cost = item.variants[0].buy > -1 ? item.variants[0].buy : "N/A"

  console.log("id: ", id)
  console.log("name: ", name)

  console.log("recipe: ", recipe)

  return (
    <div>
      <h2>Item name: {item.name}</h2>
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
