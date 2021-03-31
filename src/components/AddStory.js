import React, { Component } from "react";
import axios from "axios";
import * as service from "../api/service";

export default class AddStory extends Component {
  state = {
    loggedInUser: null,
    name: "",
    age: "",
    breed: "",
    story: "",
    imageUrl: "",
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
    console.log(this.state.loggedInUser);
    this.setState({
      loggedInUser: this.props.userInSession ? this.props.userInSession : null,
    });
  }

  // componentDidMount() {
  //   this.setState({
  //     loggedInUser: this.props.userInSession ? this.props.userInSession : null,
  //   });

  //   console.log(this.state);
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log({ theState: this.state });
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/rescue-story`,
        this.state,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log({ storyres: res.data });
        this.props.history.push("/rescueStories");
      })
      .catch((err) => {
        console.log("Error while adding the thing: ", err.response.data);
      });
  };

  handleFileUpload = (e) => {
    const uploadData = new FormData();
    console.log({ thefile: e });
    uploadData.append("imageUrl", e.target.files[0]);
    service
      .handleUpload(uploadData)
      .then((response) => {
        console.log({ responsefile: response });
        this.setState({ imageUrl: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Add Your Cat's Story</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <h2>Share a story about your furbaby!</h2>
          </p>
          <br />
          <label className="attributes">
            Upload a picture:
            <br />
            <br />
            <input type="file" onChange={(e) => this.handleFileUpload(e)} />
          </label>
          <p>
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              placeholder="Cat's Name"
            />
            <br />
            <input
              onChange={this.handleChange}
              type="number"
              name="age"
              placeholder="Age"
            />{" "}
            <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="breed"
              placeholder="Breed"
            />{" "}
            <br />
            <br />
            <textarea
              onChange={this.handleChange}
              name="story"
              cols="80"
              rows="10"
            ></textarea>
            <br />
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}
