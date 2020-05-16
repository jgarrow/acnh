import React from "react"
import { graphql, Link } from "gatsby"

import { replaceSpacesWithHyphens } from "../utils/replaceSpacesWithHyphens"

const Recipes = ({ data }) => {
  const recipes = data.allRecipesJson.edges.map(({ node }) => node)

  return (
    <div
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fill, minmax(128px, 1fr))`,
        gridGap: `15px`,
      }}
    >
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <Link to={`/${replaceSpacesWithHyphens(recipe.name) + "-recipe"}`}>
            <p>{recipe.name}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export const data = graphql`
  query {
    allRecipesJson {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

export default Recipes
