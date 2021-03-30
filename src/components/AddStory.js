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
  }

  componentDidMount() {
    this.setState({
      loggedInUser: this.props.userInSession ? this.props.userInSession : null,
    });

    console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/rescue-story", this.state, {
        withCredentials: true,
      })
      .then(() => {
        this.props.history.push("/rescueStories");
      })
      .catch((err) => {
        console.log("Error while adding the thing: ", err.response.data);
      });
  };

  handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    service
      .handleUpload(uploadData)
      .then((response) => {
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
                <h1>
Add Your Cat's Story
          </h1>
        <form onSubmit={this.handleSubmit}>
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
          <label>Tell your cat's story:</label>
          <br />
          <textarea
            onChange={this.handleChange}
            name="story"
            cols="80"
            rows="10"
          ></textarea>
          <br />
          <label>Show off your beautiful Furbaby!</label>
          <br />
          <input type="file" onChange={(e) => this.handleFileUpload(e)} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
