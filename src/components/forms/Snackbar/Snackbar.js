import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import FFLogo from "../../../images/ff-icon.svg"
import Link from "../../globals/MyLink/MyLink"

const useStyles = makeStyles(theme => ({
  closeButton: {
    color: "white",
    padding: theme.spacing(0.5),
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  message: {
    color: theme.palette.secondary.main,
  },
  success: {
    backgroundColor: theme.palette.primary.dark,
    "& span": {
      color: "white",
    },
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    "& span": {
      color: "white",
    },
  },
  homeLogo: {
    padding: "0px",
    margin: "0px",
    marginTop: "5px",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))

const MySnackbarContentWrapper = props => {
  const classes = useStyles()
  const { onClose, message, variant, ...other } = props
  return (
    <SnackbarContent
      className={clsx(classes[variant])}
      aria-describedby="client-snackbar"
      message={
        <span id="message-id" className={classes.message}>
          {message}
        </span>
      }
      onClick={onClose}
      action={[
        <IconButton
          key="home"
          aria-label="home"
          color="primary"
          size="small"
          className={classes.homeButton}
          onClick={onClose}
        >
          <Link to="/">
            <img
              src={FFLogo}
              alt="logo"
              width="32px"
              height="32px"
              className={classes.homeLogo}
            />
          </Link>
        </IconButton>,
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      {...other}
    />
  )
}

const SnackbarFF = ({
  openSnackbar,
  snackbarMessage,
  messageType,
  snackbarClosed,
}) => {
  const [open, setOpen] = React.useState(false)

  if (openSnackbar && !open) {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
    snackbarClosed()
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
    >
      <MySnackbarContentWrapper
        onClose={handleClose}
        variant={messageType}
        message={snackbarMessage}
      />
    </Snackbar>
  )
}

export default SnackbarFF
