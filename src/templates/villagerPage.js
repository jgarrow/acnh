/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const VillagerPage = ({ pageContext: { id, name }, data }) => {
  const villager = data.villagersJson
  const styles = villager.styles.join(", ")
  const colors = villager.colors.join(", ")

  return (
    <Layout>
      <div
        sx={{
          width: `80%`,
          margin: `0 auto`,
          bg: `primary`,
        }}
      >
        <div
          sx={{
            width: `130px`,
          }}
        >
          <img
            src={villager.iconImage}
            alt={villager.name}
            sx={{ width: `100%` }}
          />
        </div>
        <h2>{villager.name}</h2>
        <div
          sx={{
            width: `130px`,
          }}
        >
          <img
            src={villager.houseImage}
            alt={`${villager.name}'s house`}
            sx={{ width: `100%` }}
          />
        </div>
        <p>Species: {villager.species}</p>
        <p>Birthday: {villager.birthday}</p>
        <p>Gender: {villager.gender}</p>
        <p>Catchphrase: {villager.catchphrase}</p>
        <p>Hobby: {villager.hobby}</p>
        <p>Favorite Song: {villager.favoriteSong}</p>
        <p>Personality: {villager.personality}</p>
        <p>Styles: {styles}</p>
        <p>Colors: {colors}</p>
      </div>
    </Layout>
  )
}

export const data = graphql`
  query($id: String!) {
    villagersJson(id: { eq: $id }) {
      id
      name
      species
      birthday
      gender
      catchphrase
      hobby
      colors
      favoriteSong
      personality
      styles
      iconImage
      houseImage
    }
  }
`

export default VillagerPage
