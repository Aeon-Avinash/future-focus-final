import React from "react"
import Img from "gatsby-image"
import { useTheme } from "@material-ui/styles"

const MyImg = props => {
  const theme = useTheme()
  return (
    <Img
      // defult styles spread into the wrapper element (svg/blur)
      style={{
        opacity: theme.opacity.imgWrapper,
        background: theme.palette.imageFilter,
      }}
      // default styles spread into the actual 'img' element
      imgStyle={{
        opacity: theme.opacity.img,
        background: theme.palette.imageFilter,
      }}
      {...props}
    />
  )
}

export default MyImg
