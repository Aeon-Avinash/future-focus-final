require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Future Focus HR Services - Rourkela`,
    description: `Future-focus hr services based in Rourkela, Odisha has a mission to accomplish by providing the best accessible platform to both our client organizations and job seekers for achieving the utmost success.`,
    url: "https://futurefocushrservices.com",
    image: "/images/ff-icon.png",
    twitterUsername: "@futurefocus",
    author: `@aeondevworks`,
  },
  plugins: [
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Future Focus HR Services`,
        short_name: `Future-Focus`,
        start_url: `/`,
        background_color: `#ffc400`,
        theme_color: `#3f51b5`,
        display: `standalone`,
        icon: `src/images/ff-icon.png`, // This path is relative to the root of the site.
        crossOrigin: `use-credentials`,
      },
    },
    // "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-material-ui`,
      // If you want to use styled components, in conjunction to Material-UI, you should:
      // - Change the injection order
      // - Add the plugin
      // options: {
      //   stylesProvider: {
      //     injectFirst: true,
      //   },
      // },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
              tracedSVG: true,
            },
          },
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
              tracedSVG: true,
            },
          },
        ],
        excerpt_separator: `<!-- end -->`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.SPACE_ID,
        // Learn about environment variables: https://gatsby.app/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    // {
    //   resolve: "gatsby-source-googlemaps-geocoding",
    //   options: {
    //     key: process.env.GOOGLE_MAPS_GEOCODING_API_KEY,
    //     address: `Rourkela, Orissa, India`,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: `gatsby-plugin-netlify`,
      // options: {
      //   headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
      //   allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
      //   mergeSecurityHeaders: true, // boolean to turn off the default security headers
      //   mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
      //   mergeCachingHeaders: true, // boolean to turn off the default caching headers
      //   transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
      //   generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      // },
    },
    `gatsby-plugin-offline`,
  ],
}
