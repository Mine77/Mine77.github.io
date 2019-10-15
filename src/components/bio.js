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
                alt="青年真好吃"
                style={{
                    width: 150,
                    height: 150,
                    marginBottom: 0
                }}
            />
            <h5
                style={{
                    margin: 0,
                    padding: 6
                }}
            >
                青年真好吃
            </h5>
        </div>
    )

    const { social } = data.site.siteMetadata
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
                            微信公众号
                        </a>
                    </Tippy>
                </li>
            </ul>
        </div>

    )
}

export default Bio