import React from "react"

import { rhythm } from "../utils/typography"

class Layout extends React.Component {
    render() {
        const { location, title, children } = this.props
        const rootPath = `${__PATH_PREFIX__}/`
        let header

        if (location.pathname === rootPath) {
            header = (
                <h2
                    style={{
                        marginBottom: rhythm(0.5),
                        marginTop: rhythm(1.5),
                        marginLeft: 20
                    }}
                >
                    <p
                        style={{
                            boxShadow: `none`,
                            textDecoration: `none`,
                            color: `inherit`,
                            marginBottom: 0
                        }}
                    >
                        {title}
                    </p>
                </h2>
            )
        } else {
            header = null
        }
        return (
            <div
                style={{
                    marginLeft: `auto`,
                    marginRight: `auto`,
                    maxWidth: rhythm(24),
                    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
                }}
            >
                <header>{header}</header>
                <main>{children}</main>
            </div>
        )
    }
}

export default Layout
