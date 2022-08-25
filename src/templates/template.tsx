import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import { RootLayout as Layout } from '../component/Layout'
const shortcodes = { Link } // Provide common components here

export default function PageTemplate({ data, children }) {
  return (
    <Layout>
      <h2>{data.mdx.frontmatter.title}</h2>
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`

