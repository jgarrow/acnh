/** @jsx jsx */
import { jsx, Box, Input, Label, Select } from "theme-ui"
import { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import { default as MultiSelect } from "react-select"
import makeAnimated from "react-select/animated"

// TODO: add sort/filter
// sort alphabetically, by personality, by species

const Villagers = ({ data }) => {
  const villagers = data.allVillagersJson.edges.map(({ node }) => node)
  const [searchResults, setSearchResults] = useState([...villagers])
  const [searchInput, setSearchInput] = useState("")
  const [sort, setSort] = useState("a-z")
  const [selectedSpecies, setSelectedSpecies] = useState([])
  const [selectedPersonalities, setSelectedPersonalities] = useState([])
  const animatedComponents = makeAnimated() // for MultiSelect animation
  const speciesOptions = [
    {
      value: "alligator",
      label: "Alligator",
    },
    {
      value: "anteater",
      label: "Anteater",
    },
    {
      value: "bear",
      label: "Bear",
    },
    {
      value: "bird",
      label: "Bird",
    },
    {
      value: "bull",
      label: "Bull",
    },
    {
      value: "cat",
      label: "Cat",
    },
    {
      value: "chicken",
      label: "Chicken",
    },
    {
      value: "cow",
      label: "Cow",
    },
    {
      value: "cub",
      label: "Cub",
    },
    {
      value: "deer",
      label: "Deer",
    },
    {
      value: "dog",
      label: "Dog",
    },
    {
      value: "duck",
      label: "Duck",
    },
    {
      value: "eagle",
      label: "Eagle",
    },
    {
      value: "elephant",
      label: "Elephant",
    },

    {
      value: "frog",
      label: "Frog",
    },
    {
      value: "goat",
      label: "Goat",
    },
    {
      value: "gorilla",
      label: "Gorilla",
    },
    {
      value: "hamster",
      label: "Hamster",
    },
    {
      value: "hippo",
      label: "Hippo",
    },
    {
      value: "horse",
      label: "Horse",
    },
    {
      value: "kangaroo",
      label: "Kangaroo",
    },
    {
      value: "koala",
      label: "Koala",
    },
    {
      value: "lion",
      label: "Lion",
    },
    {
      value: "monkey",
      label: "Monkey",
    },
    {
      value: "mouse",
      label: "Mouse",
    },
    {
      value: "octopus",
      label: "Octopus",
    },
    {
      value: "ostrich",
      label: "Ostrich",
    },
    {
      value: "penguin",
      label: "Penguin",
    },
    {
      value: "pig",
      label: "Pig",
    },
    {
      value: "rabbit",
      label: "Rabbit",
    },
    {
      value: "rhino",
      label: "Rhino",
    },
    {
      value: "sheep",
      label: "Sheep",
    },
    {
      value: "squirrel",
      label: "Squirrel",
    },
    {
      value: "tiger",
      label: "Tiger",
    },
    {
      value: "wolf",
      label: "Wolf",
    },
  ]

  const personalityOptions = [
    {
      value: `cranky`,
      label: `Cranky`,
    },
    {
      value: `jock`,
      label: `Jock`,
    },
    {
      value: `lazy`,
      label: `Lazy`,
    },
    {
      value: `smug`,
      label: `Smug`,
    },
    {
      value: `normal`,
      label: `Normal`,
    },
    {
      value: `peppy`,
      label: `Peppy`,
    },
    {
      value: `snooty`,
      label: `Snooty`,
    },
    {
      value: `big sister`,
      label: `Big Sister`,
    },
  ]
  const handleSearchChange = e => {
    let results = [...villagers].filter(villager =>
      villager.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    console.log("e.target.value: ", e.target.value)
    console.log("search input results: ", results)
    setSearchInput(e.target.value)
    setSearchResults(results)
  }

  useEffect(() => {
    console.log("selectedSpecies: ", selectedSpecies)
    console.log("selectedPersonalities: ", selectedPersonalities)
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

    console.log("results: ", results)

    setSearchResults(results)
  }, [sort, selectedSpecies, selectedPersonalities])

  return (
    <Layout>
      <div
        sx={{
          width: `80%`,
          margin: `0 auto`,
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fill, minmax(100px, 130px))`,
          gridGap: `15px`,
          justifyContent: `center`,
        }}
      >
        <Box as="form">
          <Label htmlFor="sort">Sort by:</Label>
          <Select
            id="sort"
            name="sort"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </Select>

          <Label htmlFor="speciesFilter">Filter by species:</Label>
          <MultiSelect
            id="speciesFilter"
            options={speciesOptions}
            isMulti={true}
            components={animatedComponents}
            value={selectedSpecies}
            onChange={newValue => setSelectedSpecies(newValue)}
          />

          <Label htmlFor="personalityFilter">Filter by personality:</Label>
          <MultiSelect
            id="personalityFilter"
            options={personalityOptions}
            isMulti={true}
            components={animatedComponents}
            value={selectedPersonalities}
            onChange={newValue => setSelectedPersonalities(newValue)}
          />

          {/* <Select
            id="filter"
            name="filter"
            defaultValue="name"
            onChange={handleChange}
          >
            <option value="name">Name</option>
            <option value="personality">Personality</option>
            <option value="species">Species</option>
          </Select> */}

          <Label htmlFor="searchInput">Search</Label>
          <Input
            id="searchInput"
            name="searchInput"
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </Box>

        {searchResults.map(villager => (
          <Link
            to={`/${villager.name}`}
            key={villager.id}
            sx={{
              color: `text`,
              textDecoration: `none`,
            }}
          >
            <div
              sx={{
                width: `100%`,
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
