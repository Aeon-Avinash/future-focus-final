const path = require(`path`)
const slugify = require(`slugify`)
const webpack = require(`webpack`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post-template.js`)

  return graphql(`
    {
      allContentfulTestBlogPage {
        totalCount
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `)
    .then(result => {
      if (result.errors) {
        return Promise.reject(result.errors)
      }

      result.data.allContentfulTestBlogPage.edges.forEach(({ node }) => {

        createPage({
          path: `/blogs/${slugify(node.title, {
            replacement: "-",
            lower: true,
          })}`,
          component: blogPostTemplate,
          context: {
            id: node.id,
          },
        })
      })
    })
    .catch(err => console.log(err))
}

exports.onCreateWebpackConfig = ({ stage, actions, plugins }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        'global.GENTLY': false
      })
    ]
  })
}
