/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import ItemsSearchForm from "../components/itemsSearchForm"

import { replaceSpacesWithHyphens } from "../utils/replaceSpacesWithHyphens"

// TODO: add more filters
// type of item
// customizable

const Items = ({ data }) => {
  const recipes = data.allRecipesJson.edges.map(({ node }) => node)
  let items = data.allItemsJson.edges.map(({ node }) => node)
  items = items.map(item => {
    const itemRecipe = recipes.find(recipe => recipe.name === item.name)
    const materials = itemRecipe
      ? Object.keys(itemRecipe.materials).filter(
          material => itemRecipe.materials[material] !== null
        )
      : []

    return {
      ...item,
      materials,
    }
  })

  const [searchResults, setSearchResults] = useState([...items])
  const [searchInput, setSearchInput] = useState("")
  const [sort, setSort] = useState("a-z")
  const [selectedMaterials, setSelectedMaterials] = useState([])

  const handleSearchChange = e => {
    let results = [...items].filter(item =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setSearchInput(e.target.value)
    setSearchResults(results)
  }

  useEffect(() => {
    let results = [...items]

    const materialsFilter = selectedMaterials
      ? selectedMaterials.map(material => material.value)
      : []

    if (materialsFilter.length) {
      results = [...items].reduce((acc, c, i) => {
        const arr = c.materials.filter(itemMaterial =>
          materialsFilter.includes(itemMaterial.toLowerCase())
        )

        if (arr.length || materialsFilter.includes(c.name.toLowerCase())) {
          acc.push(c)
        }

        return acc
      }, [])
    }

    if (sort === "a-z") {
      results = results.sort()
    } else if (sort === "z-a") {
      results = results.sort((a, b) => (a > b ? 1 : -1))
    }

    setSearchResults(results)
  }, [sort, selectedMaterials])

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
        <ItemsSearchForm
          sort={sort}
          setSort={setSort}
          selectedMaterials={selectedMaterials}
          setSelectedMaterials={setSelectedMaterials}
          searchInput={searchInput}
          handleSearchChange={handleSearchChange}
        />
        <div
          sx={{
            width: `100%`,
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fill, minmax(128px, 1fr))`,
            gridGap: `15px`,
            justifyContent: `center`,
          }}
        >
          {searchResults.map(item => (
            <div
              key={item.id}
              sx={{
                bg: `primary`,
                padding: `10px`,
                borderRadius: `20px`,
                textAlign: `center`,
                width: `100%`,
                // maxWidth: `100px`,
              }}
            >
              <Link
                to={`/${replaceSpacesWithHyphens(item.name)}`}
                sx={{ textDecoration: `none` }}
              >
                <img
                  src={item.variants[0].image}
                  alt={item.name}
                  sx={{
                    width: `100%`,
                    // maxWidth: `100px`,
                  }}
                />
              </Link>
              <Link
                to={`/${replaceSpacesWithHyphens(item.name)}`}
                sx={{ textDecoration: `none`, color: `text` }}
              >
                <p>{item.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
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

    allRecipesJson {
      edges {
        node {
          id
          name
          materials {
            Aquarius_fragment
            Aries_fragment
            Baby_bear
            Cancer_fragment
            Capricorn_fragment
            Gemini_fragment
            Leo_fragment
            Libra_fragment
            Mama_bear
            Papa_bear
            Pisces_fragment
            Sagittarius_fragment
            Scorpius_fragment
            Taurus_fragment
            Virgo_fragment
            acorn
            apple
            axe
            bamboo_piece
            bamboo_shoot
            bells
            black_cosmos
            black_lilies
            black_roses
            blue_hyacinths
            black_tulips
            blue_ornament
            blue_pansies
            blue_roses
            blue_windflowers
            book
            boot
            branch
            campfire
            cardboard_box
            cherry
            cherry_blossom_bonsai
            cherry_blossom_petal
            clay
            clump_of_weeds
            coconut
            conch
            coral
            cowrie
            cutting_board
            document_stack
            drinking_fountain
            earth_egg
            elegant_mushroom
            empty_can
            fishing_rod
            flat_mushroom
            flimsy_axe
            flimsy_fishing_rod
            flimsy_net
            flimsy_shovel
            flimsy_watering_can
            fossil
            giant_clam
            gold_armor
            gold_nugget
            gold_ornament
            gold_roses
            green_mums
            hardwood
            iron_nugget
            ironwood_dresser
            large_snowflake
            large_star_fragment
            leaf_egg
            log_bench
            log_chair
            log_stakes
            log_stool
            lucky_cat
            magazine
            manila_clam
            maple_leaf
            mini_DIY_workbench
            net
            oil_barrel
            old_tire
            orange
            orange_cosmos
            orange_hyacinths
            orange_lilies
            orange_pansies
            orange_roses
            orange_tulips
            orange_windflowers
            painting_set
            peach
            pear
            pine_bonsai_tree
            pine_cone
            pink_hyacinths
            pink_cosmos
            pink_lilies
            pink_mums
            pink_roses
            pink_tulips
            pink_windflowers
            purple_hyacinths
            purple_mums
            purple_pansies
            purple_roses
            purple_tulips
            purple_windflowers
            rare_mushroom
            red_cosmos
            red_hyacinths
            red_lilies
            red_mums
            red_ornament
            red_pansies
            red_roses
            red_tulips
            red_windflowers
            rocket
            round_mushroom
            rusted_part
            sand_dollar
            sandy_beach_flooring
            scattered_papers
            screen_wall
            sea_snail
            shovel
            skinny_mushroom
            sky_egg
            slingshot
            snowflake
            softwood
            star_fragment
            stone
            stone_egg
            summer_shell
            tree_branch
            upright_piano
            venus_comb
            wasp_nest
            water_egg
            watering_can
            wedding_flower_stand
            weed
            white_cosmos
            white_hyacinths
            white_liles
            white_lilies
            white_mums
            white_pansies
            white_roses
            white_tulips
            white_windflowers
            wobbling_Zipper_toy
            wood
            wood_egg
            wooden_block_toy
            yellow_cosmos
            yellow_hyacinths
            yellow_lilies
            yellow_mums
            yellow_pansies
            yellow_roses
            yellow_tulips
            young_spring_bamboo
            zen_cushion
          }
        }
      }
    }
  }
`

export default Items
