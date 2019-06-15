import React, { Component } from "react"
import { Form, Field } from "react-final-form"
import Airtable from "airtable"
// import { TextField } from "final-form-material-ui"
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  FormLabel,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core"
import Uppy from "@uppy/core"
import AwsS3 from "@uppy/aws-s3"
import "@uppy/core/dist/style.css"
import "@uppy/dashboard/dist/style.css"
import UppyDashboard from "../UppyDashboard/UppyDashboard"
import SnackbarFF from "../Snackbar/Snackbar"
import ReCaptcha from "../../ReCaptcha/ReCaptcha"

const FF_PRE_SIGNED_URL_API =
  process.env.FF_PRE_SIGNED_URL_API || process.env.GATSBY_FF_PRE_SIGNED_URL_API

const AIRTABLE_API_KEY =
  process.env.AIRTABLE_API_KEY || process.env.GATSBY_AIRTABLE_API_KEY
const CONTACT_BASE_ID =
  process.env.CONTACT_BASE_ID || process.env.GATSBY_CONTACT_BASE_ID

class ContactForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      notes: "",
      fileUploadInit: null,
      fileUploadComplete: null,
      fileUploadStatus: {},
      openSnackbar: false,
      snackbarMessage: "",
      snackbarMessageType: "default",
      uppyModalOpen: false,
    }
    this.recaptchaRef = React.createRef()
    this.fileInput = React.createRef()
    this.uppy = Uppy({
      // debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 10000000,
        maxNumberOfFiles: 2,
        minNumberOfFiles: 1,
        allowedFileTypes: ["image/*", "application/pdf", "text/*"],
      },
    }).use(AwsS3, {
      getUploadParameters(file) {
        return fetch(`${FF_PRE_SIGNED_URL_API}`, {
          method: "post",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            object_key: `contactUploads/${file.name}`,
            file_type: "application/json",
            contentType: "application/json",
          }),
        })
          .then(async response => {
            const res = await response.json()
            return res
          })
          .then(data => {
            const s3Data = JSON.parse(data.body)
            return {
              method: s3Data.method,
              url: s3Data.uploadUrl,
              filename: `${s3Data.filename}`,
              contentType: "application/json",
            }
          })
      },
    })
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      import("final-form-material-ui").then(({ TextField }) => {
        this.setState({
          TextField,
        })
      })
    }
  }

  uploadedFilesArr = []

  uploadedFileObj = {}

  fileUploadHandler = () => {
    this.setState({
      fileUploadInit: true,
      fileUploadComplete: false,
      uppyModalOpen: true,
    })
    this.uppy.on("upload-error", (file, error, resposne) => {
      console.log("error with file:", file.name)
      console.log("error message:", error)
      this.setState(prevState => ({
        fileUploadStatus: this.getUploadStatus("error", file.name, prevState),
      }))
    })
    this.uppy.on("upload-success", (file, data) => {
      this.uploadedFileObj = {
        url: data.uploadURL,
        filename: file.meta.name,
      }
      if (
        !this.uploadedFilesArr.find(
          fileObj => fileObj.filename === file.meta.name
        )
      ) {
        this.uploadedFilesArr.push(this.uploadedFileObj)
      }

      this.setState(
        {
          uppyModalOpen: false,
        },
        () => {
          this.setState(prevState => ({
            fileUploadInit: true,
            fileUploadComplete: true,
            fileUploadStatus: this.getUploadStatus(
              "success",
              file.meta.name,
              prevState
            ),
          }))
        }
      )
    })
  }

  getUploadStatus = (status, filename, prevState) => {
    return {
      ...prevState.fileUploadStatus,
      [filename]: {
        message:
          status === "success"
            ? `${filename} uploaded.`
            : `Error uploading ${filename}`,
        status: status,
      },
    }
  }

  handleUppyModalClose = () => {
    this.setState(
      {
        uppyModalOpen: false,
      },
      () => {
        this.setState(prevState => ({
          fileUploadComplete:
            Object.keys(prevState.fileUploadStatus).length > 0 ? true : false,
        }))
      }
    )
  }

  handleUploaderReset = () => {
    this.uppy.reset()
    this.setState(
      {
        uppyModalOpen: false,
      },
      () => {
        this.setState({
          fileUploadInit: null,
          fileUploadComplete: null,
          fileUploadStatus: {},
        })
      }
    )
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  submitHandler = values => {
    // e.preventDefault()

    const recaptcha = this.recaptchaRef.current

    if (
      this.state.name === "" &&
      this.state.email === "" &&
      this.state.notes === "" &&
      this.fileInput.current.files.length === 0
    ) {
      const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
        CONTACT_BASE_ID
      )

      if (
        Object.keys(this.state.fileUploadStatus).find(
          key => this.state.fileUploadStatus[key].status === "success"
        )
      ) {
        this.setState(
          {
            fileUploadComplete: true,
          },
          () => {
            if (this.state.fileUploadInit && this.state.fileUploadComplete) {
              base("contact_table").create(
                {
                  name: values.nameairgats,
                  email: values.emailairgats,
                  notes: values.notesairgats,
                  file: this.uploadedFilesArr,
                },
                (err, record) => {
                  if (err) {
                    this.setState({
                      openSnackbar: true,
                      snackbarMessage:
                        "Error submitting query. Please try again.",
                      snackbarMessageType: "error",
                    })
                    // console.error(err)
                    return
                  }
                  // console.log(record.getId())
                  this.setState(
                    {
                      name: "",
                      email: "",
                      notes: "",
                      fileUploadInit: null,
                      fileUploadComplete: null,
                      fileUploadStatus: {},
                      openSnackbar: true,
                      snackbarMessage: "Your query has been submitted. Thanks.",
                      snackbarMessageType: "success",
                    },
                    () => {
                      this.uppy.reset()
                      this.uploadedFilesArr = []
                      recaptcha.reset()
                    }
                  )
                }
              )
            }
          }
        )
      } else if (!this.state.fileUploadInit && !this.state.fileUploadComplete) {
        base("contact_table").create(
          {
            name: values.nameairgats,
            email: values.emailairgats,
            notes: values.notesairgats,
          },
          (err, record) => {
            if (err) {
              this.setState({
                openSnackbar: true,
                snackbarMessage: "Error submitting query. Please try again.",
                snackbarMessageType: "error",
              })
              // console.error(err)
              return
            }
            // console.log(record.getId())
            this.setState({
              name: "",
              email: "",
              notes: "",
              fileUploadInit: null,
              fileUploadComplete: null,
              fileUploadStatus: {},
              openSnackbar: true,
              snackbarMessage: "Your query has been submitted. Thanks.",
              snackbarMessageType: "success",
            })
            recaptcha.reset()
          }
        )
      }
    } else {
      // console.log("Honeypot detected spam attack!")
    }
  }

  handleSnackbarClosed = () => {
    this.setState({
      openSnackbar: false,
      snackbarMessage: "",
      snackbarMessageType: "default",
    })
  }

  renderReCaptchaField = field => {
    const {
      meta: { touched, error },
    } = field
    return (
      <>
        <FormLabel
          component="legend"
          style={{ margin: "12px 0 0 0" }}
          color={touched ? "error" : "primary"}
        >
          <Typography
            variant="body1"
            color="textSecondary"
            align="left"
            component="p"
            gutterBottom
          >
            Re-Captcha Verification *
          </Typography>
        </FormLabel>
        <ReCaptcha
          ref={this.recaptchaRef}
          onChangeHandler={field.input.onChange}
        />
        <Typography
          variant="caption"
          align="left"
          component="p"
          gutterBottom
          style={{
            margin: "12px 0 0 14px",
          }}
          color="error"
        >
          {touched ? error : ""}
        </Typography>
      </>
    )
  }

  render() {
    const { TextField } = this.state

    const ohnohoney = {
      opacity: 0,
      position: "absolute",
      top: 0,
      left: 0,
      height: 0,
      width: 0,
      zIndex: -1,
    }

    return (
      <div style={{ padding: 0, margin: "0px auto", maxWidth: 600 }}>
        <CssBaseline />
        {typeof window !== "undefined" && TextField ? (
          <Form
            onSubmit={this.submitHandler}
            validate={values => {
              const errors = {}
              if (!values.nameairgats) {
                errors.nameairgats = "Required"
              }
              if (!values.recaptchaform) {
                errors.recaptchaform = "Required"
              }
              if (!values.emailairgats) {
                errors.emailairgats = "Required"
              } else if (
                !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
                  values.emailairgats
                )
              ) {
                errors.emailairgats = "Invalid E-mail"
              }
              return errors
            }}
            render={({
              handleSubmit,
              form,
              reset,
              submitting,
              pristine,
              values,
              invalid,
            }) => (
              <form
                onSubmit={async event => {
                  await handleSubmit(event)
                  form.reset()
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "50px auto",
                  justifyContent: "center",
                  alignItems: "space-evenly",
                }}
              >
                <Paper style={{ padding: 16 }}>
                  <Grid container alignItems="flex-start" spacing={4}>
                    <Grid item xs={12}>
                      <Field
                        name="nameairgats"
                        fullWidth
                        required
                        component={TextField}
                        type="text"
                        label="Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="emailairgats"
                        fullWidth
                        required
                        component={TextField}
                        type="text"
                        label="Email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="notesairgats"
                        fullWidth
                        multiline
                        rowsMax="4"
                        component={TextField}
                        type="text"
                        label="Notes"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormGroup>
                        <FormLabel
                          component="legend"
                          style={{ margin: "12px 0 0 0" }}
                        >
                          File Upload
                        </FormLabel>
                        <FormControlLabel
                          control={
                            <React.Fragment>
                              <Button
                                type="button"
                                variant="contained"
                                id="filestackairgats"
                                onClick={this.fileUploadHandler}
                                style={{ margin: "12px 0 0 14px" }}
                              >
                                {this.state.fileUploadComplete
                                  ? "Change File"
                                  : "Select File"}
                              </Button>{" "}
                            </React.Fragment>
                          }
                        />
                        <FormControlLabel
                          control={
                            <React.Fragment>
                              {Object.keys(this.state.fileUploadStatus).map(
                                key => (
                                  <Typography
                                    key={key}
                                    variant="caption"
                                    align="left"
                                    component="p"
                                    gutterBottom
                                    style={{
                                      margin: "12px 0 0 14px",
                                      whiteSpace: "pre-wrap",
                                    }}
                                    // color="primary"
                                    color={
                                      this.state.fileUploadStatus[key]
                                        .status === "success"
                                        ? "primary"
                                        : "error"
                                    }
                                  >
                                    {this.state.fileUploadStatus[key].message}
                                  </Typography>
                                )
                              )}
                            </React.Fragment>
                          }
                        />
                      </FormGroup>
                      {this.state.fileUploadInit &&
                      !this.state.fileUploadComplete ? (
                        <UppyDashboard
                          uppy={this.uppy}
                          uppyModalOpen={this.state.uppyModalOpen}
                          handleUppyModalClose={this.handleUppyModalClose}
                        />
                      ) : null}
                    </Grid>

                    <label style={ohnohoney} htmlFor="name">
                      Name &nbsp;&nbsp;
                      <input
                        style={ohnohoney}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your name here"
                        autoComplete="off"
                        onChange={this.changeHandler}
                        value={this.state.name}
                      />
                    </label>
                    <label style={ohnohoney} htmlFor="email">
                      Email &nbsp;&nbsp;
                      <input
                        style={ohnohoney}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Your e-mail here"
                        autoComplete="off"
                        onChange={this.changeHandler}
                        value={this.state.email}
                      />
                    </label>
                    <label style={ohnohoney} htmlFor="notes">
                      Notes &nbsp;&nbsp;
                      <textarea
                        style={ohnohoney}
                        name="notes"
                        id="notes"
                        placeholder="Your notes here"
                        autoComplete="off"
                        onChange={this.changeHandler}
                        value={this.state.notes}
                      />
                    </label>
                    <label style={ohnohoney} htmlFor="file">
                      File &nbsp;&nbsp;
                      <input
                        style={ohnohoney}
                        type="file"
                        name="file"
                        id="file"
                        ref={this.fileInput}
                      />
                    </label>

                    {typeof window !== "undefined" ? (
                      <Grid item xs={12}>
                        <Field
                          name="recaptchaform"
                          required
                          fullWidth
                          component={this.renderReCaptchaField}
                          label="Re-Captcha Verification *"
                        />
                      </Grid>
                    ) : null}

                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => {
                          form.reset()
                          this.handleUploaderReset()
                        }}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </Button>
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={submitting || pristine || invalid}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            )}
          />
        ) : (
          <span>Loading...</span>
        )}
        {this.state.openSnackbar ? (
          <SnackbarFF
            openSnackbar={this.state.openSnackbar}
            snackbarMessage={this.state.snackbarMessage}
            messageType={this.state.snackbarMessageType}
            snackbarClosed={this.handleSnackbarClosed}
          />
        ) : null}
      </div>
    )
  }
}

export default ContactForm
