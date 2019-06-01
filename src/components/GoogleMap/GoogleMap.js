import React, { useState } from "react"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react"

const GOOGLE_MAPS_JS_API_KEY =
  process.env.GOOGLE_MAPS_JS_API_KEY ||
  process.env.GATSBY_GOOGLE_MAPS_JS_API_KEY

const GoogleMap = props => {
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState({})
  const theme = useTheme()
  const mdMediaWidth = useMediaQuery(theme.breakpoints.up("md"))

  const mapStyles = {
    width: "100%",
    height: "100%",
  }

  const containerStyles = {
    width: mdMediaWidth ? "600px" : "88%",
    height: mdMediaWidth ? "500px" : "40%",
    position: mdMediaWidth ? "relative" : "absolute",
  }

  const markerContent = (
    <div>
      <h2>Future Focus Services</h2>
      <h4 style={{ marginTop: 0, paddingTop: 0 }}>
        Recruitment and Training Desk
      </h4>
      <p style={{ margin: 0, padding: 0 }}>
        2nd Floor, Pratima Complex, Opp. Bharat Petrol Pump
      </p>
      <p style={{ margin: 0, padding: 0 }}>
        Kachery Road, Uditnagar, Rourkela, Odissa
      </p>
    </div>
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

  return (
    <Map
      google={props.google}
      zoom={16}
      style={mapStyles}
      containerStyle={containerStyles}
      initialCenter={{ lat: 22.2266, lng: 84.8443 }}
      onClick={mapClickHandler}
    >
      <Marker
        position={{ lat: 22.2266, lng: 84.8443 }}
        label={`FF`}
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
