/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"

import "../styles/layout.css"

const Layout = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

export default Layout
