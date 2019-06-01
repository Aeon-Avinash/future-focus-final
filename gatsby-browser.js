import React from "react"

import { ContentSelector } from "./src/components/contexts/ContentContext/ContentContext"

export const wrapRootElement = ({ element }) => (
  <ContentSelector>{element}</ContentSelector>
)
