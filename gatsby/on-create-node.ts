import { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import * as types from "./types";
import * as utils from "./utils";
import path from "path";
const onCreateNode: GatsbyNode["onCreateNode"] = ({
    node,
    actions,
    getNode
  }) => {

    const { createNodeField } = actions;
    // console.log(node.internal.type )
    if (node.internal.type === `Mdx`) {  
        const { frontmatter }: types.Edge["node"] = node;
        const { slug } = frontmatter || {};
 
        if (slug) {
          createNodeField({ node, name: "slug", slug });
        //   console.log(slug)
        } else {
          const value = createFilePath({ node, getNode ,basePath:"contents"});
        //   console.log("empty")
        //   console.log(value)
          createNodeField({ node, name: "slug", value });
        }
        // console.log(node.internal.type)
    }

  
}
  

export { onCreateNode };