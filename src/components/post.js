import React from "react"
import { Link } from "gatsby"

import postStyles from "./post.module.css"

class Post extends React.Component {
    render() {
        const node = this.props.node
        const title = node.frontmatter.title || node.fields.slug

        return (

            <div className={postStyles.box}>
                <div className={postStyles.content} key={node.fields.slug}>
                    <h3>
                        <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                            {title}
                        </Link>
                    </h3>
                    <small>{node.frontmatter.date}</small>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: node.frontmatter.description || node.excerpt,
                        }}
                    />
                </div>
            </div>

        )
    }
}

export default Post