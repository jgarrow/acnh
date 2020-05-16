import React from "react"
import { graphql, Link } from "gatsby"

import { replaceSpacesWithHyphens } from "../utils/replaceSpacesWithHyphens"

const Items = ({ data }) => {
  const items = data.allItemsJson.edges.map(({ node }) => node)

  return (
    <div
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fill, minmax(128px, 1fr))`,
        gridGap: `15px`,
      }}
    >
      {items.map(item => (
        <div key={item.id}>
          <Link to={`/${replaceSpacesWithHyphens(item.name)}`}>
            <img src={item.variants[0].image} alt={item.name} />
          </Link>
          <Link to={`/${replaceSpacesWithHyphens(item.name)}`}>
            <p>{item.name}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export const data = graphql`
  query {
    allItemsJson {
      edges {
        node {
          id
          name
          variants {
            image
          }
        }
      }
    }
  }
`

export default Items
