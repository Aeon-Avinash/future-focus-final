import React from "react"
import { useTheme } from "@material-ui/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { DashboardModal, Dashboard } from "@uppy/react"
import "@uppy/core/dist/style.css"
import "@uppy/dashboard/dist/style.css"
import "./UppyDashboard.css"

const UppyDashboard = ({ uppy, uppyModalOpen, handleUppyModalClose }) => {
  const theme = useTheme()
  const lgMediaMatch = useMediaQuery(theme.breakpoints.up("lg"))

  return (
    <>
      {!lgMediaMatch ? (
        <Dashboard
          className="uppy-Dashboard-inner"
          uppy={uppy}
          inline={true}
          // width={"auto"}
          height={350}
          note="Text/Pdf or image files only, 1-2 files, upto 10 MB"
        />
      ) : (
        <DashboardModal
          uppy={uppy}
          closeModalOnClickOutside
          open={uppyModalOpen}
          onRequestClose={handleUppyModalClose}
          note="Text/Pdf or image files only, 1-2 files, upto 10 MB"
          // plugins={['Webcam']}
        />
      )}
    </>
  )
}

export default UppyDashboard
