import React, { useState } from "react"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react"

import FFLogo from "../../images/ff-icon.svg"

const GOOGLE_MAPS_JS_API_KEY =
  process.env.GOOGLE_MAPS_JS_API_KEY ||
  process.env.GATSBY_GOOGLE_MAPS_JS_API_KEY

const GoogleMap = props => {
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState({})
  const theme = useTheme()

  const md_sm_MediaWidth = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const up_md_MediaWidth = useMediaQuery(theme.breakpoints.up("md"))

  const mapStyles = {
    width: "100%",
    height: "100%",
  }

  const containerStyles = {
    width: up_md_MediaWidth ? "600px" : md_sm_MediaWidth ? "88%" : "80%",
    height: up_md_MediaWidth ? "500px" : "40%",
    position: up_md_MediaWidth ? "relative" : "absolute",
  }

  const markerContent = (
    <div dangerouslySetInnerHTML={{ __html: props.contactInfo }} />
  )

  const markerClickHandler = (props, marker, e) => {
    setActiveMarker(marker)
    setShowInfoWindow(true)
  }

  const mapClickHandler = props => {
    if (showInfoWindow) {
      setActiveMarker(null)
      setShowInfoWindow(false)
    }
  }

  const { google } = props

  return (
    <Map
      google={google}
      zoom={16}
      style={mapStyles}
      containerStyle={containerStyles}
      initialCenter={{ lat: 22.2266, lng: 84.8443 }}
      onClick={mapClickHandler}
    >
      <Marker
        position={{ lat: 22.2266, lng: 84.8443 }}
        // label={`FF`}
        icon={{
          url: FFLogo,
          anchor: new google.maps.Point(32, 32),
          scaledSize: new google.maps.Size(48, 48),
        }}
        name={"Future Focus HR Services"}
        title="Future Focus HR Services"
        onClick={markerClickHandler}
      />
      <InfoWindow marker={activeMarker} visible={showInfoWindow}>
        {markerContent}
      </InfoWindow>
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_JS_API_KEY,
})(GoogleMap)
