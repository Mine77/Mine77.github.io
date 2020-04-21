import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Tippy from '@tippy.js/react'

import { rhythm } from "../utils/typography"

import "./bio.css"

import qrcodeImg from "../img/qrcode.png"

const Bio = () => {
    const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
          siteUrl
          social {
            twitter
          }
        }
      }
    }
  `)

    const qrcode = (
        <div>
            <img
                src={qrcodeImg}
                alt="真好吃"
                style={{
                    width: 150,
                    height: 150,
                    marginBottom: 0
                }}
            />
        </div>
    )

    const { social } = data.site.siteMetadata
    const { siteUrl } = data.site.siteMetadata
    return (
        <div
            style={{
                marginBottom: rhythm(1),
                marginTop: -14,
                marginLeft: 20
            }}
            className="social"
        >
            <ul>
                <li>
                    <a
                        href={`https://twitter.com/${social.twitter}`}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Twitter
                    </a>
                </li>
                <li>
                    <Tippy
                        content={qrcode}
                        placement="bottom"
                        trigger="click"
                        interactive="true"
                        animation="scale"
                        arrow={true}
                        arrowType="round"
                    >
                        <a>
                            微信
                        </a>
                    </Tippy>
                </li>
                <li>
                    <a
                        href={`${siteUrl}/rss.xml`}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        RSS
                    </a>
                </li>
            </ul>
        </div>

    )
}

export default Bio