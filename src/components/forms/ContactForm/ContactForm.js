// Legacy Code: For reference purpose only
// Direct usage of Final Form lower level API
import React, { Component } from "react"
// import { render } from "react-dom"
import { Form, Field } from "react-final-form"
import Airtable from "airtable"

import * as filestack from "filestack-js"

const FILESTACK_API_KEY =
  process.env.FILESTACK_API_KEY || process.env.GATSBY_FILESTACK_API_KEY
const AIRTABLE_API_KEY =
  process.env.AIRTABLE_API_KEY || process.env.GATSBY_AIRTABLE_API_KEY
const CONTACT_BASE_ID =
  process.env.CONTACT_BASE_ID || process.env.GATSBY_CONTACT_BASE_ID

const client = filestack.init(FILESTACK_API_KEY)

class ContactForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // nameairgats: "",
      // emailairgats: "",
      // notesairgats: "",
      name: "",
      email: "",
      notes: "",
      fileUploadInit: null,
      fileUploadComplete: null,
      fileUploadMessage: null,
    }
    this.fileInput = React.createRef()
  }

  uploadedFileObj = {}

  filePickerOptions = {
    accept: ["application/pdf", "text/*", "image/*", "application/rtf"],
    maxFiles: 1,
    onFileSelected: file => {
      if (file.size > 1000 * 1000 * 5) {
        throw new Error(`File too big, select something smaller than 5-MB`)
      }
    },
    onClose: () => {
      // console.log(`filePicker closed!`)
      if (!this.state.fileUploadComplete) {
        this.setState({
          fileUploadInit: null,
          fileUploadComplete: null,
          fileUploadMessage: `File upload cancelled.`,
        })
      }
    },
    onUploadDone: pickerResponse => {
      if (pickerResponse.filesFailed.length === 0) {
        const uploadedFile = pickerResponse.filesUploaded[0]
        this.uploadedFileObj = {
          // "id": uploadedFile.uploadId,
          url: uploadedFile.url,
          filename: uploadedFile.filename,
          // "type": uploadedFile.mimetype,
          // "size": uploadedFile.size,
        }
        this.setState(
          {
            fileUploadInit: true,
            fileUploadComplete: true,
            fileUploadMessage: `${uploadedFile.filename} uploaded.`,
          },
          () => {
            // console.log(this.uploadedFileObj)
          }
        )
      } else {
        this.setState(
          {
            fileUploadInit: true,
            fileUploadComplete: false,
            fileUploadMessage: `File upload failed! Please try again.`,
          },
          () => {
            // console.log(pickerResponse.filesFailed[0])
          }
        )
      }
    },
  }

  fileUploadHandler = () => {
    this.setState({
      fileUploadInit: true,
      fileUploadComplete: false,
    })
    client.picker(this.filePickerOptions).open()
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  submitHandler = values => {
    // e.preventDefault()
    // console.log(values)

    if (
      this.state.name === "" &&
      this.state.email === "" &&
      this.state.notes === "" &&
      this.fileInput.current.files.length === 0
    ) {
      const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
        CONTACT_BASE_ID
      )

      if (this.state.fileUploadInit && this.state.fileUploadComplete) {
        base("Contact Records").create(
          {
            name: values.nameairgats,
            email: values.emailairgats,
            notes: values.notesairgats,
            file: [this.uploadedFileObj],
          },
          (err, record) => {
            if (err) {
              // console.error(err)
              return
            }
            // console.log(record.getId())
            this.setState({
              // nameairgats: "",
              // emailairgats: "",
              // notesairgats: "",
              name: "",
              email: "",
              notes: "",
              fileUploadInit: null,
              fileUploadComplete: null,
              fileUploadMessage: null,
            })
          }
        )
      } else if (this.state.fileUploadInit && !this.state.fileUploadComplete) {
        // console.log("File upload in progress...")
      } else if (!this.state.fileUploadInit && !this.state.fileUploadComplete) {
        base("Contact Records").create(
          {
            name: values.nameairgats,
            email: values.emailairgats,
            notes: values.notesairgats,
          },
          (err, record) => {
            if (err) {
              console.error(err)
              return
            }
            // console.log(record.getId())
            this.setState({
              // nameairgats: "",
              // emailairgats: "",
              // notesairgats: "",
              name: "",
              email: "",
              notes: "",
              fileUploadInit: null,
              fileUploadComplete: null,
              fileUploadMessage: null,
            })
          }
        )
      }
    } else {
      // console.log("Honeypot detected spam attack!")
    }
  }

  render() {
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
      <Form
        onSubmit={this.submitHandler}
        validate={values => {
          const errors = {}
          if (!values.nameairgats) {
            errors.nameairgats = "Required"
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
            <Field name="nameairgats">
              {({ input, meta }) => (
                <label htmlFor="nameairgats" style={{ marginBottom: "18px" }}>
                  Name &nbsp;&nbsp;
                  <input
                    {...input}
                    type="text"
                    name="nameairgats"
                    id="nameairgats"
                    maxLength="100"
                    placeholder="Your name here"
                    // onChange={this.changeHandler}
                    // value={this.state.nameairgats}
                  />{" "}
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </label>
              )}
            </Field>
            <Field name="emailairgats">
              {({ input, meta }) => (
                <label htmlFor="emailairgats" style={{ marginBottom: "18px" }}>
                  Email &nbsp;&nbsp;
                  <input
                    {...input}
                    type="email"
                    name="emailairgats"
                    id="emailairgats"
                    placeholder="Your e-mail here"
                    // onChange={this.changeHandler}
                    // value={this.state.emailairgats}
                  />{" "}
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </label>
              )}
            </Field>
            <Field name="notesairgats">
              {({ input, meta }) => (
                <label htmlFor="notesairgats" style={{ marginBottom: "18px" }}>
                  Notes &nbsp;&nbsp;
                  <textarea
                    {...input}
                    name="notesairgats"
                    id="notesairgats"
                    placeholder="Your notes here"
                    // onChange={this.changeHandler}
                    // value={this.state.notesairgats}
                  />{" "}
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </label>
              )}
            </Field>

            <label htmlFor="filestackairgats" style={{ marginBottom: "18px" }}>
              File Upload &nbsp;&nbsp;
              <button
                type="button"
                name="filestackairgats"
                id="filestackairgats"
                onClick={this.fileUploadHandler}
              >
                {this.state.fileUploadComplete ? "Change File" : "Select File"}
              </button>{" "}
              <span>{this.state.fileUploadMessage}</span>
            </label>

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
            <button type="submit" disabled={submitting || pristine || invalid}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </form>
        )}
      />
    )
  }
}

export default ContactForm
