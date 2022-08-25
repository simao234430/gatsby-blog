import { createFilePath } from "gatsby-source-filesystem";
import { GatsbyNode } from "gatsby";
import path from "path";
import * as types from "./types";
const createPages: GatsbyNode["createPages"] = 
async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;
    const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors)
  }

  const posts = result.data.allMdx.nodes

  posts.forEach(node => {
 

    // Don't create a page for src/pages/chart-info.mdx since this already gets created
    if (node.frontmatter.slug !== `/chart-info`) {
        
      // For /blog-2 define a contentFilePath and thus have two layouts. The src/components/layout.jsx and nested inside that the src/templates/posts.jsx
      createPage({
        path: node.frontmatter.slug?node.frontmatter.slug:node.fields.slug,
        component: `${path.resolve(`src/templates/template.tsx`)}?__contentFilePath=${node.internal.contentFilePath}`,
        context: { id: node.id },
      })


    }
  })
}
export { createPages };  