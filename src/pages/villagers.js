/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import VillagerSearchForm from "../components/villagerSearchForm"

const Villagers = ({ data }) => {
  const villagers = data.allVillagersJson.edges.map(({ node }) => node)
  const [searchResults, setSearchResults] = useState([...villagers])
  const [searchInput, setSearchInput] = useState("")
  const [sort, setSort] = useState("a-z")
  const [selectedSpecies, setSelectedSpecies] = useState([])
  const [selectedPersonalities, setSelectedPersonalities] = useState([])

  const handleSearchChange = e => {
    let results = [...villagers].filter(villager =>
      villager.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setSearchInput(e.target.value)
    setSearchResults(results)
  }

  useEffect(() => {
    let results = [...villagers]
    const speciesFilter = selectedSpecies
      ? selectedSpecies.map(species => species.value)
      : []
    const personalitiesFilter = selectedPersonalities
      ? selectedPersonalities.map(personality => personality.value)
      : []

    if (speciesFilter.length) {
      results = [...villagers].filter(villager =>
        speciesFilter.includes(villager.species.toLowerCase())
      )

      if (personalitiesFilter.length) {
        results = results.filter(villager =>
          personalitiesFilter.includes(villager.personality.toLowerCase())
        )
      }
    } else if (personalitiesFilter.length) {
      results = [...villagers].filter(villager =>
        personalitiesFilter.includes(villager.personality.toLowerCase())
      )
    }

    if (sort === "a-z") {
      results = results.sort()
    } else if (sort === "z-a") {
      results = results.sort((a, b) => (a > b ? 1 : -1))
    }

    setSearchResults(results)
  }, [sort, selectedSpecies, selectedPersonalities])

  return (
    <Layout>
      <div
        sx={{
          width: `80%`,
          margin: `0 auto`,
          display: `flex`,
          justifyContent: `space-evenly`,
        }}
      >
        <VillagerSearchForm
          sort={sort}
          setSort={setSort}
          selectedSpecies={selectedSpecies}
          setSelectedSpecies={setSelectedSpecies}
          selectedPersonalities={selectedPersonalities}
          setSelectedPersonalities={setSelectedPersonalities}
          searchInput={searchInput}
          handleSearchChange={handleSearchChange}
        />

        <div
          sx={{
            width: `100%`,
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fill, minmax(100px, 1fr))`,
            gridGap: `15px`,
            justifyContent: `center`,
            // margin: `15px 0`,
          }}
        >
          {searchResults.map(villager => (
            <Link
              to={`/${villager.name}`}
              key={villager.id}
              sx={{
                color: `text`,
                textDecoration: `none`,
                width: `100%`,
                maxWidth: `100px`,
              }}
            >
              <div
                sx={{
                  width: `100%`,
                  maxwidth: `100px`,
                  textAlign: `center`,
                  bg: `primary`,
                  padding: `10px`,
                  borderRadius: `20px`,
                }}
              >
                <div
                  sx={{
                    width: `100%`,
                  }}
                >
                  <img
                    src={villager.iconImage}
                    alt={villager.name}
                    sx={{
                      width: `100%`,
                    }}
                  />
                </div>
                <p
                  sx={{
                    margin: `0`,
                  }}
                >
                  {villager.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const data = graphql`
  query {
    allVillagersJson {
      edges {
        node {
          id
          name
          iconImage
          personality
          species
        }
      }
    }
  }
`

export default Villagers
