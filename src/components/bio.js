import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

const Bio = () => {
    const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

    const { social } = data.site.siteMetadata
    return (
        <div
            style={{
                marginBottom: rhythm(1),
                marginTop: 0,
                marginLeft: 20
            }}
        >
            <a
                href={`https://twitter.com/${social.twitter}`}
                rel="noopener noreferrer"
                target = "_blank"
            >
                {`Twitter`}
            </a>

        </div>
    )
}

export default Bio