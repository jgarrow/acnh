import React from "react"
import { graphql, Link } from "gatsby"

import { replaceSpacesWithHyphens } from "../utils/replaceSpacesWithHyphens"
import { capitalizeFirstLetters } from "../utils/capitalizeFirstLetters"

const ItemPage = ({ pageContext: { id, name }, data }) => {
  const item = data.itemsJson
  const recipe = data.recipesJson

  const materials = Object.keys(recipe.materials).filter(
    material => recipe.materials[material] !== null
  )

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

      {/* {item.diy && <Link to={`${recipePath}`}>DIY Recipe</Link>} */}

      {item.diy && (
        <div
          style={{
            display: `flex`,
            width: `175px`,
            justifyContent: `space-between`,
            alignItems: `center`,
          }}
        >
          <p
            style={{
              alignSelf: `flex-start`,
            }}
          >
            Materials:{" "}
          </p>
          <div
            style={{
              display: `flex`,
              flexDirection: `column`,
            }}
          >
            {materials &&
              materials.map((material, index) => {
                const materialName = material.replace(/_/g, " ")
                return (
                  <p key={`${material} ${index}`}>
                    {materialName}: {recipe.materials[material]}
                  </p>
                )
              })}
          </div>
        </div>
      )}

      {item.diy && (
        <div
          style={{
            display: `flex`,
            width: `175px`,
            justifyContent: `space-between`,
            alignItems: `center`,
          }}
        >
          <p>Source: </p>
          {recipe.source.map(source => (
            <p>{source}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export const data = graphql`
  query($id: String!, $name: String!) {
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

    recipesJson(name: { eq: $name }) {
      id
      name
      source
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
`

export default ItemPage
