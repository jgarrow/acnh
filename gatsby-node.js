const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allItemsJson {
        edges {
          node {
            id
            catalog
            name
            diy
            customize
            sourceSheet
            tag
            series
            set
            size
            variants {
              image
              buy
              sell
              uniqueEntryId
            }
          }
        }
      }
      allRecipesJson {
        edges {
          node {
            id
            uniqueEntryId
            category
            name
            source
            sourceNotes
          }
        }
      }

      allVillagersJson {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `)

  result.data.allVillagersJson.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.name}`,
      component: path.resolve(`./src/templates/villagerPage.js`),
      context: {
        id: node.id,
        name: node.name,
      },
    })
  })

  result.data.allItemsJson.edges.forEach(({ node }) => {
    const pathName = node.name.replace(/\s+/g, "-")

    createPage({
      path: `/${pathName}`,
      component: path.resolve(`./src/templates/itemPage.js`),
      context: {
        id: node.id,
        name: node.name,
      },
    })
  })

  result.data.allRecipesJson.edges.forEach(({ node }) => {
    const pathName = node.name.replace(/\s+/g, "-")

    createPage({
      path: `/${pathName}-recipe`,
      component: path.resolve(`./src/templates/recipePage.js`),
      context: {
        id: node.id,
        name: node.name,
      },
    })
  })
}
